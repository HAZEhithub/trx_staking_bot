module.exports = async (ctx) => {
  try {
    await ctx.reply(`
🤖 *Welcome to the TRX Staking Bot!*
Here are the commands you can use:

/start - Start the bot and get the welcome menu
/balance - View your staking balance and earnings
/stats - View platform stats
/premium - View premium membership info
/setwallet - Set or update your TRX wallet address
/withdraw - Withdraw your available earnings
/referral - Get your referral link to invite others
/help - Show this help message

For support or questions, contact @YourSupportUsername
  `, { parse_mode: "Markdown" });
  } catch (error) {
    console.error("❌ Error in help.js:", error);
  }
};
