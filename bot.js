require("dotenv").config(); // Always at the very top
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Debug env value
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ Mongo Error:", err);
  });

// Setup bot in webhook mode
const bot = new TelegramBot(process.env.BOT_TOKEN);
bot.setWebHook(`${process.env.RENDER_EXTERNAL_URL}/bot${process.env.BOT_TOKEN}`);
app.use(express.json());
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Load commands
fs.readdirSync("./commands").forEach(file => {
  const command = require(`./commands/${file}`);
  if (typeof command === "function") {
    bot.onText(new RegExp("/" + file.replace(".js", ""), "i"), (msg, match) => {
      command(bot, msg, match);
    });
  }
});

// Inline queries and scheduled jobs
require("./utils/cronJobs")(bot);
require("./utils/inlineButtons")(bot);

// Optional home route
app.get("/", (req, res) => {
  res.send("🔥 TRX Staking Bot is live via webhook!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
