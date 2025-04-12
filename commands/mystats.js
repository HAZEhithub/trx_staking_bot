const User = require("../models/User");

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  const user = await User.findOne({ telegramId: chatId.toString() });

  if (!user) {
    return bot.sendMessage(chatId, "❌ You're not registered. Use /start first.");
  }

  bot.sendMessage(chatId, `
📊 Your Stats:
👜 Wallet: ${user.wallet || "Not set"}
💰 Balance: ${user.balance} TRX
🎁 Referrals: ${user.referrals}
⭐ Premium: ${user.premium ? "Yes" : "No"}
  `);
};