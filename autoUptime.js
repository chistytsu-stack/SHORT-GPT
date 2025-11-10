// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📁 File: bot/autoUptime.js
// 👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const chalk = require("chalk");
const os = require("os");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🕒 Track Start Time
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const startTime = Date.now();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧩 Function: Convert ms → readable format
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function formatDuration(ms) {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (1000 * 60)) % 60;
  const hrs = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}d ${hrs}h ${min}m ${sec}s`;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 Function: Display Live Uptime
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = function autoUptime() {
  console.clear();
  console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
  console.log(chalk.magentaBright("⏱️  Meheraz Bot Live Uptime Monitor"));
  console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));

  const cpu = os.cpus()[0].model;
  const platform = os.platform();
  const arch = os.arch();

  setInterval(() => {
    const uptime = formatDuration(Date.now() - startTime);
    const ram = (os.totalmem() - os.freemem()) / 1024 / 1024;

    console.clear();
    console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
    console.log(chalk.magentaBright("💫  𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 𝑳𝒊𝒗𝒆 𝑺𝒕𝒂𝒕𝒖𝒔"));
    console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦"));
    console.log(chalk.greenBright(`🕒 Uptime: ${uptime}`));
    console.log(chalk.blueBright(`💻 CPU: ${cpu}`));
    console.log(chalk.yellowBright(`⚙️  Platform: ${platform} (${arch})`));
    console.log(chalk.cyanBright(`📊 RAM Usage: ${ram.toFixed(2)} MB`));
    console.log(chalk.magentaBright("⚡ Powered by Meheraz Engine 💠"));
    console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));
  }, 3000);
};
