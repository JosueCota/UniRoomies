const db  = require("../database.js");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler")
const generateToken = require("../helpers/generateToken.js");
const sendConfirmationEmail = require("../helpers/emailConfirmation.js");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const User = db.models.User;

const createUser = asyncHandler(async (req, res) => {

    const {firstName, lastName, email, password} = req.body
    
    //Check email is in correct format, will also be handled in frontend
    //Want to make sure people can't send requests to backend with fake or non school emails
    if (email) {

    }

    //Check if user with email already exists and is registered, if not registered, allow the user
    const userCheck = await User.findOne({where: {email: email}})
    if (userCheck && userCheck.isRegistered) {
        res.status(404);
        throw new Error("User already exists with email");
    }

    //If user exists but hasn't registered, delete user, then remake user (in case jwt expires)
    if (userCheck !== null) {
        User.destroy({where: {id: userCheck.id}})
    }

    //Salt and Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    //Create User
    const user = await User.create({firstName: firstName, lastName:lastName, email:email, password:hashedPassword}) 
    
    if (user) {
        //Send confirmation email to user
        await sendConfirmationEmail(user.email, user.id, res)

    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

});

const registerUser = asyncHandler(async (req, res) => {
   
    //Update user isRegistered to true if valid jwt sent to link
    const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET)

    const user = await User.findByPk(id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.isRegistered) {
        res.status(404);
        throw new Error("User already Confirmed")
    }

    await User.update({isRegistered: true}, {
        where: {
            id: id
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