const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  wallet: String, // User's TRX wallet address for withdrawals
  balance: { type: Number, default: 0 }, // User's staked balance
  walletBalance: { type: Number, default: 0 }, // User's wallet balance (not staked)
  referrals: { type: Number, default: 0 }, // Number of referrals the user has
  earnings: { type: Number, default: 0 }, // Earnings from staking
  referredBy: String, // Referrer ID for this user (used in referral tracking)
  premium: { type: Boolean, default: false }, // Whether the user is a premium member
  referralBonus: { type: Number, default: 0 }, // Total referral bonus earned
  joinedAt: { type: Date, default: Date.now }, // Date when the user joined
  lastActive: { type: Date }, // Tracks last time the user interacted with the bot
});

module.exports = mongoose.model("User", userSchema);
