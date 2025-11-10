// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🎯 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - Event Handler
// 💫 Dynamically handles all registered events
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const chalk = require("chalk");
const moment = require("moment-timezone");

module.exports = async function handlerEvents({ api, event, Users, Threads }) {
  try {
    const eventType = event.logMessageType || event.type;
    const now = moment.tz("Asia/Dhaka").format("hh:mm:ss A");
    const senderName = await Users.getName(event.senderID) || "Unknown User";

    // ──────────────💫 Event Loop ──────────────
    for (let [, evt] of global.client.events) {
      try {
        if (typeof evt.onEvent === "function") {
          await evt.onEvent({ api, event, Users, Threads });
        }
      } catch (err) {
        console.log(chalk.red(`
✦━━━━━━━━━━━━━━━━━━━━━✦
❌ 𝑬𝒗𝒆𝒏𝒕 𝑬𝒓𝒓𝒐𝒓
───────────────────────
📂 Event: ${evt.config?.name || "Unknown"}
💬 Type: ${eventType}
🕒 Time: ${now}
🚨 Message: ${err.message}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
      }
    }

    // ──────────────💫 Log Display ──────────────
    console.log(chalk.blueBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
📡 𝑬𝒗𝒆𝒏𝒕 𝑹𝒆𝒄𝒆𝒊𝒗𝒆𝒅 💎
───────────────────────
👤 User: ${senderName}
📂 Type: ${eventType}
🕒 Time: ${now}
✦━━━━━━━━━━━━━━━━━━━━━✦`));

    // ──────────────💫 Event Specific Logs ──────────────
    if (eventType === "log:subscribe") {
      api.sendMessage(`👋 স্বাগতম ${senderName}! 🎉`, event.threadID);
    } else if (eventType === "log:unsubscribe") {
      api.sendMessage(`😢 বিদায় ${senderName}, আবার দেখা হবে আশা করি!`, event.threadID);
    }

  } catch (err) {
    console.error(chalk.redBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
❌ 𝑬𝒓𝒓𝒐𝒓 𝒊𝒏 𝑬𝒗𝒆𝒏𝒕𝑺 𝑯𝒂𝒏𝒅𝒍𝒆𝒓
───────────────────────
${err.message}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
  }
};
