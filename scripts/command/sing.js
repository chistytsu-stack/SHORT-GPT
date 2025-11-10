const axios = require("axios");
const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "sing",
    aliases: ["sing", "song"],
    version: "3.0",
    author: "Meheraz Islam (Chisty)",
    countDown: 10,
    role: 0,
    shortDescription: "Play or download song from YouTube",
    longDescription: "Search and play any song from YouTube in Meheraz Style 🎶",
    category: "music",
    guide: {
      en: "{p}sing [song name]"
    }
  },

  onStart: async function ({ message, args, event }) {
    const songName = args.join(" ");
    if (!songName)
      return message.reply("🎵 | Please type a song name!\nExample: !sing Shape of You");

    message.reply("🎧 Searching your song in 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 Style... ⏳");

    try {
      const searchURL = `https://yt-api.mezkey.repl.co/search?query=${encodeURIComponent(songName)}`;
      const res = await axios.get(searchURL);

      if (!res.data || res.data.length === 0)
        return message.reply("❌ | No results found.");

      const video = res.data[0];
      const title = video.title;
      const url = video.url;
      const tempFile = path.resolve(__dirname, "temp", `${Date.now()}.mp3`);

      const writer = fs.createWriteStream(tempFile);
      const stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" });
      stream.pipe(writer);

      writer.on("finish", async () => {
        const msg = {
          body: `
✦━━━━━━━━━━━━━━━━━━━━━✦
🎶 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 Style Sing 🎧
✦━━━━━━━━━━━━━━━━━━━━━✦

🎼 Title: ${title}
🔗 Link: ${url}
🎤 Requested by: ${event.senderID}

Enjoy your music 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
`,
          attachment: fs.createReadStream(tempFile)
        };

        message.reply(msg, () => fs.unlinkSync(tempFile));
      });

      writer.on("error", () => {
        message.reply("⚠️ | Error while saving file.");
      });
    } catch (err) {
      console.error(err);
      return message.reply("❌ | Failed to fetch song. Try another one!");
    }
  }
};
