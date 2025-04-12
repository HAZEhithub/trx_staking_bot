module.exports = (bot, ctx) => {
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
};
