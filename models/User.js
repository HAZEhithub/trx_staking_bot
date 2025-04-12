const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  wallet: String,
  balance: { type: Number, default: 0 },
  referrals: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  referredBy: String,
  premium: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);