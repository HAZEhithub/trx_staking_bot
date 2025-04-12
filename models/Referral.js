const mongoose = require('mongoose');
const referralSchema = new mongoose.Schema({
  referrerId: String,
  referredId: String,
  bonusGiven: Boolean,
});
module.exports = mongoose.model('Referral', referralSchema);