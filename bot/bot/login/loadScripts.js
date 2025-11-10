// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📁 File: bot/login/loadScripts.js  
// 👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫  
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔹 Function: Load all scripts dynamically
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = function loadScripts(globalPath) {
  const scriptFolders = ["commands", "events"];
  let totalScripts = 0;

  console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
  console.log(chalk.magentaBright("🚀  Loading Meheraz Bot Scripts..."));
  console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));

  for (const folder of scriptFolders) {
    const folderPath = path.join(globalPath, folder);

    if (!fs.existsSync(folderPath)) {
      console.log(chalk.yellowBright(`⚠️ Missing folder: ${folderPath}`));
      continue;
    }

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".js"));

    for (const file of files) {
      try {
        require(path.join(folderPath, file));
        totalScripts++;
        console.log(chalk.greenBright(`✅ Loaded → ${folder}/${file}`));
      } catch (error) {
        console.log(chalk.redBright(`❌ Error loading ${file}: ${error.message}`));
      }
    }
  }

  console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
  console.log(chalk.greenBright(`✨ Successfully loaded ${totalScripts} scripts!`));
  console.log(chalk.cyanBright("⚡ Powered by Meheraz System 💫"));
  console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));
};

