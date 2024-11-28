const asyncHandler = require("express-async-handler")

const checkActive = asyncHandler(async (req, res, next) => {
    try {
        if (!req.user.isActive) {
            res.status(404);
            throw new Error("User's Account isn't Active") 
        }
        next();
    } catch (err) {
        throw new Error(err)
    }

}) 

module.exports = checkActive;