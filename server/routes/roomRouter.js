const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const multer = require("multer");
const { createRoom, updateRoomImages, getRooms, deleteRoom, getRoom } = require("../controllers/room.controller");
const checkActive = require("../middleware/checkActive.middleware")

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
router.get("/room/:id", protect, checkActive, getRoom);

//Get All rooms
router.get("/:offset/:location?/:price?", protect, checkActive, getRooms);

//Create/Update room : req has room info and user id 
router.post("/", protect,upload.array("images", 5), createRoom, updateRoomImages);

//Delete Room : protected
router.delete("/", protect, deleteRoom);

module.exports = router;