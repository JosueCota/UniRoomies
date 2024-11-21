const express = require("express")
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const { getRoommates, getRoommate } = require("../controllers/roommates.controller")
const checkActive = require("../middleware/checkActive.middleware")
// @ROUTE api/roommates/

//Get Specific Roommate (all user_details returned)
router.get("/roommate/:id", protect, checkActive, getRoommate);

//Get all Roommates (10 returned, req has id which correlates to 10*(id-1) - 10*(id) 
//Account for inclusion/exclusion 
router.get("/:offset/:location?/:budget?",protect, checkActive, getRoommates);

module.exports = router;