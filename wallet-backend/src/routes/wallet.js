const express = require("express");
const { body, param, query } = require("express-validator");
const walletController = require("../controllers/wallet");
const { validateWalletSetup } = require("../middleware/validation");
const validateAmount = require("../middleware/validateAmount");
const router = express.Router();

router.post("/setup", [validateWalletSetup, validateAmount], walletController.setupWallet);

// Route for crediting/debiting the wallet
router.post(
    "/transact/:walletId",
    [
      param("walletId").isMongoId().withMessage("Invalid wallet ID"),
      body("amount").isNumeric().withMessage("Amount must be a number"),
      body("description").isString(),
      validateAmount,
    ],
    walletController.transactWallet
  );
  
// Route for fetching transactions
router.get(
    "/transactions",
    [
      query("walletId").isMongoId().withMessage("Invalid wallet ID"),
      query("skip").optional().isInt().withMessage("Skip must be an integer"),
      query("limit").optional().isInt().withMessage("Limit must be an integer"),
    ],
    walletController.fetchTransactions
  );

// Route for fetching wallet details by ID
router.get(
    "/:id",
    [param("id").isMongoId().withMessage("Invalid wallet ID")],
    walletController.getWalletById
  );

module.exports = router;
