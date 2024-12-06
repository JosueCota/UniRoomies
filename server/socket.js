const { Server } = require("socket.io");
const db  = require("./database.js");
const User = db.models.User;

module.exports = function (server) {
    const io = new Server(server, {
      cors: {
        origin: process.env.NODE_ENV === "production" ? false : [process.env.FRONTEND_DOMAIN, process.env.FRONTEND_DOMAIN2],
        methods: ["GET", "POST"],
      },
    });
  
    io.on("connection", async (socket) => {
      const user_id = socket.handshake.query["user_id"];
      const socket_id = socket.id;
       
      console.log(`User connected: ${socket_id}`);
  
      if (user_id) {
        const user = await User.findByPk(user_id);
        user.socket_id = socket_id;
        await user.save()
      }
    
      socket.on("message", async (data) => {
          console.log(data.to)
          
          io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);

          const to = await User.findByPk(data.to)
          
          //Sends Message to Recipient
          io.to(to.socket_id).emit("message", {
              data
          })
      });
      
      socket.on("activity", (user) => {
        socket.broadcast.emit("activity", user);
      });

    });
  
    console.log("Socket.io server is running...");
  };