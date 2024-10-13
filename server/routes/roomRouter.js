const express = require("express");
const router = express.Router();


//Get specific room: req has room id
router.get("/:id", (req, res) => {
    res.send("it works!" + req.params.id)
});

//Get All rooms
router.get("/", (req, res) => {
    res.send("it works!")
});

//Create rooom : req has room info and user id 
router.post("/", (req, res) => {

});

//Update User : req has new user data and id
router.put("/", (req, res) => {

});

//Delete User : req has user id
router.delete("/:id", (req, res) => {

});

module.exports = router;