const { bot } = require('../bot.js');
const User = require("../models/User");

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;

  // Find the user by telegramId
  const user = await User.findOne({ telegramId: chatId.toString() });

  // Check if the user is registered
  if (!user) {
    return bot.sendMessage(chatId, "❌ You are not registered.");
  }

  // Activate Premium status
  user.premium = true;
  await user.save();

  // Send the success message along with the inline buttons
  bot.sendMessage(chatId, 
    "✅ *Premium Activated!*\n\n" +
    "Congratulations! You have successfully activated Premium membership.\n" +
    "As a premium member, you will enjoy faster staking rewards and priority withdrawals.\n\n" +
    "Use the buttons below to access other features.",
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: "💰 Stake More", callback_data: "stake_more" }],
          [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }],
          [{ text: "📈 View Staking Stats", callback_data: "view_stats" }]
        ]
      }
    }
  );
};
