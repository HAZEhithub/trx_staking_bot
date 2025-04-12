module.exports = (bot, ctx) => {
  // Sending the help menu with available commands
  ctx.reply(`❓ *Help Menu*

Here are some commands you can use:

/start - Introduction & how it works
/stake - Begin staking TRX
/balance - Show your staking status
/withdraw - Take out your earnings
/setwallet - Set your TRX withdrawal wallet
/refer - Share to earn from referrals
/premium - Get premium returns

For assistance, please reach out to our support group.

Select an option below to get started or get help!`, {
    parse_mode: 'Markdown', // Ensures the message is displayed with proper formatting
    reply_markup: {
      inline_keyboard: [
        [{ text: "📊 View Balance", callback_data: "view_balance" }],
        [{ text: "💰 Stake TRX", callback_data: "stake_more" }],
        [{ text: "💸 Withdraw Earnings", callback_data: "withdraw" }]
      ]
    }
  });
};
