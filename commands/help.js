module.exports = (bot) => {
  bot.command('help', (msg) => {
    const helpMessage = `
    🤖 Here are the available commands:

    /start - Get started with the bot
    /stake - Stake TRX
    /balance - Check your balance
    /withdraw - Withdraw your earnings
    /refer - Get your referral link
    /premium - Upgrade to Premium

    Use these commands to interact with the bot.
    `;
    bot.sendMessage(msg.chat.id, helpMessage);
  });
};
