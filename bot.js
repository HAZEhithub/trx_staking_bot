const { Telegraf } = require("telegraf");
const mongoose = require("mongoose");
const express = require("express");
const cronJobs = require("./cronjobs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;
const bot = new Telegraf(process.env.BOT_TOKEN);

// === ✅ MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// === ✅ Bot Middleware ===
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

// === ✅ Command Handlers ===
const start = require("./commands/start");
const balance = require("./commands/balance");
const referral = require("./commands/referral");
const setwallet = require("./commands/setwallet");
const premium = require("./commands/premium");
const withdraw = require("./commands/withdraw");
const help = require("./commands/help");
const stats = require("./commands/stats");

// === ✅ Register Commands ===
bot.start((ctx) => start(ctx));
bot.command("balance", (ctx) => balance(ctx));
bot.command("referral", (ctx) => referral(ctx));
bot.command("setwallet", (ctx) => setwallet(ctx));
bot.command("premium", (ctx) => premium(ctx));
bot.command("withdraw", (ctx) => withdraw(ctx));
bot.command("help", (ctx) => help(ctx));
bot.command("stats", (ctx) => stats(ctx));

// === ✅ Inline Actions ===
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

// === ✅ Launch Bot Using Long Polling (NO Webhook) ===
bot.launch().then(() => {
  console.log("🤖 Bot launched successfully with long polling ✅");
});

// === ✅ Optional: Health Check Route ===
app.get("/", (req, res) => {
  res.send("🤖 Bot is running and healthy ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
});
