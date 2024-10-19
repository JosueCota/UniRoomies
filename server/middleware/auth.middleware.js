const db  = require("../database.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = db.models.User;

const protect = asyncHandler(async (req, res, next) => {
    //Grab user token
    let token = req.cookies.jwt;

    //If exists, verify, then return User info
    if (token) {
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findByPk(decoded.userId, {
                attributes: ["id", "firstName", "lastName", "email", "isActive"]
            });
            next();
        } catch (error){
            res.status(401);
            throw new Error("Not authorized, invalid token")
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized, no token")
    }
});

module.exports = protect;