const express = require("express");
const router = express.Router();

//Get specific user: req has user id
router.get("/user", (req, res) => {
    res.send("it works!")
});

//Get All Users
router.get("/users", (req, res) => {
    
    res.send("it works!")
});

//Create User : req has user info form form
//Make reg code and handle email reg link in controller 
router.post("/createUser", (req, res) => {

});

//Update User : req has new user data and id
router.put("/createUser", (req, res) => {

});

//Delete User : req has user id
router.delete("deleteUser", (req, res) => {

});

export default router