const mongoose = require('mongoose');
const stakeSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Stake', stakeSchema);