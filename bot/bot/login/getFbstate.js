// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑩𝒐𝒕 - getFbstate.js
// 📦 Safely login to Facebook & save fbstate
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const readline = require("readline");
const login = require("fca-unofficial");
const chalk = require("chalk");
const path = require("path");
const moment = require("moment-timezone");

// ──────────────💫 Utility ──────────────
const fbStatePath = path.join(__dirname, "appstate.json");
const getTime = () => moment.tz("Asia/Dhaka").format("hh:mm:ss A");

// ──────────────💫 Input Helper ──────────────
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ──────────────💫 Main Function ──────────────
function askCredentials() {
  console.log(chalk.cyanBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
🔐 𝑭𝒂𝒄𝒆𝒃𝒐𝒐𝒌 𝑳𝒐𝒈𝒊𝒏 (AppState Generator)
───────────────────────
💫 Enter your Facebook credentials below
✦━━━━━━━━━━━━━━━━━━━━━✦
  `));

  rl.question(chalk.yellow("📧 Email / UID: "), (email) => {
    rl.question(chalk.yellow("🔑 Password: "), (password) => {
      console.log(chalk.cyan("\n⏳ Logging in... Please wait...\n"));

      // ──────────────💫 Login Process ──────────────
      login({ email, password }, (err, api) => {
        if (err) {
          console.log(chalk.redBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
❌ Login Failed!
───────────────────────
${err.error || err}
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦
          `));
          process.exit(1);
        }

        // ──────────────💫 Save fbstate ──────────────
        fs.writeFileSync(fbStatePath, JSON.stringify(api.getAppState(), null, 2));
        console.log(chalk.greenBright(`
✦━━━━━━━━━━━━━━━━━━━━━✦
✅ Login Success! fbstate Saved 🎉
───────────────────────
📁 Path: ${fbStatePath}
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦
        `));

        api.logout(() => console.log(chalk.blueBright("💫 Session closed. You can now use your fbstate.")));
        rl.close();
      });
    });
  });
}

// ──────────────💫 Auto Check ──────────────
if (fs.existsSync(fbStatePath)) {
  console.log(chalk.green(`
✦━━━━━━━━━━━━━━━━━━━━━✦
📦 AppState Already Exists!
───────────────────────
📁 ${fbStatePath}
🕒 Time: ${getTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦
  `));
  process.exit(0);
} else {
  askCredentials();
}

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz System 💠
// ✦━━━━━━━━━━━━━━━━━━━━━✦

