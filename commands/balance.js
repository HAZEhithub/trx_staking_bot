module.exports = (bot, ctx) => {
  // Accessing the chat ID from ctx, not msg
  const userId = ctx.from.id;
  
  // Fetch the balance from the database or calculate the balance for the user
  // Assuming balance is a part of your User model (you should implement this query)
  User.findOne({ telegramId: userId })
    .then(user => {
      if (user) {
        // Send the user their balance
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
        ctx.reply('❌ You have no balance information available. Please start staking.');
      }
    })
    .catch(err => {
      console.error(err);
      ctx.reply('❌ Error fetching balance information. Please try again later.');
    });
};
