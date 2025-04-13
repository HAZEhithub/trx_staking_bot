const User = require("../models/User");

module.exports = async (ctx) => {
  try {
    if (!ctx.from) {
      return ctx.reply('❌ Something went wrong. Please try again later.');
    }

    const userId = ctx.from.id;
    const user = await User.findOne({ telegramId: userId });

    if (!user) {
      return ctx.reply('❌ You have no balance information available. Please start staking.');
    }

    await ctx.reply(
      `📊 *Your Balance*\n\n` +
      `🔐 Staked: *${user.balance || 0} TRX*\n` +
      `👛 Wallet Balance: *${user.walletBalance || 0} TRX*\n` +
      `💸 Earnings: *${user.earnings || 0} TRX*`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: "💰 Stake More", callback_data: "stake" }],
            [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }]
          ]
        }
      }
    );
  } catch (err) {
    console.error('❌ Error fetching user balance:', err);
    ctx.reply('❌ Error fetching balance information. Please try again later.');
  }
};
