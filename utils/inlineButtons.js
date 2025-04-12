// Inline UI for button navigation
module.exports = (bot) => {
  bot.on("callback_query", async (query) => {
    const { message, data } = query;
    if (data === "check_balance") {
      bot.sendMessage(message.chat.id, "Your current TRX balance is: 0 (demo)");
    }
    if (data === "withdraw") {
      bot.sendMessage(message.chat.id, "💸 Withdraw feature coming soon!");
    }
  });
};