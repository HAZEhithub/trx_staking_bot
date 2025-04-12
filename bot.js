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
  if (!ctx.message || !ctx.from || !ctx.chat) {
    console.warn("⚠️ Skipped update due to missing message/from/chat:", ctx.update);
    return;
  }
  try {
    await next();
  } catch (err) {
    console.error("❌ Unhandled bot error:", err);
  }
});

// === ✅ Connect MongoDB ===
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
