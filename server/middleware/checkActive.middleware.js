const db  = require("../database.js");
const User = db.models.User;
const asyncHandler = require("express-async-handler")

const checkActive = asyncHandler(async (req, res, next) => {

    try {

        const user = await User.findByPk(req.user.id, { attributes: ["isActive"]})
        console.log(user)
        if (!user.isActive) {
            res.status(404);
            throw new Error("User's Account isn't Active") 
        }
        
        next();
    } catch (err) {
        throw new Error(err)
    }

}) 

module.exports = checkActive;