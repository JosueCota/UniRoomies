const sequelize  = require("../database.js");
const User = sequelize.models.User;
const Chat = sequelize.models.Chat;
const Message = sequelize.models.Message;
const Chat_Participant = sequelize.models.Chat_Participant;
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

// When client clicks Send Message button on users Page, it'll send this 
const makeChat = asyncHandler( async(req, res) => {

    const to_id = req.body.to_id;
    console.log(to_id)
    const receiever = await User.findByPk(to_id);

    if (to_id == req.user.id) {
        res.status(400);
        throw new Error("Cannot Message Self")
    }
    
    //Attempt to message user that doesn't exist
    if (!receiever) {
        res.status(404);
        throw new Error("User Doesn't Exist")
    }

    //Check if they have a chat
    const result = await getRecipientOfChat(chat_id=null, recipient_id=to_id, user_id=req.user.id);
    console.log(result)

    if (result) {
        console.log("here")
        const chat = await Chat_Participant.findOne({
            where: {
                chat_id: result.chat_id,
                user_id: req.user.id
            }
        });

        console.log(chat.hidden);

        if (chat.hidden) {
            chat.hidden = false;
            await chat.save();
            res.status(200).json({message: "Chat Unhidden"});
            return
        }
        res.status(200).json({message: "Chat Already Made"});
        return
    }

    //Create Chat then create 2 Chat_Participant tables connected to it via chat_id
    const chat = await Chat.create()

    await Chat_Participant.create({user_id: req.user.id, chat_id: chat.chat_id})
    await Chat_Participant.create({user_id: to_id, chat_id: chat.chat_id})

    res.status(200).json({message:"Created Chat"})
})

//Grabs all chats from user, filter chats based on createdAt date (newest first)
const getChats = asyncHandler(async (req, res) => {
    
   const chats = await Chat.findAll({
    include: [
        {
            model: Chat_Participant, 
            where: {
                user_id : req.user.id,
                hidden: false
            },
            attributes: ["hidden", "seen", "chat_id"],
        },
        {
            model: Message,
            limit: 1,
            attributes: ["message", "createdAt"],
            order: [["createdAt", "DESC"]]

        }
    ],
    order: [
        ["updatedAt", "DESC"]
    ]
    })

    let recipients = [];
    console.log(chats)
    for (const chat of chats){
        var temp = await getRecipientOfChat(chat.chat_id, req.user.id)
        recipients.push(temp)
    }

    res.status(200).json({chats, recipients})
});

// Filter messages based on createdAt date (newestLast)
//Here you will turn seen true if false in chat_participants
const getPreviousMessages = asyncHandler(async (req, res) => {

    const { chatId } = req.params
    console.log(chatId)

    const chat = await Chat_Participant.findOne({
        where: {
            user_id: req.user.id,
            chat_id: chatId
        }
    });

    if (!chat) {
        res.status(404);
        throw new Error("Chat Doesn't Exist or is not Part of User's Chats");
    }

    const messages = await Message.findAll({
        where: {
              chat_id: chatId,
            },
        attributes: ["message", "sender_id"],
        order: [
            ["createdAt", "ASC"]
        ]
      });

    chat.seen = true;
    await chat.save();

    res.status(200).json({ messages })
});

// Changes chat to hidden
const changeChatHidden = asyncHandler(async (req, res) => {

    const { chatId } = req.params
    console.log(chatId)

    const chat = await Chat_Participant.findOne({
        where: {
                user_id: req.user.id,
                chat_id: chatId,
            },
        order: [
            ["createdAt", "ASC"]
        ]
      });

    if (!chat) {
        res.status(404);
        throw new Error("No Chat Found")
    }
    chat.hidden = true;
    await chat.save()
    
    res.status(200).json({ message: "Chat Hidden!" })
});

//Create Message: Not An HTTP Request
const createMessage =async (user_id, to_id, message) => {
    if (!message) {
        throw new Error("No Message Sent")
    }

    const result = await Chat.findOne({
        include: [{
            model: Chat_Participant,
            attributes: ['chat_id'],
            where: {
              chat_id: {
                [Op.in]: [
                  // First subquery: Get all chat_ids where we are a participant
                  sequelize.literal(`(SELECT chat_id FROM Chat_Participants WHERE user_id = ${user_id})`)
                ]
              },
              user_id: to_id, // Check if user2 is in any of the chats user1 is in
            },
        }]
      });

      if (!result) {
        throw new Error("No Chat Found");
      }

    await Message.create({message: message, chat_id: result.chat_id, sender_id: user_id})
}

//Attached to chat_participants: Not An HTTP Request
const changeSeenMessage = async (user_id, to_id) => {

    const c = await Chat_Participant.findOne({
        where: {
          chat_id: {
            [Op.in]: [
              // First subquery: Get all chat_ids where we are a participant
              sequelize.literal(`(SELECT chat_id FROM Chat_Participants WHERE user_id = ${user_id})`)
            ]
          },
          user_id: to_id, // Check if user2 is in any of the chats user1 is in
        },
    });

    c.seen = false;

    await c.save();
}

const getRecipientOfChat = async(chat_id, user_id, recipient_id) => {
    console.log(chat_id, user_id, recipient_id)
    if (recipient_id){
        var recipient = await Chat_Participant.findOne({
            where: {
                chat_id: {
                    [Op.in]: [
                        // First subquery: Get all chat_ids where we are a participant
                        sequelize.literal(`(SELECT chat_id FROM Chat_Participants WHERE user_id = ${user_id})`)
                    ]
                },
                user_id: recipient_id, // Check if user2 is in any of the chats user1 is in
            },
            include: [{
                model: User,
                attributes: ["firstName", "lastName", "socket_id", "id", "isActive", "pfp"]
            }],
            attributes: ["chat_id"]
        });
    } else if (chat_id) {
        var recipient = await Chat_Participant.findOne({
            where: {
                chat_id: chat_id, //Chat Id known
                user_id: {
                    [Op.not]: [user_id] //Make sure user_id isn't current user
                }
            },
            attributes: ["chat_id"], 
            include: [{
                model: User,
                attributes: ["firstName", "lastName", "socket_id", "id", "isActive", "pfp"]
            }]
        });
    }

    return recipient
}

module.exports= {
    makeChat,
    getChats,
    getPreviousMessages,
    changeChatHidden,
    createMessage,
    changeSeenMessage,
}