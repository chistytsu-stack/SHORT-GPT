/*
✦━━━━━━━━━━━━━━━━━━━━━✦
📂 File: update.js
👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫
✦━━━━━━━━━━━━━━━━━━━━━✦
*/

const { execSync } = require("child_process");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

console.clear();
console.log(chalk.cyan(`
✦━━━━━━━━━━━━━━━━━━━━━✦
✨ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 𝑼𝒑𝒅𝒂𝒕𝒆𝒓 💫
⚡ Checking for latest version...
✦━━━━━━━━━━━━━━━━━━━━━✦
`));

// Load current version
let currentVersion = "1.0.0";
try {
  const config = JSON.parse(fs.readFileSync("./config.dev.json"));
  currentVersion = config.VERSION || "1.0.0";
} catch {
  console.log(chalk.yellow("⚠️ Could not read config.dev.json, using default version."));
}

// Simulated latest version (you can connect to GitHub API later)
const latestVersion = "1.1.0";

// Version compare
if (currentVersion === latestVersion) {
  console.log(chalk.greenBright(`✅ Already up-to-date (v${currentVersion})`));
  process.exit(0);
}

console.log(chalk.yellowBright(`📦 Update available: ${currentVersion} ➜ ${latestVersion}`));

try {
  // Step 1: Git Pull or NPM Update (depending on setup)
  if (fs.existsSync(".git")) {
    console.log(chalk.blueBright("🔄 Pulling latest changes from Git..."));
    execSync("git pull", { stdio: "inherit" });
  } else {
    console.log(chalk.blueBright("📦 Installing updated packages..."));
    execSync("npm install", { stdio: "inherit" });
  }

  // Step 2: Update version in config
  const configPath = path.join(__dirname, "config.dev.json");
  const configData = JSON.parse(fs.readFileSync(configPath));
  configData.VERSION = latestVersion;
  fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));

  console.log(chalk.greenBright(`
✅ Update Complete!
🆙 Version: ${latestVersion}
🕐 Bot will restart automatically...
✦━━━━━━━━━━━━━━━━━━━━━✦
`));

  // Step 3: Auto restart
  setTimeout(() => {
    console.log(chalk.cyan("🚀 Restarting bot..."));
    execSync("npm start", { stdio: "inherit" });
  }, 2000);

} catch (err) {
  console.log(chalk.redBright("❌ Update Failed!"));
  console.error(err);
  process.exit(1);
}
