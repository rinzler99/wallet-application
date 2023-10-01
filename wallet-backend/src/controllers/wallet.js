const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const Wallet = require("../models/wallet");

exports.setupWallet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array().map((e) => e.msg).join(", "));
    }

    const { balance, name } = req.body;

    const wallet = new Wallet({
      balance,
      name,
    });

    await wallet.save();

    const walletResponse = {
      id: wallet._id,
      balance: wallet.balance,
      transactionId: "67890", 
      name: wallet.name,
      date: wallet.createdAt.toISOString(),
    };

    return successResponse(res, "Wallet setup successful", walletResponse);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal Server Error", 500);
  }
};

exports.getWalletById = async (req, res) => {
  try {
    const { id } = req.params;

    const wallet = await Wallet.findById(id);

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wallet details retrieved successfully",
      data: wallet,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};