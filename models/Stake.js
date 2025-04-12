const mongoose = require('mongoose');

const stakeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }, // Track if the stake is still active
  stakeType: { type: String, enum: ['premium', 'free'], default: 'free' }, // Track whether the stake is premium or free
  earnings: { type: Number, default: 0 }, // Track earnings generated from the stake
});

module.exports = mongoose.model('Stake', stakeSchema);
