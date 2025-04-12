require("dotenv").config(); // Always at the very top
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const express = require("express");

// Debug env value
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);

// Create bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ Mongo Error:", err);
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

// Inline buttons and cron jobs
require("./utils/cronJobs")(bot);
require("./utils/inlineButtons")(bot);

// Express for Render health check
const app = express();

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Start Express server on dynamic port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
