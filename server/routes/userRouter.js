const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");

const { deleteUser, updateUserPassword, updateUser, updateActiveUser, updateUserDetails, getUserDetails } = require("../controllers/user.controller")

// @ROUTE /api/users

//Protect authentication function auto returns user with id into req.user

//Update User Password : req has new password, old password, and id
router.put("/password", protect, updateUserPassword);

//Update User: req has id and new data (email, firstName, lastName [not password])
router.put("/", protect, updateUser);

//Update User isActive
router.put("/activate", protect, updateActiveUser);

//User details is either created or updated
router.post("/userDetails", protect, updateUserDetails);

//Get User Details from user
router.get("/userDetails", protect, getUserDetails) 

//Delete User : req has user id
router.delete("/", protect, deleteUser);

module.exports = router;