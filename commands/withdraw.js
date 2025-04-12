module.exports = (bot, ctx) => {
  const userId = ctx.from.id;

  ctx.reply(`💸 *Withdrawal Process*

To withdraw your earnings, send the amount you want to withdraw along with your wallet address. For example:

/withdraw 100 TRX

Please note that withdrawal fees may apply.`, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: "💰 Stake More", callback_data: "stake_more" }],
        [{ text: "📈 View Your Stats", callback_data: "view_stats" }]
      ]
    }
  });
};
