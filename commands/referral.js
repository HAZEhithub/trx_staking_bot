module.exports = async (bot, ctx) => {
  const userId = ctx.from.id;

  try {
    // Log user ID for debugging purposes
    console.log('User ID:', userId);

    // Fetch bot info in case it's not available or needs to be refreshed
    const botInfo = await bot.getMe();
    console.log('Bot Info:', botInfo); // Check bot info

    // Generate the referral link using the bot's username and the user's ID
    const referralLink = `https://t.me/${botInfo.username}?start=${userId}`;

    // Send the referral program details to the user
    ctx.reply(
      `📢 *Referral Program*\n\n` +
      `Invite your friends and earn bonus TRX!\n\n` +
      `🔗 Your referral link:\n` +
      `${referralLink}\n\n` +
      `You earn a commission whenever they stake. Use your influence to earn more!\n\n` +
      `Start inviting now by clicking below!`,
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
    // Log the error and send an error message to the user
    console.error('Error generating referral link:', error);
    ctx.reply("❌ Something went wrong while generating your referral link. Please try again later.");
  }
};
