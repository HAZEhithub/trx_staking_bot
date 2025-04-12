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
  transactionHistory: [
    {
      type: String, // Type of transaction: "deposit", "withdrawal"
      amount: Number, // Amount of TRX in the transaction
      date: { type: Date, default: Date.now }, // Transaction date
      status: { type: String, enum: ['pending', 'completed'], default: 'pending' }, // Transaction status
    }
  ],
  stakingHistory: [
    {
      amount: Number, // Amount of TRX staked
      interest: Number, // Amount of interest earned
      date: { type: Date, default: Date.now }, // Date of staking
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
