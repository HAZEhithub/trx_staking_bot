module.exports = (bot, ctx) => {
  const userId = ctx.from.id;
  const referralLink = `https://t.me/${bot.botInfo.username}?start=${userId}`;
  ctx.reply(`📢 *Referral Program*

Invite your friends and earn bonus TRX!

🔗 Your referral link:
${referralLink}

You earn a commission whenever they stake. Use your influence to earn more!

Start inviting now by clicking below!`, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: "📊 View Your Stats", callback_data: "view_stats" }],
        [{ text: "💰 Stake More", callback_data: "stake_more" }],
        [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }]
      ]
    }
  });
};
