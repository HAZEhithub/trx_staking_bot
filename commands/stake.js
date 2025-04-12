module.exports = (ctx) => {
  ctx.reply(
    "💰 *Staking Instructions*\n\n" +
    "To stake your TRX, simply send the amount you want to stake. For example:\n" +
    "/stake 100 TRX\n\n" +
    "Remember, the more you stake, the greater your rewards. You will also unlock premium features for better rewards.\n\n" +
    "Click below to start staking!",
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: "💰 Start Staking", callback_data: "start_staking" }],
          [{ text: "📈 View Stats", callback_data: "view_stats" }]
        ]
      }
    }
  );
};
