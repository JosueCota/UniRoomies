const db  = require("../database.js");
const asyncHandler = require("express-async-handler")

const Room = db.models.User;

const createRoom = asyncHandler(async (req, res) => {
    //Check if user already has room, if so reject, if not continue

    //Create Room
});

const getRoom = asyncHandler(async (req, res) => {
    //Show room based off req.body.id
    
});

const getRooms = asyncHandler(async (req, res) => {
    //Show rooms

    //If pagination, might need to grab 10, then do 10(n)-9 - 10(n)
});


module.exports = {
    createUser,
    login
}