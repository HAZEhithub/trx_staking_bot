const express = require('express');
const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });


// ✅ Load bot commands and features
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const stakeCommand = require('./commands/stake');
const withdrawCommand = require('./commands/withdraw');
const referralCommand = require('./commands/referral');
const premiumCommand = require('./commands/premium');

// ✅ Command handlers
bot.command('start', (ctx) => startCommand(bot, ctx));  // Pass ctx to start.js
bot.command('help', (ctx) => helpCommand(bot, ctx));    // Pass ctx to help.js
bot.command('stake', (ctx) => stakeCommand(bot, ctx));  // Pass ctx to stake.js
bot.command('withdraw', (ctx) => withdrawCommand(bot, ctx));  // Pass ctx to withdraw.js
bot.command('refer', (ctx) => referralCommand(bot, ctx));    // Pass ctx to referral.js
bot.command('premium', (ctx) => premiumCommand(bot, ctx));  // Pass ctx to premium.js

// ✅ Start scheduled tasks
require('./cronjobs')();

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
