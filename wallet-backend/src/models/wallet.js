const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
