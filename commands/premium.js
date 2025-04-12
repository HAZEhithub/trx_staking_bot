module.exports = async (bot, ctx) => {
  const userId = ctx.from.id;
  console.log('User ID:', userId);  // Log User ID for debugging

  // Check if user exists in the database
  try {
    const user = await User.findOne({ telegramId: userId.toString() });
    console.log('User found:', user);  // Log User Data for debugging
    
    if (!user) {
      return ctx.reply("❌ You're not registered. Use /start first.");
    }

    // Check if the user already has premium
    if (user.premium) {
      return ctx.reply("❌ You already have Premium membership.");
    }

    // Send premium activation details
    ctx.reply(
      `💎 *Premium Membership*\n\n` +
      `Unlock higher staking rewards and faster withdrawals!\n\n` +
      `💰 Premium Price: $45 (paid in TRX)\n` +
      `Send to:\n` +
      `\`\`\`\n` +
      `TBP6FPZPon1BqdTYcUpBKoMzk6729jpctN\n` +
      `\`\`\`\n\n` +
      `Once paid, premium will be activated within minutes.\n\n` +
      `Need assistance? Message support.\n\n` +
      `To activate premium, click below and follow the instructions.`,
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
    console.error('Error in fetching user data:', error);
    ctx.reply("❌ Something went wrong while activating your premium membership. Please try again later.");
  }
};
