const User = require("../models/User");

module.exports = async (bot, msg, match) => {
  const chatId = msg.chat.id;
  const amount = parseFloat(match[1]);

  const user = await User.findOne({ telegramId: chatId.toString() });

  if (!user || !user.wallet) {
    return bot.sendMessage(chatId, "❌ Set your TRX wallet first with /setwallet.");
  }

  if (user.balance < amount || amount < 1) {
    return bot.sendMessage(chatId, "❌ Insufficient balance or invalid amount.");
  }

  user.balance -= amount;
  await user.save();

  // Just a simulation
  bot.sendMessage(chatId, `✅ Withdrawal of ${amount} TRX requested to ${user.wallet}`);
};