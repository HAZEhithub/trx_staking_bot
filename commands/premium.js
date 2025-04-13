const User = require('../models/User');

module.exports = async (bot, ctx) => {
  try {
    const userId = ctx.from?.id || ctx.message?.from?.id || ctx.callbackQuery?.from?.id;

    if (!userId) {
      return ctx.reply("❌ Could not identify you. Please try using /start first.");
    }

    console.log('🔍 User ID:', userId);

    const user = await User.findOne({ telegramId: userId.toString() });
    console.log('✅ User found:', user);

    if (!user) {
      return ctx.reply("❌ You're not registered. Use /start first.");
    }

    if (user.premium) {
      return ctx.reply("💎 You already have Premium membership!");
    }

    return ctx.reply(
      `💎 *Premium Membership*\n\n` +
      `Unlock higher staking rewards and faster withdrawals!\n\n` +
      `💰 Premium Price: $45 (paid in TRX)\n` +
      `Send TRX to:\n` +
      `\`\`\`\nTBP6FPZPon1BqdTYcUpBKoMzk6729jpctN\n\`\`\`\n\n` +
      `Once paid, premium will be activated within minutes.\n\n` +
      `Need help? Message our support team.\n\n` +
      `👇 Choose what to do next:`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: "📊 View Your Stats", callback_data: "view_stats" }],
            [{ text: "💰 Stake More", callback_data: "stake_more" }],
            [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }]
          ]
        }
      }
    );

  } catch (error) {
    console.error('❌ Error in premium command:', error);
    return ctx.reply("🚫 Something went wrong while checking your premium status. Please try again later.");
  }
};
