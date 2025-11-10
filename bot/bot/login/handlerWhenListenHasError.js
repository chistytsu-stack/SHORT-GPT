// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - handlerWhenListenHasError.js
// ⚠️ Handle Listener Errors & Auto Recovery
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const chalk = require("chalk");
const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");

// ──────────────💫 Utility ──────────────
const getTime = () => moment.tz("Asia/Dhaka").format("hh:mm:ss A");
const errorLogPath = path.join(__dirname, "../../logs/listenError.log");

// ──────────────💫 Main Handler ──────────────
module.exports = async function handlerWhenListenHasError(err, api) {
  console.log(chalk.redBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🚨 𝑩𝒐𝒕 𝑳𝒊𝒔𝒕𝒆𝒏 𝑬𝒓𝒓𝒐𝒓 𝑯𝒂𝒑𝒑𝒆𝒏𝒆𝒅
───────────────────────
🕒 Time: ${getTime()}
📦 Error Type: ${err?.error || err.message || "Unknown"}
✦━━━━━━━━━━━━━━━━━━━━━✦`));

  // ──────────────💫 Save Error Log ──────────────
  try {
    const logMessage = `[${getTime()}] ${err.stack || err.message}\n`;
    fs.appendFileSync(errorLogPath, logMessage, "utf8");
  } catch (e) {
    console.log(chalk.yellow("⚠️ Failed to save error log file."));
  }

  // ──────────────💫 Auto Actions ──────────────
  if (String(err).includes("Not logged in")) {
    console.log(chalk.yellowBright(`
🔒 Session Expired!
💡 Try re-login using: node bot/login/getFbstate.js
✦━━━━━━━━━━━━━━━━━━━━━✦`));
  }

  if (String(err).includes("ECONNRESET") || String(err).includes("ETIMEDOUT")) {
    console.log(chalk.cyanBright(`
🔁 Connection Timeout!
💫 Attempting to reconnect in 5 seconds...
✦━━━━━━━━━━━━━━━━━━━━━✦`));
    setTimeout(() => {
      try {
        api.listenMqtt(); // Reconnect listener
        console.log(chalk.greenBright("✅ Reconnected successfully!"));
      } catch (e) {
        console.log(chalk.red("❌ Failed to reconnect automatically."));
      }
    }, 5000);
  }

  // ──────────────💫 Unknown Errors ──────────────
  if (!err || !err.message) {
    console.log(chalk.magenta(`
❓ Unknown listener error detected.
Please check your internet connection or appstate validity.
✦━━━━━━━━━━━━━━━━━━━━━✦`));
  }

  // ──────────────💫 Developer Alert ──────────────
  console.log(chalk.blueBright(`
📢 Developer Notice:
───────────────────────
• File Saved: logs/listenError.log
• Time: ${getTime()}
• Status: Monitoring for next error...
✦━━━━━━━━━━━━━━━━━━━━━✦`));
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz Bot System 💠
// ✦━━━━━━━━━━━━━━━━━━━━━✦

