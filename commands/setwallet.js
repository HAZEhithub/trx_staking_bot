const User = require("../models/User");

module.exports = async (bot, msg, match) => {
  const chatId = msg.chat.id;
  const trx = match[1];

  if (!trx || !trx.startsWith("T") || trx.length < 30) {
    return bot.sendMessage(chatId, "❌ Invalid TRX address. Try again.");
  }

  const user = await User.findOneAndUpdate(
    { telegramId: chatId.toString() },
    { wallet: trx },
    { upsert: true, new: true }
  );

  bot.sendMessage(chatId, `✅ TRX Address saved: ${trx}`);
};