const { bot } = require('../bot.js');
const User = require("../models/User");

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;

  // Fetch user details
  const user = await User.findOne({ telegramId: chatId.toString() });

  if (!user) {
    return bot.sendMessage(chatId, "❌ You're not registered. Use /start first.");
  }

  // Send user stats
  bot.sendMessage(chatId, `
📊 *Your Stats*:
👜 Wallet: ${user.wallet || "Not set"}
💰 Balance: ${user.balance || 0} TRX
🎁 Referrals: ${user.referrals || 0}
⭐ Premium: ${user.premium ? "Yes" : "No"}`,
  {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: "💰 Stake More", callback_data: "stake_more" }],
        [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }]
      ]
    }
  });
};
