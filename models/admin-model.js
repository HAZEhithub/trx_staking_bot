const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  totalDepositFees: { type: Number, default: 0 },
  totalWithdrawalFees: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  transactions: [{
    type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
    amount: { type: Number, required: true },
    fee: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model("Admin", adminSchema);
