const { Server } = require("socket.io");
const db  = require("./database.js");
const { createMessage, changeSeenMessage } = require("./controllers/chat.controller.js");
const User = db.models.User;

module.exports = function (server) {
    const io = new Server(server, {
      cors: {
        origin: process.env.NODE_ENV === "production" ? false : [process.env.FRONTEND_DOMAIN, process.env.FRONTEND_DOMAIN2],
        methods: ["GET", "POST"],
      },
    });
    let connected = []

    //Happens when User connects to a chat
    io.on("connection", async (socket) => {
      const user_id = socket.handshake.query["user_id"];
      const to_id = socket.handshake.query["to_id"];
      const socket_id = socket.id;

      connected.push({user_id, to_id});

      console.log(`User connected: ${socket_id}`);
      
      if (user_id && to_id) {
        const user = await User.findByPk(user_id)
        const to =  await User.findByPk(to_id);
        socket.emit("getOther", [to.firstName, to.lastName])
        
        user.socket_id = socket_id;
        await user.save()
        //Messages are encrypted through model set and get methods
        socket.on("message", async (data) => {
          const to =  await User.findByPk(to_id);

          if (to) {
            await createMessage(user_id, to_id, data)
            
            const con = connected.some(u => {
              return u.user_id === to_id && u.to_id ===  user_id
            })

            //if to.socket id connected, leave other users chat_participant seen true else false 
            //Check if User is connected to our chat
            if (to.socket_id && con){    
                io.to(to.socket_id).emit("message", data);
              } else {
              await changeSeenMessage(user_id, to_id)
            }
          }
        });
      
        //When user disconnects from chat, socket_id removed, (user is not looking at chat)
        socket.on("disconnect", async () => {
          user.socket_id = null;
          connected = connected.filter(u =>{
            return u.user_id !== user_id
          })
          await user.save();

        })
        
      } else {
      //Missing sender or receiver ids
      console.log("Error with ID params")
    }
    });
    
    console.log("Socket.io server is running...");
  };