const User = require('../models/User');

// TRX wallet address validation
const isValidTRXAddress = (wallet) => {
  const trxWalletRegex = /^T[a-zA-Z0-9]{33}$/;
  return trxWalletRegex.test(wallet);
};

module.exports = async (ctx) => {
  const userId = ctx.from.id;
  const wallet = ctx.message.text.split(' ')[1]; // /setwallet WALLET_ADDRESS

  if (!wallet) {
    return ctx.reply('❌ Usage: /setwallet YOUR_TRX_WALLET');
  }

  if (!isValidTRXAddress(wallet)) {
    return ctx.reply('❌ Invalid TRX wallet address. It must start with "T" and be 34 characters long.');
  }

  console.log(`User ${userId} is setting wallet to: ${wallet}`);

  try {
    const user = await User.findOneAndUpdate(
      { telegramId: userId },
      { wallet },
      { upsert: true, new: true }
    );

    ctx.reply(
      `✅ Your TRX wallet address has been set to:\n` +
      `\`\`\`\n${wallet}\n\`\`\`\nMake sure it's correct for future withdrawals.`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: "💰 Stake More", callback_data: "stake" }],
            [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }]
          ]
        }
      }
    );
  } catch (err) {
    console.error('Error saving wallet address:', err);
    ctx.reply('❌ Error saving wallet address. Please try again later.');
  }
};
