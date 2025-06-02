const express = require("express");
const router = express.Router();
const { createAccount,getAccountById,updateAccount,deleteAccount } = require("../controller/account.controller");

// Define the route correctly
router.post("/api/create-account", createAccount);
router.get("/api/get-account/:accountId", getAccountById);
router.put("/api/update-account/:accountId", updateAccount);
router.delete("/api/delete-account/:accountId", deleteAccount);

module.exports = router;
