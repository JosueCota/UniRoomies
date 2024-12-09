const express = require("express")
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const { makeChat, getChats, getPreviousMessages, changeChatHidden } = require("../controllers/chat.controller")

// @ROUTE api/chats/

//Makes Chat if not made | If already made and hidden, unhides it
router.post("/", protect, makeChat);

//Gets all non-hidden chats  
router.get("/",protect, getChats);
 
//Grabs messages between users (returns message/user_id)
router.get("/messages/:chatId", protect, getPreviousMessages);

//Expects chad_id to hide certain chats
router.post("/hideChat/:chatId", protect, changeChatHidden);

module.exports = router;