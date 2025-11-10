// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📁 File: bot/login/login.js  
// 👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫  
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const login = require("fca-unofficial");
const chalk = require("chalk");
const path = require("path");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧩 Appstate Path
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const appstatePath = path.join(__dirname, "../../appstate.json");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 Meheraz Bot Login Function
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = function startLogin() {
  console.clear();
  console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
  console.log(chalk.magentaBright("💫 Starting Meheraz Bot Login System..."));
  console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));

  if (!fs.existsSync(appstatePath)) {
    console.log(chalk.redBright("❌ appstate.json not found!"));
    console.log(chalk.yellowBright("⚙️  Please login with valid fbstate first."));
    process.exit(1);
  }

  const appState = JSON.parse(fs.readFileSync(appstatePath, "utf8"));

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔑 Login to Facebook Messenger
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  login({ appState }, (err, api) => {
    if (err) {
      console.log(chalk.redBright("❌ Login Failed!"));
      console.error(err.error || err);
      return process.exit(1);
    }

    console.log(chalk.greenBright("✅ Logged in successfully!"));
    console.log(chalk.cyanBright("✨ Welcome to Meheraz Bot System 💠"));
    console.log(chalk.cyanBright("⚡ Powered by Mirai + Meheraz Engine"));
    console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🧠 Save session to avoid re-login
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    fs.writeFileSync(appstatePath, JSON.stringify(api.getAppState(), null, 2));
    global.api = api;

    // Load commands & events dynamically
    const loadScripts = require("./loadScripts.js");
    loadScripts(path.join(__dirname, "../../"));

    console.log(chalk.greenBright("🚀 Meheraz Bot is now active and listening!"));
  });
};

