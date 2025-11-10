/*
✦━━━━━━━━━━━━━━━━━━━━━✦
📂 File: utils.js  
👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫  
✦━━━━━━━━━━━━━━━━━━━━━✦
*/

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const axios = require("axios");

module.exports = {
  // ✨ Read JSON safely
  readJSON(filePath, defaultValue = {}) {
    try {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } else return defaultValue;
    } catch (err) {
      console.log(chalk.redBright(`❌ Error reading JSON file: ${filePath}`));
      console.error(err);
      return defaultValue;
    }
  },

  // 💾 Write JSON safely
  writeJSON(filePath, data) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(chalk.greenBright(`✅ Saved JSON file: ${filePath}`));
    } catch (err) {
      console.log(chalk.redBright(`❌ Failed to save JSON file: ${filePath}`));
      console.error(err);
    }
  },

  // 🕐 Get formatted time
  getTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: true });
  },

  // 📅 Get full date & time
  getDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-US");
    return `${date} | ${time}`;
  },

  // 🌐 Fetch JSON from URL
  async fetchJSON(url) {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.log(chalk.redBright(`❌ Failed to fetch JSON from ${url}`));
      return null;
    }
  },

  // ⚡ Delay helper
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  // 🎨 Console title banner
  banner(title = "Meheraz Bot") {
    console.clear();
    console.log(chalk.cyan(`
✦━━━━━━━━━━━━━━━━━━━━━✦
💫 ${title}
⚡ Powered by Meheraz
⏰ ${this.getDateTime()}
✦━━━━━━━━━━━━━━━━━━━━━✦
`));
  },

  // 🧩 Log styled message
  log(type = "info", message = "") {
    const types = {
      info: chalk.blueBright("ℹ️ INFO"),
      success: chalk.greenBright("✅ SUCCESS"),
      error: chalk.redBright("❌ ERROR"),
      warn: chalk.yellowBright("⚠️ WARN")
    };
    console.log(`${types[type] || "📢"}  ${message}`);
  },

  // 🧠 Random string generator
  randomID(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  },

  // 📂 Ensure directory exists
  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(chalk.blueBright(`📁 Created folder: ${dirPath}`));
    }
  }
};
