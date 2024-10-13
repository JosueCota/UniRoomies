require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database")

const userRouter = require("./routes/userRouter")
const authRouter = require("./routes/authRouter")

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
        });
        
        app.use('/user', userRouter);
        app.use("/", authRouter);
        app.listen(port , ()=> {
            console.log("Listening...")
        });

    } catch(error) {
        console.log(error)
    }   
}

startApp();
