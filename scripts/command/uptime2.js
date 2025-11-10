✦━━━━━━━━━━━━━━━━━━━━━✦
📂 File: uptime.js  
👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫 (Fast Edition)
✦━━━━━━━━━━━━━━━━━━━━━✦

const os = require("os");

module.exports = {
  config: {
    name: "upt2",
    version: "7.0-FastMeheraz",
    author: "Meheraz",
    role: 2,
    shortDescription: { en: "Fast & stylish uptime 💫" },
    longDescription: {
      en: "Instant uptime display with minimal delay, Meheraz-style visuals ✨"
    },
    category: "⚙ System",
    guide: { en: "{p}upt2" }
  },

  onStart: async function ({ api, event }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // ⚡ Optimized fast animation frames
    const frames = [
      "⚙️ [█░░░░░░░░░░░░] 10%",
      "⚙️ [███░░░░░░░░░░░] 30%",
      "⚙️ [██████░░░░░░░░] 50%",
      "⚙️ [█████████░░░░░] 75%",
      "✨ [██████████████] 100%"
    ];

    try {
      // Initial quick load message
      const loadMsg = await api.sendMessage(
        "⚡ 𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐁𝐨𝐭 𝐔𝐩𝐭𝐢𝐦𝐞...\n\n" + frames[0],
        event.threadID
      );

      // Ultra-fast animated effect (shorter delay)
      for (let i = 1; i < frames.length; i++) {
        await delay(180);
        await api.editMessage(
          `⚡ 𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐁𝐨𝐭 𝐔𝐩𝐭𝐢𝐦𝐞...\n\n${frames[i]}`,
          loadMsg.messageID,
          event.threadID
        );
      }

      // System info calculation
      const mem = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
      const up = process.uptime();
      const d = Math.floor(up / 86400);
      const h = Math.floor((up % 86400) / 3600);
      const m = Math.floor((up % 3600) / 60);
      const s = Math.floor(up % 60);
      const uptime = `${d}d ${h}h ${m}m ${s}s`;

      const now = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true
      });
      const [date, time] = now.split(", ");

      // Final uptime message
      const msg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
🌟 𝐁𝐎𝐓 𝐔𝐏𝐓𝐈𝐌𝐄 𝐒𝐓𝐀𝐓𝐒 🌟
✦━━━━━━━━━━━━━━━━━━━━━✦

⏱️ 𝐔𝐩𝐭𝐢𝐦𝐞: ${uptime}
📅 𝐃𝐚𝐭𝐞: ${date}
🕒 𝐓𝐢𝐦𝐞: ${time}

💾 𝐑𝐀𝐌 𝐔𝐬𝐚𝐠𝐞: ${mem} MB
🖥️ 𝐎𝐒: ${os.platform()} (${os.arch()})
⚙️ 𝐍𝐨𝐝𝐞: ${process.version}

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
`.trim();

      // Instant smooth update
      await delay(250);
      await api.editMessage(msg, loadMsg.messageID, event.threadID);

    } catch (err) {
      console.error("⚠️ Uptime Error:", err);
      api.sendMessage("🚫 𝐄𝐫𝐫𝐨𝐫 𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐔𝐩𝐭𝐢𝐦𝐞. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐓𝐫𝐲 𝐀𝐠𝐚𝐢𝐧.", event.threadID);
    }
  }
};
