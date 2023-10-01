const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const transactionSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
  amount: {
    type: Number,
    required: true,
    set: (value) => parseFloat(value.toFixed(4))
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["CREDIT", "DEBIT"],
    required: true,
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
