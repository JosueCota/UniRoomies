const db  = require("../database.js");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler")
const {generateToken, generateRefreshToken} = require("../helpers/generateToken.js");
const sendConfirmationEmail = require("../helpers/emailConfirmation.js");
const jwt = require("jsonwebtoken");

const User = db.models.User;

const createUser = asyncHandler(async (req, res) => {

    const {firstName, lastName, email, password, pfp} = req.body
    
    //Check email is in correct format, will also be handled in frontend
    //Want to make sure people can't send requests to backend with fake or non school emails
    if (email && process.env.NODE_ENV !== "dev") {
        const emailPattern= /^[a-zA-Z0-9._-]{3,}@[a-zA-Z.]{2,}?.edu$/;
        if (!emailPattern.test(email)) {
            throw new Error("Email Does Not Match .edu Pattern")
        }
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
    const user = await User.create({firstName: firstName, lastName:lastName, email:email, password:hashedPassword, pfp: pfp}) 
    
    if (user) {
        //Send confirmation email to user
        await sendConfirmationEmail(user.email, user.id, res)
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

});

const registerUser = asyncHandler(async (req, res) => {
    
    const { token } = req.body
    //Update user isRegistered to true if valid jwt sent to link
    const { id } = jwt.verify(token, process.env.EMAIL_SECRET)

    const user = await User.findByPk(id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.isRegistered) {
        res.status(400);
        throw new Error("User already Confirmed")
    }

    await User.update({isRegistered: true}, {
        where: {
            id: id
    }});

    res.status(200).json({message:"Successful Registration"});
});

// 
const login = asyncHandler(async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({where: { email: email } });

    //User doesn't exist with email
    if (!user) {
        res.status(400);
        throw new Error("Invalid Login")
    }
    
    //User hasn't been registered
    if (!user.isRegistered) {
        res.status(400);
        throw new Error("Please Confirm Your Email")
    }

    //User input incorrect password
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
        res.status(400);
        throw new Error("Invalid Login")
    }

    generateToken(res, user.id);
    generateRefreshToken(res, user.id);

    res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive,
        pfp: user.pfp
    });
});

const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.cookie("rfshToken", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message: "User logged out"})
});

const resendLink = asyncHandler(async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({where : {email: email}})

    if (!user) {
        res.status(404)
        throw new Error("User with Emai Doesn't Exist")
    }
    if (user.isRegistered) {
        res.status(401)
        throw new Error("User Already Registered")
    }

    if (user) {
        await sendConfirmationEmail(email, user.id, res)
    } else {
        res.status(404)
        throw new Error("Invalid Email")
    }
})

module.exports = {
    createUser,
    login,
    registerUser,
    logout,
    resendLink
}