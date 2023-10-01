const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { v4: uuidv4 } = require("uuid"); // Import the v4 function from uuid

const Wallet = require("../models/wallet");
const Transaction = require("../models/transaction");


exports.setupWallet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().map((e) => e.msg).join(", "));
    }

    const { balance, name } = req.body;

    const transactionId = uuidv4();

    const wallet = new Wallet({
      balance,
      name,
    });
    await wallet.save();

    const transaction = new Transaction({
        wallet: wallet._id,
        amount: balance,
        description: "Wallet Setup",
        _id: transactionId,
        type: "CREDIT",
    });
    await transaction.save();

    const walletResponse = {
        id: wallet._id,
        balance: wallet.balance,
        transactionId,
        name: wallet.name,
        date: wallet.createdAt.toISOString(),
      };

    return successResponse(res, "Wallet setup successful", walletResponse);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error", 500);
  }
};

// Retrieve wallet details by ID
exports.getWalletById = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(res, errors.array().map((e) => e.msg).join(", "));
      }
  
      const { id } = req.params;
  
      // Find the wallet by ID using the Wallet model
      const wallet = await Wallet.findById(id);
  
      if (!wallet) {
        return errorResponse(res, "Wallet not found", 404);
      }
  
      // Format the wallet details response
      const walletResponse = {
        id: wallet._id,
        balance: wallet.balance,
        name: wallet.name,
        date: wallet.createdAt.toISOString(),
      };
  
      return successResponse(res, "Wallet details retrieved successfully", walletResponse);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Internal Server Error", 500);
    }
  };

exports.transactWallet = async (req, res) => {
    console.log(req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().map((e) => e.msg).join(", "));
    }

    const { walletId } = req.params;
    const { amount, description } = req.body;

    // Find the wallet by ID
    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
      return errorResponse(res, "Wallet not found", 404);
    }

    // Calculate the new balance based on credit or debit
    const parsedAmount = Number(amount);
    const newBalance = parseFloat((wallet.balance + parsedAmount).toFixed(4));

    const type = parsedAmount>0 ? "CREDIT" : "DEBIT";

    // Create a new transaction record
    const transaction = new Transaction({
        wallet: wallet._id,
        amount: parsedAmount,
        description,
        type,
    });

    

    // Save the transaction
    await transaction.save();

    // Update the wallet balance
    wallet.balance = newBalance;
    await wallet.save();

    // Response with the updated balance and transaction ID
    const response = {
      balance: newBalance,
      transactionId: transaction._id, // Use the generated transaction ID
    };

    return successResponse(res, "Transaction successful", response);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error", 500);
  }
};

exports.fetchTransactions = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(res, errors.array().map((e) => e.msg).join(", "));
      }
  
      const { walletId, skip, limit } = req.query;
  
      // Find the wallet by ID
      const wallet = await Wallet.findById(walletId);
  
      if (!wallet) {
        return errorResponse(res, "Wallet not found", 404);
      }
  
      // Fetch recent transactions for the specified wallet
      const transactions = await Transaction.find({ wallet: walletId })
        .sort({ date: -1 }) // Sort by date in descending order (most recent first)
        .skip(Number(skip))
        .limit(Number(limit));
  
      // Map transactions to the required response format
      const transactionResponse = transactions.map((transaction) => ({
        id: transaction._id,
        walletId: transaction.walletId,
        amount: transaction.amount,
        balance: transaction.balance,
        description: transaction.description,
        date: transaction.date,
        type: transaction.amount > 0 ? "CREDIT" : "DEBIT", // Determine transaction type
      }));
  
      return successResponse(res, "Transactions fetched successfully", transactionResponse);
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Internal Server Error", 500);
    }
};

