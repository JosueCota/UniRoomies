const db  = require("../database.js");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler")
const generateToken = require("../helpers/generateToken.js")

const User = db.models.User;

const createUser = asyncHandler(async (req, res) => {

    const {firstName, lastName, email, password} = req.body
    
    //Check if user with email already exists
    const check = await User.findOne({where: {email: email}})
    if (check !== null) {
        res.status(404);
        throw new Error("User already exists with email");
    }

    //Salt and Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    //Create User
    const user = await User.create({firstName: firstName, lastName:lastName, email:email, password:hashedPassword}) 
    
    if (user) {
        
        //Here we will call a function to send email to user 

        res.status(201).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
    });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

    //Generate regEmailCode
    //Send link to email, link should include regCode in param
        
});

const registerUser = asyncHandler(async (req, res) => {
    //Check email code
    //Update user isRegistered to true if valid
    //Use nodemailer and jwt with 1-day exp
    const {email} = req.body;
    
    const user = await User.findOne({where:
        { 
            email: email
        }
    });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await User.update({isRegistered: true}, {
        where: {
            email : email
    }});

    res.status(200).send("Successful Registration");
   
});

// 
const login = asyncHandler(async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({where: { email: email } });

    //User doesn't exist with email
    if (!user) {
        res.status(401);
        throw new Error("Invalid Login")
    }
    
    //User hasn't been registered
    if (!user.isRegistered) {
        res.status(401);
        throw new Error("Please Confirm Your Email")
    }

    //User input incorrect password
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
        res.status(404);
        throw new Error("Invalid Login Password")
    }

    generateToken(res, user.id);
    res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
});

const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: "User logged out"})
});

module.exports = {
    createUser,
    login,
    registerUser,
    logout,
}