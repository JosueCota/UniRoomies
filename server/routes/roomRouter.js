const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware")

//Get specific room: req has room id
router.get("/:id", protect, (req, res) => {
    res.send("it works!" + req.params.id)
});

//Get All rooms
router.get("/", protect, (req, res) => {
    res.send("it works!")
});

//Create/Update room : req has room info and user id 
router.post("/", protect, (req, res) => {

});

//Delete Room : protected
router.delete("/", protect, (req, res) => {

});

module.exports = router;