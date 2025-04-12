module.exports = (bot, ctx) => {
  // Ensure ctx.from is available
  if (!ctx.from) {
    return ctx.reply('❌ Something went wrong. Please try again later.');
  }

  // Accessing the Telegram user ID
  const userId = ctx.from.id;

  // Fetch the user's balance from the database
  User.findOne({ telegramId: userId })
    .then(user => {
      if (user) {
        // Send the user their balance info
        ctx.reply(
          `📊 Your balance:\n\n` +
          `Staked: ${user.balance} TRX\n` +
          `Wallet Balance: ${user.walletBalance} TRX\n` +
          `Earnings: ${user.earnings} TRX`,
          {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [{ text: "💰 Stake More", callback_data: "stake_more" }],
                [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }]
              ]
            }
          }
        );
      } else {
        // If the user doesn't have balance info yet
        ctx.reply('❌ You have no balance information available. Please start staking.');
      }
    })
    .catch(err => {
      console.error('Error fetching user balance:', err);
      ctx.reply('❌ Error fetching balance information. Please try again later.');
    });
};
