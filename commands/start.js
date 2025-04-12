module.exports = (bot, msg) => {
  const welcome = `👋 Welcome ${msg.from.first_name}!
💼 Earn TRX daily by staking with us!

Use:
/stake - Stake TRX
/balance - Check balance
/withdraw - Withdraw earnings
/refer - Share your referral link
/premium - Upgrade to Premium`;
  bot.sendMessage(msg.chat.id, welcome);
};