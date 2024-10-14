const express = require("express");
const router = express.Router();

const { getUser, getUsers, deleteUser, updateUserPassword, updateUser } = require("../controllers/user.controller")

//Get specific user: req has user id
router.get("/:id", getUser);

//Get All Users
router.get("/", getUsers);

//Update User Passowrd : req has new password, old password, and id
router.put("/password/:id", updateUserPassword);

//Update User: req has id and new data (email, firstName, lastName [not password])
router.put("/:id", updateUser);

//Delete User : req has user id
router.delete("/:id", deleteUser);

module.exports = router;