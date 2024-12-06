const express = require("express")
const router = express.Router();
const { createUser, login, registerUser, logout, resendLink } = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware")
// @ROUTE /api/auth/

//Creates User and Sends Email Conf: req has basic user info
router.post("/createUser", createUser);

//Logs User In: req has password and email
router.post("/login", login);

//Registers User (Email Confirmed): req checks jwt and id
router.post("/register", registerUser)

//Resends Email Conf based on email
router.post("/resendLink", resendLink);

//Logs User Out: Expires jwt and removes jwt cookie
router.post("/logout", logout)

router.get("/checkAuth", protect, (req, res) => res.status(200).json({message: "Logged In"}))

module.exports = router;
