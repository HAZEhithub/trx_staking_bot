module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `👥 Invite friends: https://t.me/YourBot?start=${chatId}`);
};