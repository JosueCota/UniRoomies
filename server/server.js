require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const roommateRouter = require("./routes/roommateRouter");
const roomRouter = require("./routes/roomRouter");
const { errorHandler, notFound } = require("./middleware/error.middleware");
const { Server } = require("socket.io");
const port = process.env.PORT || "8081";
const http = require("http");
const app = express();
 
//Middleware
app.use(express.json());                                //Allows json objects in req.body 
app.use(cors());                                        //Authorization
app.use(express.urlencoded({ extended: true }));        //Allows Form data recieving
app.use(cookieParser());                                //Cookie parsing ease

const startApp = async () => { 
    try  {
        //{force: true} if we want to change and delete all previous data
        await sequelize.sync();
        console.log("Created Database and Tables");
        
        app.use('/api/users', userRouter);
        app.use('/api/auth', authRouter);
        app.use('/api/roommates', roommateRouter);
        app.use('/api/rooms', roomRouter);
        
        app.use(errorHandler);                                  //Error handling for custom errors
        app.use(notFound);                                      //Error handling for incorrect api route
        
        const expressServer = app.listen(port , ()=> {
            console.log(`Listening on port ${port}...`)
        });
        
        require("./socket")(expressServer);

    } catch(error) {
        console.log(error)
    }   
}

startApp();
