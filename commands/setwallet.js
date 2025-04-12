const User = require('../models/User');

// Simple regex for TRX wallet address validation
const isValidTRXAddress = (wallet) => {
  const trxWalletRegex = /^T[a-zA-Z0-9]{33}$/; // TRX wallet addresses typically start with T and are 34 characters long
  return trxWalletRegex.test(wallet);
};

module.exports = (bot, ctx) => {
  const userId = ctx.from.id;
  const wallet = ctx.message.text.split(' ')[1];

  // Check if wallet is provided
  if (!wallet) {
    return ctx.reply('❌ Usage: /setwallet YOUR_TRX_WALLET');
  }

  // Validate the wallet address
  if (!isValidTRXAddress(wallet)) {
    return ctx.reply('❌ Invalid TRX wallet address. Please make sure it starts with "T" and is 34 characters long.');
  }

  // Update wallet in database
  User.findOneAndUpdate({ telegramId: userId }, { wallet }, { upsert: true, new: true })
    .then(() => {
      ctx.reply(
        `✅ Your TRX wallet address has been set to:\n` +
        `\`\`\`\n${wallet}\n\`\`\`\n` +
        `Make sure it's correct for future withdrawals.`,
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
    })
    .catch((err) => {
      console.error(err);
      ctx.reply('❌ Error saving wallet address. Please try again later.');
    });
};
