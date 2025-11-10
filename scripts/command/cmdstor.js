const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "commandstor",
    aliases: ["cs", "cmds", "file"],
    version: "1.0.0",
    author: "⚡ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑰𝒔𝒍𝒂𝒎 𝑪𝒉𝒊𝒔𝒕𝒚 ⚡",
    countDown: 3,
    role: 0,
    shortDescription: "Show all available bot commands",
    longDescription: "List all commands in stylish Meheraz layout",
    category: "system"
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    // 📦 Load all command files dynamically
    const commandsFolder = path.join(__dirname, "..");
    let allCommands = [];

    const readFolder = folderPath => {
      fs.readdirSync(folderPath).forEach(file => {
        const filePath = path.join(folderPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          readFolder(filePath);
        } else if (file.endsWith(".js")) {
          try {
            const cmd = require(filePath);
            if (cmd.config?.name) allCommands.push(cmd.config.name);
          } catch { }
        }
      });
    };
    readFolder(commandsFolder);

    // Sort alphabetically
    allCommands = [...new Set(allCommands)].sort();

    if (!allCommands.length)
      return api.sendMessage("⚠️ | No commands found!", threadID, messageID);

    // 🌸 Stylish Meheraz Layout
    const msg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
💠 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗦𝗧𝗢𝗥𝗘 💠
✦━━━━━━━━━━━━━━━━━━━━━✦

${allCommands.map((cmd, i) => `⚙️ ${i + 1}. ${cmd}`).join("\n")}

✦━━━━━━━━━━━━━━━━━━━━━✦
📦 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱: ${allCommands.length}
⚡ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗠𝗲𝗵𝗲𝗿𝗮𝘇 𝗦𝘁𝘆𝗹𝗲
✦━━━━━━━━━━━━━━━━━━━━━✦`;

    api.sendMessage(msg, threadID, messageID);
  }
};
