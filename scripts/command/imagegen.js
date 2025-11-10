const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "imagegen",
    aliases: ["imagine", "imggen", "aiimg"],
    version: "1.0",
    author: "Meheraz Islam (Chisty)",
    role: 0,
    shortDescription: {
      en: "Generate an AI image from your text prompt",
    },
    longDescription: {
      en: "Uses AI to create stunning images from your given prompt — fully wrapped in elegant Meheraz Style layout.",
    },
    category: "ai",
    guide: {
      en: "{pn} [your prompt]",
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      const prompt = args.join(" ");
      if (!prompt)
        return api.sendMessage(
          "⚠️ | Please provide a text prompt!\n\nExample:\nimagegen a beautiful sunset over the ocean 🌅",
          event.threadID,
          event.messageID
        );

      const waitMsg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
🎨 𝐀𝐈 𝐈𝐌𝐀𝐆𝐄 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐈𝐍𝐆...
✦━━━━━━━━━━━━━━━━━━━━━✦

📝 𝐏𝐫𝐨𝐦𝐩𝐭: ${prompt}
⌛ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐚 𝐌𝐨𝐦𝐞𝐧𝐭 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
`;

      await api.sendMessage(waitMsg, event.threadID, event.messageID);

      const response = await axios.get(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
        { responseType: "arraybuffer" }
      );

      const imgPath = path.join(__dirname, "cache", `meheraz_gen_${Date.now()}.jpg`);
      fs.writeFileSync(imgPath, Buffer.from(response.data, "binary"));

      const doneMsg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
🌌 𝐈𝐌𝐀𝐆𝐄 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐈 🌌
✦━━━━━━━━━━━━━━━━━━━━━✦

🖋️ 𝐏𝐫𝐨𝐦𝐩𝐭: ${prompt}
🎨 𝐒𝐭𝐲𝐥𝐞: 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓐𝓻𝓽

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦
`;

      await api.sendMessage(
        { body: doneMsg, attachment: fs.createReadStream(imgPath) },
        event.threadID,
        event.messageID
      );

      setTimeout(() => fs.unlinkSync(imgPath), 5000);
    } catch (err) {
      return api.sendMessage(
        `❌ | Error generating image:\n${err.message}`,
        event.threadID,
        event.messageID
      );
    }
  },
};
