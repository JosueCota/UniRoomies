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
    const result = await Chat_Participant.findOne({
        where: {
          chat_id: {
            [Op.in]: [
              // First subquery: Get all chat_ids where we are a participant
              sequelize.literal(`(SELECT chat_id FROM Chat_Participants WHERE user_id = ${req.user.id})`)
            ]
          },
          user_id: to_id, // Check if user2 is in any of the chats user1 is in
        },
      });

    if (result) {
        const chat = await Chat_Participant.findOne({
            where: {
                chat_id: result.chat_id,
                user_id: req.user.id
            }
        });
        if (chat.hidden) {
            chat.hidden = false;
            await chat.save();
            res.status(200).json({message: "Chat Unhidden"});
        }
        res.status(200).json({message: "Chat Already Made"});
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
            include: [
                {
                    model: User,
                    attributes: ["id", "firstName", "lastName", "pfp", "isActive"] 
                }
            ]
        },
    ],
    order: [
        ["updatedAt", "DESC"]
    ]
    })

    res.status(200).json({ message: chats})
});

// Filter messages based on createdAt date (newestLast)
//Here you will turn seen true if false in chat_participants
const getPreviousMessages = asyncHandler(async (req, res) => {

    const {chat_id} = req.body

    const messages = await Message.findAll({
        where: {
              chat_id: chat_id,
            },
        attributes: ["message", "sender_id"],
        order: [
            ["createdAt", "ASC"]
        ]
      });

      res.status(200).json({ messages })
});

// Changes chat to hidden
const changeChatHidden = asyncHandler(async (req, res) => {

    const {chat_id} = req.body

    const chat = await Chat_Participant.findOne({
        where: {
                user_id: req.user.id,
                chat_id: chat_id,
            },
        order: [
            ["createdAt", "ASC"]
        ]
      });

    if (!chat) {
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

module.exports= {
    makeChat,
    getChats,
    getPreviousMessages,
    changeChatHidden,
    createMessage,
    changeSeenMessage,
}