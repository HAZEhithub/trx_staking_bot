const { Telegraf } = require("telegraf");
const mongoose = require("mongoose");
const express = require("express");
const cronJobs = require("./cronjobs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// === ✅ Initialize Bot ===
const bot = new Telegraf(process.env.BOT_TOKEN);

// === ✅ Middleware to Guard Against ctx.from Errors ===
bot.use(async (ctx, next) => {
  if (!ctx.message && !ctx.callbackQuery) {
    console.warn("⚠️ Skipped update due to missing message/from/chat:", ctx.update);
    return;
  }
  try {
    await next();
  } catch (err) {
    console.error("❌ Unhandled bot error:", err);
  }
});

// === ✅ MongoDB Connect ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// === ✅ Load Commands ===
bot.start(require("./commands/start"));
bot.command("balance", require("./commands/balance"));
bot.command("referral", require("./commands/referral"));
bot.command("setwallet", require("./commands/setwallet"));
bot.command("premium", require("./commands/premium"));
bot.command("withdraw", require("./commands/withdraw"));
bot.command("help", require("./commands/help"));
bot.command("stats", require("./commands/stats"));

// === ✅ Callback Button Handlers ===
bot.action("stake", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("🚀 To stake TRX, send your desired amount to:\n`TBP6FPZPon1BqdTYcUpBKoMzk6729jpctN`\n\nOnce done, your stake will be tracked automatically.", { parse_mode: "Markdown" });
});

bot.action("balance", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("📊 Checking your staking balance...\n\nUse /balance to see your current TRX stake and earnings.");
});

bot.action("withdraw", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("💸 To withdraw your earnings, please use the /withdraw command.");
});

bot.action("referral", async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  const referralLink = `https://t.me/${ctx.me}?start=ref${userId}`;
  ctx.reply(`🎯 Invite your friends and earn bonuses!\nHere is your referral link:\n${referralLink}`);
});

bot.action("premium", async (ctx) => {
  await ctx.answerCbQuery();
  ctx.reply("🌟 Unlock premium to earn higher staking rewards!\n\n💰 Price: $45 (TRX equivalent)\n\nSend payment to:\n`TBP6FPZPon1BqdTYcUpBKoMzk6729jpctN`\n\nOnce paid, your premium will activate automatically.", { parse_mode: "Markdown" });
});

// === ✅ Cron Jobs ===
cronJobs();
console.log("✅ Cron job initialized...");

// === ✅ Express Health Check ===
app.get("/", (req, res) => {
  res.send("Bot is running ✅");
});

app.listen(PORT, () => {
  console.log(`✅ Express running on port ${PORT}`);
});

// === ✅ Launch Bot ===
bot.launch()
  .then(() => console.log("🤖 Bot started successfully"))
  .catch(err => console.error("❌ Bot launch error:", err));

// === ✅ Graceful Stop ===
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
