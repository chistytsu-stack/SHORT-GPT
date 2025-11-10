const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "help",
    aliases: ["help"],
    version: "1.0.0",
    author: "Meheraz Islam",
    role: 0,
    shortDescription: "Show all bot commands",
    longDescription: "Displays the full list of available commands in Meheraz Style",
    category: "system",
    guide: "{p}help [command name]"
  },

  onStart: async function ({ message, args, commands }) {
    const commandName = args[0];

    if (commandName) {
      const command = commands.get(commandName) || commands.find(cmd => cmd.config.aliases?.includes(commandName));
      if (!command)
        return message.reply(`❌ | Command '${commandName}' not found.`);

      const c = command.config;
      const helpText = `
✦━━━━━━━━━━━━━━━━━━━━━✦
      𝓜𝓮𝓱𝓮𝓻𝓪𝔃 • 𝓢𝓽𝔂𝓵𝓮  𝓗𝓔𝓛𝓟
✦━━━━━━━━━━━━━━━━━━━━━✦

🔹 Command: ${c.name}
🔹 Description: ${c.longDescription || c.shortDescription}
🔹 Usage: ${c.guide || "No guide provided"}
🔹 Author: ${c.author || "Unknown"}
🔹 Category: ${c.category || "Uncategorized"}

✦━━━━━━━━━━━━━━━━━━━━━✦
💫 Type ${prefix}help commands name to view cmd info
✦━━━━━━━━━━━━━━━━━━━━━✦
✦ © 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 • 𝓢𝓽𝔂𝓵𝓮 ✦
`;
      return message.reply(helpText);
    }

    const commandList = Array.from(commands.values());
    let text = `
✦━━━━━━━━━━━━━━━━━━━━━✦
      𝓜𝓮𝓱𝓮𝓻𝓪𝔃 • 𝓢𝓽𝔂𝓵𝓮  𝓗𝓔𝓛𝓟
✦━━━━━━━━━━━━━━━━━━━━━✦
`;

    let count = 1;
    for (const cmd of commandList) {
      text += ` ${String(count).padStart(2, "0")}. 【 ${cmd.config.name} 】 — ${cmd.config.shortDescription || "No description"}\n`;
      count++;
    }

    text += `
✦━━━━━━━━━━━━━━━━━━━━━✦
💠 Tip: Type !help [command] for details
📚 Showing ${commandList.length} commands
✦━━━━━━━━━━━━━━━━━━━━━✦
✦ © 𝓜𝓮𝓱𝓮𝓻𝓪𝔃 • 𝓢𝓽𝔂𝓵𝓮 ✦
`;

    return message.reply(text);
  }
};
