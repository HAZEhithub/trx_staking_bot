require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const fs = require("fs");
const express = require("express");
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const URL = process.env.RENDER_EXTERNAL_URL; // set this in Render env vars

const bot = new TelegramBot(BOT_TOKEN, { webHook: { port: process.env.PORT || 10000 } });

// Set webhook to your Render URL + /bot<BOT_TOKEN>
bot.setWebHook(`${URL}/bot${BOT_TOKEN}`);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// Auto-load commands
fs.readdirSync("./commands").forEach(file => {
  const command = require(`./commands/${file}`);
  if (typeof command === "function") {
    bot.onText(new RegExp("/" + file.replace(".js", ""), "i"), (msg, match) => {
      command(bot, msg, match);
    });
  }
});

// Load buttons and cron
require("./utils/cronJobs")(bot);
require("./utils/inlineButtons")(bot);

// Webhook endpoint (must be POST)
app.use(express.json());
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Health check
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Express running on ${PORT}`);
});
