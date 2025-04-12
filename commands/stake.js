module.exports = (bot) => {
  bot.onText(/\/stake/, async (msg) => {
    const chatId = msg.chat.id;

    const message = `
💰 *Stake TRX Now!*

Send your TRX to the following address:

*TDw8ohi69oCU1LN76uS9UMhTh94Dao81jW*

Once sent, the staking will be automatically recorded and you'll start earning based on the plan.

Use /balance to check your earnings.
    `;

    bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
  });
};
