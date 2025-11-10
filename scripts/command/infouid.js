const axios = require("axios");

module.exports = {
  config: {
    name: "infouid",
    aliases: ["info", "uidinfo", "idinfo"],
    version: "1.0",
    author: "Meheraz Style",
    countDown: 5,
    role: 0,
    shortDescription: "Get user details using UID",
    longDescription: "Show full user info (name, gender, profile, followers, etc.) in Meheraz Style format.",
    category: "info",
  },

  onStart: async function ({ event, message, args }) {
    let uid;
    if (args[0]) uid = args[0];
    else if (Object.keys(event.mentions).length > 0)
      uid = Object.keys(event.mentions)[0];
    else uid = event.senderID;

    const apiUrl = `https://api.popcat.xyz/facebook?url=https://facebook.com/${uid}`;

    try {
      const res = await axios.get(apiUrl);
      const data = res.data;

      const infoMsg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
👑 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮 𝓘𝓷𝓯𝓸𝓤𝓘𝓓 🔮
✦━━━━━━━━━━━━━━━━━━━━━✦

🪪 𝗡𝗮𝗺𝗲: ${data.name || "N/A"}
🔗 𝗨𝗜𝗗: ${uid}
🚻 𝗚𝗲𝗻𝗱𝗲𝗿: ${data.gender || "Unknown"}
👥 𝗙𝗼𝗹𝗹𝗼𝘄𝗲𝗿𝘀: ${data.followers || "0"}
🌐 𝗟𝗶𝗻𝗸: https://facebook.com/${uid}
📸 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗣𝗶𝗰𝘁𝘂𝗿𝗲: Below 👇

✦━━━━━━━━━━━━━━━━━━━━━✦
💫 𝓟𝓸𝔀𝓮𝓻𝓮𝓭 𝓫𝔂 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 𝓢𝓽𝔂𝓵𝓮
✦━━━━━━━━━━━━━━━━━━━━━✦
`;

      const image = await axios.get(data.profile_pic, { responseType: "stream" });

      message.reply({
        body: infoMsg,
        attachment: image.data,
      });
    } catch (err) {
      message.reply(
        "⚠️ 𝓤𝓱 𝓸𝓱... 𝓒𝓸𝓾𝓵𝓭𝓷'𝓽 𝓯𝓮𝓽𝓬𝓱 𝓲𝓷𝓯𝓸. 𝓟𝓵𝓮𝓪𝓼𝓮 𝓬𝓱𝓮𝓬𝓴 𝓽𝓱𝓮 𝓤𝓘𝓓 𝓸𝓻 𝓽𝓻𝔂 𝓪𝓰𝓪𝓲𝓷 💫"
      );
    }
  },
};
