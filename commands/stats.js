// commands/stats.js

const User = require("../models/User");
const Stake = require("../models/Stake");

module.exports = async (ctx) => {
  try {
    const userCount = await User.countDocuments();
    const totalStaked = await Stake.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const total = totalStaked[0] ? totalStaked[0].total : 0;

    ctx.reply(`📊 Bot Statistics:
👥 Total Users: ${userCount}
💰 Total TRX Staked: ${total} TRX`);
  } catch (err) {
    console.error("❌ Error in /stats command:", err);
    ctx.reply("Something went wrong fetching stats.");
  }
};
