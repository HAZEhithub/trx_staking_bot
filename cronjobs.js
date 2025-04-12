const cron = require("node-cron");
const User = require("./models/User");
const Admin = require("./models/admin-model");

module.exports = function () {
  console.log("✅ Cron job initialized...");

  // ⏰ Run every 12 hours (adjust if needed)
  cron.schedule("0 */12 * * *", async () => {
    console.log("⏳ Running staking interest calculation...");

    try {
      const users = await User.find();
      const admin = await Admin.findOne() || new Admin();

      for (const user of users) {
        if (user.balance > 0 && user.wallet) {  // Ensure user has balance and wallet set
          const rate = user.premium ? 0.025 : 0.01; // 2.5% for premium vs 1% for regular
          const interest = user.balance * rate; // Calculate interest based on balance

          // Optional: deduct maintenance fee (0.5%)
          const maintenanceFee = interest * 0.005;

          // Update user balance with interest and fees
          user.balance += interest - maintenanceFee;
          user.earnings += interest - maintenanceFee;
          await user.save();

          // Track platform income (deposit fees)
          admin.totalDepositFees += maintenanceFee;
          admin.totalWithdrawalFees += interest - maintenanceFee;

          console.log(`✅ Applied interest and maintenance fee to user ${user.telegramId}.`);

        } else {
          console.log(`⚠️ Skipped user ${user.telegramId} (no balance or wallet).`);
        }
      }

      admin.lastUpdated = new Date();
      await admin.save();

      console.log("✅ Interest and fees applied to all eligible users.");
    } catch (error) {
      console.error("❌ Error while running cron job:", error);
    }
  });
};
