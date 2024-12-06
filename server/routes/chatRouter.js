const express = require("express")
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const checkActive = require("../middleware/checkActive.middleware")
// @ROUTE api/chats/

//
router.get("", protect );

//Account for inclusion/exclusion 
router.get("/:offset/:location?/:budget?",protect, checkActive);

module.exports = router;