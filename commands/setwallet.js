const User = require('../models/User');

module.exports = (bot, ctx) => {
  const userId = ctx.from.id;
  const wallet = ctx.message.text.split(' ')[1];

  if (!wallet) {
    return ctx.reply('❌ Usage: /setwallet YOUR_TRX_WALLET');
  }

  User.findOneAndUpdate({ telegramId: userId }, { wallet }, { upsert: true, new: true })
    .then(() => {
      ctx.reply(`✅ Your TRX wallet address has been set to:
\`\`\`
${wallet}
\`\`\`
Make sure it's correct for future withdrawals.`, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: "💰 Stake More", callback_data: "stake_more" }],
            [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }]
          ]
        }
      });
    })
    .catch(err => {
      console.error(err);
      ctx.reply('❌ Error saving wallet address. Please try again later.');
    });
};
