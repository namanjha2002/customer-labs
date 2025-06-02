const express = require("express");
const router = express.Router();
const { createDestination,getDestinationsByAccount,updateDestination,deleteDestination } = require("../controller/destination.controller");

// Define the route correctly
router.post("/api/create-destination", createDestination);
router.get("/api/get-destination/:accountId", getDestinationsByAccount);
router.put("/api/update-destination/:id", updateDestination);
router.delete("/api/delete-destination/:id", deleteDestination);

module.exports = router;