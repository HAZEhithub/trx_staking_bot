const { bot } = require('../bot.js');
module.exports = (bot) => {
  bot.onText(/\/admin/, async (msg) => {
    const chatId = msg.chat.id;
    const adminId = process.env.ADMIN_ID;

    if (msg.from.id.toString() !== adminId) {
      return bot.sendMessage(chatId, "⛔ You are not authorized to access the admin panel.");
    }

    const message = `
📊 *Admin Panel*:

Manage the bot, check statistics, and perform admin tasks:

- /stats - 📈 View global stats
- /users - 👥 View all users
- /withdraw <user_id> <amount> - 💸 Force withdraw
- /broadcast <message> - 📢 Send a message to all users
- /premium <user_id> - 🌟 Grant Premium to a user

You can perform these tasks using the buttons below.
    `;

    bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: "📈 View Global Stats", callback_data: "view_stats" }],
          [{ text: "👥 View Users", callback_data: "view_users" }],
          [{ text: "💸 Force Withdraw", callback_data: "force_withdraw" }],
          [{ text: "📢 Broadcast Message", callback_data: "broadcast" }],
          [{ text: "🌟 Grant Premium", callback_data: "grant_premium" }],
        ]
      }
    });
  });
};
