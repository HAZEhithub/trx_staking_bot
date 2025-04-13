const User = require('../models/User');

// Simple regex for TRX wallet address validation
const isValidTRXAddress = (wallet) => {
  const trxWalletRegex = /^T[a-zA-Z0-9]{33}$/; // Starts with T, 34 characters total
  return trxWalletRegex.test(wallet);
};

module.exports = async (ctx) => {
  try {
    const userId = ctx.from.id;
    const wallet = ctx.message.text.split(' ')[1]; // /setwallet WALLET

    if (!wallet) {
      return ctx.reply('❌ Usage: /setwallet YOUR_TRX_WALLET');
    }

    if (!isValidTRXAddress(wallet)) {
      return ctx.reply('❌ Invalid TRX wallet address. Make sure it starts with "T" and is 34 characters long.');
    }

    await User.findOneAndUpdate(
      { telegramId: userId },
      { wallet },
      { upsert: true, new: true }
    );

    await ctx.reply(
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
  } catch (err) {
    console.error('❌ Error saving wallet address:', err);
    ctx.reply('❌ Something went wrong while saving your wallet address.');
  }
};
