const User = require("../models/User");

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  const user = await User.findOne({ telegramId: chatId.toString() });

  if (!user) return bot.sendMessage(chatId, "❌ You are not registered.");

  // Simulate check
  user.premium = true;
  await user.save();

  bot.sendMessage(chatId, "✅ Premium Activated!");
};