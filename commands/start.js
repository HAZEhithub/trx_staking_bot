module.exports = (bot, ctx) => {
  // Check if ctx and ctx.from are valid
  if (ctx && ctx.from && ctx.from.first_name) {
    const welcome = `👋 Welcome ${ctx.from.first_name}!
💼 Earn TRX daily by staking with us!

Use:
/stake - Stake TRX
/balance - Check balance
/withdraw - Withdraw earnings
/refer - Share your referral link
/premium - Upgrade to Premium`;

    ctx.reply(welcome);  // Use ctx.reply() instead of bot.sendMessage
  } else {
    console.error("Error: ctx or ctx.from is undefined");
    ctx.reply("Sorry, something went wrong. Please try again.");
  }
};
