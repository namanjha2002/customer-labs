const express = require("express");
const router = express.Router();
const { handleIncomingData} = require("../controller/dataLogic.controller");

// Define the route correctly
router.post("/api/server/incoming_data", handleIncomingData);

module.exports = router;