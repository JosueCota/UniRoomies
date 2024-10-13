const express = require("express")
const router = express.Router();

const { createUser, login } = require("../controllers/auth.controller");

//Logs User In: req has password and email
router.post("/createUser", createUser);

//Registers User (Email Confirmed): req has reg code and id
router.post("/login", login);

module.exports = router;