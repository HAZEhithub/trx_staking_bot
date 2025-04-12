require("dotenv").config(); // Always at the very top
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Debug env value
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);

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

// Inline queries and scheduled jobs
require("./utils/cronJobs")(bot);
require("./utils/inlineButtons")(bot);

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Service is running');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

