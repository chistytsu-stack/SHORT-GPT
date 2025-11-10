// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 🧠 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - Data Check Handler
// 🔍 Ensures user, thread & system data validity
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const chalk = require("chalk");
const moment = require("moment-timezone");

module.exports = async function handlerCheckData({ api, event, Users, Threads }) {
  try {
    const senderID = event.senderID;
    const threadID = event.threadID;
    const now = moment.tz("Asia/Dhaka").format("hh:mm:ss A");

    // ──────────────💫 User Data Check ──────────────
    let userData = await Users.getData(senderID);
    if (!userData) {
      await Users.createData(senderID, { name: "Unknown User", exp: 0, coins: 0 });
      console.log(chalk.yellow(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🧩 𝑼𝒔𝒆𝒓 𝑫𝒂𝒕𝒂 𝑪𝒓𝒆𝒂𝒕𝒆𝒅 💫
───────────────────────
🆔 User: ${senderID}
🕒 Time: ${now}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
    }

    // ──────────────💫 Thread Data Check ──────────────
    let threadData = await Threads.getData(threadID);
    if (!threadData) {
      await Threads.createData(threadID, { name: "Unknown Group", prefix: "!" });
      console.log(chalk.cyanBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
💬 𝑻𝒉𝒓𝒆𝒂𝒅 𝑫𝒂𝒕𝒂 𝑪𝒓𝒆𝒂𝒕𝒆𝒅 💫
───────────────────────
🆔 Thread: ${threadID}
🕒 Time: ${now}
✦━━━━━━━━━━━━━━━━━━━━━✦`));
    }

    // ──────────────💫 Cooldown System ──────────────
    if (!global.cooldown) global.cooldown = new Map();

    const cooldownKey = `${senderID}_${threadID}`;
    const currentTime = Date.now();
    const cooldownAmount = 2000; // 2 seconds

    if (global.cooldown.has(cooldownKey)) {
      const expiration = global.cooldown.get(cooldownKey) + cooldownAmount;
      if (currentTime < expiration) {
        const remaining = ((expiration - currentTime) / 1000).toFixed(1);
        return api.sendMessage(
          `⏳ অনুগ্রহ করে ${remaining} সেকেন্ড অপেক্ষা করুন...`,
          threadID
        );
      }
    }

    global.cooldown.set(cooldownKey, currentTime);
    setTimeout(() => global.cooldown.delete(cooldownKey), cooldownAmount);

    // ──────────────💫 System Ready ──────────────
    console.log(chalk.greenBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
✅ 𝑺𝒚𝒔𝒕𝒆𝒎 𝑪𝒉𝒆𝒄𝒌 𝑪𝒐𝒎𝒑𝒍𝒆𝒕𝒆 💎
───────────────────────
👤 User: ${await Users.getName(senderID)}
💬 Thread: ${threadData?.name || "Unknown"}
🕒 Time: ${now}
✦━━━━━━━━━━━━━━━━━━━━━✦`));

  } catch (err) {
    console.error(chalk.red(`
✦━━━━━━━━━━━━━━━━━━━━━✦
❌ 𝑬𝒓𝒓𝒐𝒓 𝒊𝒏 𝑪𝒉𝒆𝒄𝒌𝑫𝒂𝒕𝒂
───────────────────────
${er
