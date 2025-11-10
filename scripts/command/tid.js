module.exports = {
  config: {
    name: "tid",
    aliases: ["tid", "gid"],
    version: "1.0",
    author: "Meheraz Islam (Chisty)",
    role: 0,
    shortDescription: {
      en: "Get the thread ID (TID) of the current chat",
    },
    longDescription: {
      en: "Displays the thread ID (TID) of the current chat in Meheraz Style format.",
    },
    category: "info",
    guide: {
      en: "{pn} → shows this group's Thread ID",
    },
  },

  onStart: async function ({ api, event }) {
    const tid = event.threadID;

    const msg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
💠 𝐓𝐇𝐑𝐄𝐀𝐃 𝐈𝐃 𝐈𝐍𝐅𝐎 💠
✦━━━━━━━━━━━━━━━━━━━━━✦

🆔 𝐓𝐡𝐫𝐞𝐚𝐝 𝐈𝐃: ${tid}

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦
    `;

    return api.sendMessage(msg, event.threadID, event.messageID);
  },
};
