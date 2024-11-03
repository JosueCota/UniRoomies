const jwt = require("jsonwebtoken");


//Generate token for user when login or when refresh is used
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15m"
    });

    res.cookie('jwt', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "dev",
        sameSite: "strict",
        maxAge: 1 * 60 * 15 *1000
    })
};


//Generates when login or when refresh is used
const generateRefreshToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.REFRESH_SECRET, {
        expiresIn: "1h"
    });

    res.cookie('rfshToken', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== "dev",
        sameSite: "strict",
        maxAge: 1 * 60 * 60 *1000
    })
}
module.exports = { 
    generateToken,
    generateRefreshToken
};