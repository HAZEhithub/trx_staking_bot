module.exports = (bot) => {
  bot.onText(/\/admin/, async (msg) => {
    const chatId = msg.chat.id;
    const adminId = process.env.ADMIN_ID;

    if (msg.from.id.toString() !== adminId) {
      return bot.sendMessage(chatId, "⛔ You are not authorized to access the admin panel.");
    }

    const message = `
📊 Admin Panel:

/stats - 📈 View global stats
/users - 👥 View all users
/withdraw <user_id> <amount> - 💸 Force withdraw
/broadcast <message> - 📢 Send message to all users
/premium <user_id> - 🌟 Grant Premium
    `;

    bot.sendMessage(chatId, message);
  });
};
