const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const multer = require("multer");
const { s3Upload } = require("../s3Service");
const { createRoom, updateRoomImages } = require("../controllers/room.controller");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image" && file.mimetype.split("/")[1] !== "gif") {
       cb(null, true)
    } else {
        cb(new Error("File is Not an Image Type.", false))
    }
}

const upload = multer({ storage, fileFilter, limits: {fileSize: 1024 * 1024 * 3}});

// @ROUTE api/rooms/

//Get specific room: req has room id
router.get("/:id", protect, (req, res) => {
    res.send("it works!" + req.params.id)
});

//Get All rooms
router.get("/", protect, (req, res) => {
    res.send("it works!")
});

//Create/Update room : req has room info and user id 
router.post("/", protect, upload.array("images", 5), createRoom, updateRoomImages);

//Delete Room : protected
router.delete("/", protect, (req, res) => {

});

module.exports = router;