const express = require("express")
const router = express.Router();

const { createUser, login, registerUser, logout } = require("../controllers/auth.controller");

//Creates User and Sends Email Conf: req has basic user info
router.post("/createUser", createUser);

//Logs User In: req has password and email
router.post("/login", login);

//Registers User (Email Confirmed): req checks jwt and id
router.get("/register/:token", registerUser)

router.post("/logout", logout)
module.exports = router;