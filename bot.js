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

// ✅ Telegraf Commands using Context
bot.start((ctx) => startCommand(ctx));
bot.help((ctx) => helpCommand(ctx));
bot.command('stake', (ctx) => stakeCommand(ctx));
bot.command('withdraw', (ctx) => withdrawCommand(ctx));
bot.command('refer', (ctx) => referralCommand(ctx));
bot.command('referral', (ctx) => referralCommand(ctx));
bot.command('premium', (ctx) => premiumCommand(ctx));
bot.command('balance', (ctx) => balanceCommand(ctx));
bot.command('setwallet', (ctx) => setWalletCommand(ctx));

// ✅ Inline Button Callback Handlers (Handled inside commands like start.js)
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  try {
    if (data === 'stake') {
      await stakeCommand(ctx);
    } else if (data === 'withdraw') {
      await withdrawCommand(ctx);
    } else if (data === 'balance') {
      await balanceCommand(ctx);
    } else if (data === 'premium') {
      await premiumCommand(ctx);
    } else if (data === 'referral') {
      await referralCommand(ctx);
    } else if (data === 'setwallet') {
      await setWalletCommand(ctx);
    }
    await ctx.answerCbQuery(); // ✅ Close loading animation
  } catch (error) {
    console.error('❌ Callback Error:', error);
    await ctx.reply('⚠️ Something went wrong. Please try again.');
  }
});

// ✅ Dummy Route for Keep-Alive
app.get('/', (req, res) => {
  res.send('🤖 TRX Staking Bot is up and running!');
});

// ✅ Load Cron Jobs
require('./cronjobs')();

// ✅ Express Web Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Express running on port ${PORT}`);
});

// ✅ Launch the Telegram Bot
bot.launch().then(() => {
  console.log('✅ Bot launched and listening on Telegram');
});

// ✅ Graceful Shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
