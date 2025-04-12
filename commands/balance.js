module.exports = (bot, msg) => {
  bot.sendMessage(msg.chat.id, 
    "📊 *Your Current Staked Balance*\n\n" +
    "Here, you can see how much TRX you have staked and your rewards so far.\n" +
    "💰 Your current staked balance is: *0 TRX* (demo). Keep staking to earn more rewards daily!\n\n" +
    "Remember, the more you stake, the more you earn. If you're ready to stake or withdraw, you can do that from the buttons below.\n\n" +
    "*Note:* Your balance updates every day, so check back regularly to see your earnings.\n\n" +
    "Use /stake to start staking and /withdraw to take out your earnings.",
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: "💰 Stake More", callback_data: "stake_more" },
            { text: "💸 Withdraw Earnings", callback_data: "withdraw" }
          ],
          [
            { text: "📈 View Staking Stats", callback_data: "view_stats" },
            { text: "🔄 Update Wallet", callback_data: "update_wallet" }
          ]
        ]
      }
    }
  );
};
