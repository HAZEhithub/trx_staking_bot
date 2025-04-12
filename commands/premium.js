module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  const address = process.env.WALLET_ADDRESS;
  bot.sendMessage(chatId, `
💎 Premium Access: 45 TRX
Send TRX to: ${address}
Then use /confirmtrx to activate.
  `);
};