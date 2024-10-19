const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");

const { getUser, deleteUser, updateUserPassword, updateUser } = require("../controllers/user.controller")


//Protect authentication function auto returns user with attributes into req.user

//Get specific user: req has user id
router.get("/",protect, getUser);

//Update User Password : req has new password, old password, and id
router.put("/password/",protect, updateUserPassword);

//Update User: req has id and new data (email, firstName, lastName [not password])
router.put("/", protect, updateUser);

//Delete User : req has user id
router.delete("/", protect, deleteUser);

module.exports = router;