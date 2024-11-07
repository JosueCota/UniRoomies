const db  = require("../database.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { generateToken, generateRefreshToken } = require("../helpers/generateToken.js");

const User = db.models.User;

const protect = asyncHandler(async (req, res, next) => {
    
    const token = req.cookies.jwt;
    const rfshToken = req.cookies.rfshToken;

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

            res.clearCookie("jwt");
            res.clearCookie("rfshToken");
            
            throw new Error("Not Authorized, Invalid Token")
        }
    } else {
        //Token expired, check if refresh token is expired 
        if (rfshToken) {
            try {
                const decoded = jwt.verify(rfshToken, process.env.REFRESH_SECRET);
                req.user = await User.findByPk(decoded.userId, {
                    attributes: ["id", "firstName", "lastName", "email", "isActive"]
                })
                
                //Create new token
                generateToken(res, decoded.userId);
                
                //Clear refresh token and then regenerate
                res.cookie("rfshToken", "", {
                    httpOnly: true,
                    expires: new Date(0)
                });
                
                generateRefreshToken(res, decoded.userId);
                
                next();
                
            } catch (error) {
                //Refresh token was manipulated
                res.status(401);
                res.clearCookie("rfshToken");
                throw new Error("Not Authorized, Invalid Refresh Token: Log In Again")
            }
        } else {
            //No refresh or auth token
            res.status(401);
            throw new Error("Not Authorized, No Token: Log In Again")
        }
    }
});

module.exports = protect;