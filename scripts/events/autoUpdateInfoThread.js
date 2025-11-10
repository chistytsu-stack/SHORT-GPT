const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "autoUpdateInfoThread",
    version: "1.1.0",
    author: "Meheraz 💫",
    description: "Automatically updates thread info (name, member count, photo)",
    category: "event",
  },

  onEvent: async function ({ api, event, Threads }) {
    try {
      const threadID = event.threadID;
      const threadInfo = await api.getThreadInfo(threadID);
      const threadName = threadInfo.threadName || "Unnamed Group";
      const memberCount = threadInfo.participantIDs.length;
      const time = moment.tz("Asia/Dhaka").format("hh:mm A, DD MMM YYYY");

      // নতুন নাম অটো সেট করবে
      const newName = `💬 ${threadName} | 👥 ${memberCount} সদস্য`;
      await api.setTitle(newName, threadID);

      // সুন্দর নোটিফিকেশন
      const msg = `✦━━━━━━━━━━━━━━━━━━━━━✦
💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 𝑻𝒉𝒓𝒆𝒂𝒅 𝑼𝒑𝒅𝒂𝒕𝒆 💫
───────────────────────
📛 গ্রুপ নাম: ${threadName}
👥 মোট সদস্য: ${memberCount}
🕒 সময়: ${time}
───────────────────────
⚡ অটো আপডেট সফলভাবে সম্পন্ন!
💎 Meheraz Engine
✦━━━━━━━━━━━━━━━━━━━━━✦`;

      api.sendMessage(msg, threadID);

      // Log save
      const logData = `[${time}] Updated Thread: ${threadName} (${memberCount} members)\n`;
      fs.appendFileSync(__dirname + "/../data/threadUpdate.log", logData);

    } catch (err) {
      console.error("❌ autoUpdateInfoThread Error:", err);
    }
  },
};
