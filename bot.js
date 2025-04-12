// bot.js
const express = require('express');
const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Load bot commands and features
require('./commands/start')(bot);
require('./commands/help')(bot);
require('./commands/stake')(bot);
require('./commands/withdraw')(bot);
require('./commands/referral')(bot);
require('./commands/premium')(bot);
require('./cronjobs')(); // ✅ Start scheduled tasks

// ✅ Dummy Express route to keep alive on Render
app.get('/', (req, res) => {
  res.send('🤖 TRX Staking Bot is alive!');
});

// ✅ Render-compatible port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Express running on ${PORT}`);
});

// ✅ Start bot with polling
bot.launch().then(() => {
  console.log('✅ Bot launched with polling');
});

// ✅ Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
