const fs = require("fs");
const path = require("path");

const write = (filename, content) => {
  fs.writeFileSync(path.join(__dirname, filename), content.trim());
  console.log(`✅ ${filename} created`);
};

fs.mkdirSync("commands", { recursive: true });
fs.mkdirSync("models", { recursive: true });

write("models/User.js", `
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  wallet: String,
  balance: { type: Number, default: 0 },
  referrals: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  referredBy: String,
  premium: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
`);

write("commands/setwallet.js", `
const User = require("../models/User");

module.exports = async (bot, msg, match) => {
  const chatId = msg.chat.id;
  const trx = match[1];

  if (!trx || !trx.startsWith("T") || trx.length < 30) {
    return bot.sendMessage(chatId, "❌ Invalid TRX address. Try again.");
  }

  const user = await User.findOneAndUpdate(
    { telegramId: chatId.toString() },
    { wallet: trx },
    { upsert: true, new: true }
  );

  bot.sendMessage(chatId, \`✅ TRX Address saved: \${trx}\`);
};
`);

write("commands/mystats.js", `
const User = require("../models/User");

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  const user = await User.findOne({ telegramId: chatId.toString() });

  if (!user) {
    return bot.sendMessage(chatId, "❌ You're not registered. Use /start first.");
  }

  bot.sendMessage(chatId, \`
📊 Your Stats:
👜 Wallet: \${user.wallet || "Not set"}
💰 Balance: \${user.balance} TRX
🎁 Referrals: \${user.referrals}
⭐ Premium: \${user.premium ? "Yes" : "No"}
  \`);
};
`);

write("commands/premium.js", `
module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  const address = process.env.WALLET_ADDRESS;
  bot.sendMessage(chatId, \`
💎 Premium Access: 45 TRX
Send TRX to: \${address}
Then use /confirmtrx to activate.
  \`);
};
`);

write("commands/confirmtrx.js", `
const User = require("../models/User");

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  const user = await User.findOne({ telegramId: chatId.toString() });

  if (!user) return bot.sendMessage(chatId, "❌ You are not registered.");

  // Simulate check
  user.premium = true;
  await user.save();

  bot.sendMessage(chatId, "✅ Premium Activated!");
};
`);

write("commands/withdraw.js", `
const User = require("../models/User");

module.exports = async (bot, msg, match) => {
  const chatId = msg.chat.id;
  const amount = parseFloat(match[1]);

  const user = await User.findOne({ telegramId: chatId.toString() });

  if (!user || !user.wallet) {
    return bot.sendMessage(chatId, "❌ Set your TRX wallet first with /setwallet.");
  }

  if (user.balance < amount || amount < 1) {
    return bot.sendMessage(chatId, "❌ Insufficient balance or invalid amount.");
  }

  user.balance -= amount;
  await user.save();

  // Just a simulation
  bot.sendMessage(chatId, \`✅ Withdrawal of \${amount} TRX requested to \${user.wallet}\`);
};
`);

write("commands/refer.js", `
module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, \`👥 Invite friends: https://t.me/YourBot?start=\${chatId}\`);
};
`);

console.log("✅ All files created successfully!");
