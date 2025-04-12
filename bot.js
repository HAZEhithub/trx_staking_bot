const express = require('express');
const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ MongoDB Connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('❌ MongoDB URI is missing in environment variables.');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ✅ Import Command Handlers
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const stakeCommand = require('./commands/stake');
const withdrawCommand = require('./commands/withdraw');
const referralCommand = require('./commands/referral');
const premiumCommand = require('./commands/premium');
const balanceCommand = require('./commands/balance');
const setWalletCommand = require('./commands/setwallet');

// ✅ Setup Commands with Context
bot.command('start', (ctx) => startCommand(bot, ctx));
bot.command('help', (ctx) => helpCommand(bot, ctx));
bot.command('stake', (ctx) => stakeCommand(bot, ctx));
bot.command('withdraw', (ctx) => withdrawCommand(bot, ctx));
bot.command('refer', (ctx) => referralCommand(bot, ctx));
bot.command('referral', (ctx) => referralCommand(bot, ctx)); // for misspelling
bot.command('premium', (ctx) => premiumCommand(bot, ctx));
bot.command('balance', (ctx) => balanceCommand(bot, ctx));
bot.command('setwallet', (ctx) => setWalletCommand(bot, ctx));

// ✅ Dummy Route for Render Keep-Alive
app.get('/', (req, res) => {
  res.send('🤖 TRX Staking Bot is up and running!');
});

// ✅ Cron Jobs for Staking Updates
require('./cronjobs')();

// ✅ Express Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Express running on port ${PORT}`);
});

// ✅ Start Telegram Bot
bot.launch().then(() => {
  console.log('✅ Bot launched and listening on Telegram');
});

// ✅ Graceful Shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
