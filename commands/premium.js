module.exports = async (ctx) => {
  try {
    if (!ctx || !ctx.from) {
      console.warn("⚠️ premium.js called without a valid ctx or ctx.from");
      return;
    }

    const userId = ctx.from.id;
    const trxAddress = "TBP6FPZPon1BqdTYcUpBKoMzk6729jpctN";

    await ctx.reply(
      `🌟 *Unlock Premium Features!*\n\n` +
      `💰 *Price:* $45 (TRX equivalent)\n\n` +
      `📥 Send TRX to this wallet:\n\`${trxAddress}\`\n\n` +
      `✅ Your premium access will be activated automatically once payment is confirmed.`,
      { parse_mode: "Markdown" }
    );
  } catch (err) {
    console.error("❌ Error in premium command:", err);
    if (ctx?.reply) {
      ctx.reply("❌ An error occurred while processing your premium request.");
    }
  }
};
