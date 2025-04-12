const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrerId: { type: String, required: true },
  referredId: { type: String, required: true },
  bonusGiven: { type: Boolean, default: false },
  bonusAmount: { type: Number, default: 0 }, // Amount of the bonus given to the referrer
  referralDate: { type: Date, default: Date.now }, // Date of the referral
  referralStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' } // Track status of the referral
});

module.exports = mongoose.model('Referral', referralSchema);
