require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database")
const User = require("./models/user.model")
const User_Detail = require("./models/user_detail.model")
const Room = require("./models/room.model")

const port = process.env.PORT || "8081"
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const routes = {
    //Fill with routes
}

const startApp = async () => { 
    try  {
        await sequelize.sync({ force: true });
        console.log("Created Database and Tables")
        
        app.get('/', (req, res) => {
            res.send("Hello World")
        })
        
        app.listen(port , ()=> {
            console.log("Listening...")
        });

    } catch(error) {
        console.log(error)
    }   
}

startApp();
