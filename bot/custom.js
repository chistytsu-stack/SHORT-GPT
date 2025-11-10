// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📁 File: bot/custom.js
// 👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

module.exports = {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ⚙️  Custom Initialization
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  async initializeCustom(botName = "Meheraz Bot") {
    console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
    console.log(chalk.magentaBright(`🚀 Starting ${botName} Custom Engine...`));
    console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));

    // Create required folders if not exist
    const folders = [
      "assets/images",
      "assets/audio",
      "assets/fonts",
      "data",
      "temp",
      "logs"
    ];

    for (const folder of folders) {
      const fullPath = path.join(__dirname, "..", folder);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(chalk.greenBright(`📁 Created folder: ${folder}`));
      }
    }

    console.log(chalk.blueBright("\n✅ All required directories are ready!"));
    console.log(chalk.yellowBright("⚡ Loading custom modules..."));
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 💫  Custom Console Display
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  showStartupMessage() {
    console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
    console.log(chalk.magentaBright("💫  𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 𝑺𝒚𝒔𝒕𝒆𝒎 𝑶𝒏𝒍𝒊𝒏𝒆"));
    console.log(chalk.greenBright("🔹 Custom Modules Loaded"));
    console.log(chalk.yellowBright("🔹 Assets Initialized"));
    console.log(chalk.cyanBright("🔹 System Ready to Operate ⚡"));
    console.log(chalk.magentaBright("✨ Powered by Meheraz Engine"));
    console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🧩  Custom Function Example
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  randomQuote() {
    const quotes = [
      "🌙 Stay cool, stay calm — stay Meheraz style.",
      "💫 Every bug teaches you a new fix.",
      "⚡ Powering through logic and passion!",
      "🔥 Code. Create. Conquer.",
      "✨ Simplicity is the ultimate sophistication."
    ];
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(chalk.magentaBright(`\n${random}\n`));
    return random;
  }
};
