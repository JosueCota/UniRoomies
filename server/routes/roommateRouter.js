const express = require("express")
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const { getRoommates } = require("../controllers/roommates.controller")

// @ROUTE api/roommates/

//Get all Roommates (10 returned, req has id which correlates to 10*(id-1) - 10*(id) 
//Account for inclusion/exclusion 

router.get("/",protect, getRoommates);

module.exports = router;