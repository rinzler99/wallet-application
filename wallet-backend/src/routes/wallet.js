const express = require("express");
const { body } = require("express-validator");
const walletController = require("../controllers/wallet");
const { validateWalletSetup } = require("../middleware/validation");
const router = express.Router();

router.post("/setup", validateWalletSetup, walletController.setupWallet);


module.exports = router;
