const { where } = require("sequelize");
const sequelize  = require("../database.js");
const User = sequelize.models.User
const asyncHandler = require("express-async-handler");

const getRoommates = asyncHandler(async (req, res) => {
    
    // if req.body.budget or req.body.location do query based on that

    const users = await User.findAll({
        attributes: ["id", "firstName", "lastName"],
        where: {
            // isActive: true,
            isRegistered: true
        }
    })

    res.status(200).json(users)

    //Returns array of users (will be users joined with user_details)
    
    // res.status(200).json(users)

});

module.exports= {
    getRoommates,
}