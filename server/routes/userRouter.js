const express = require("express");
const router = express.Router();


//Get specific user: req has user id
router.get("/:id", (req, res) => {
    res.send("it works!" + req.params.id)
});

//Get All Users
router.get("/", (req, res) => {
    
    res.send("it works!")
});

//Update User : req has new user data and id
router.put("/", (req, res) => {

});

//Delete User : req has user id
router.delete("/:id", (req, res) => {

});

module.exports = router;