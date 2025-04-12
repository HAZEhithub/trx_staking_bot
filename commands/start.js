module.exports = (ctx) => {
  const firstName = ctx.from.first_name;

  ctx.reply(
    `👋 Welcome ${firstName}!

💼 *Earn TRX daily* by staking with us!
Here's what you can do:

- /stake - Stake TRX and start earning
- /balance - View your staked balance and earnings
- /withdraw - Withdraw your earnings to your wallet
- /setwallet - Set your TRX wallet address for withdrawals
- /refer - Get your referral link and earn bonuses
- /premium - Learn about premium features for higher returns

_We guide you at every step!_`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: "💰 Stake TRX", callback_data: "stake" },
            { text: "📊 View Balance", callback_data: "balance" }
          ],
          [
            { text: "💸 Withdraw Earnings", callback_data: "withdraw" },
            { text: "🔗 Get Referral Link", callback_data: "referral" }
          ],
          [
            { text: "🌟 Premium Features", callback_data: "premium" },
            { text: "🔄 Update Wallet", callback_data: "setwallet" }
          ]
        ]
      }
    }
  );
};
