// ✦━━━━━━━━━━━━━━━━━━━━━✦
//  func/colors.js  
//  ✨ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 — Glowing Color Utilities
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const chalk = require("chalk");
const gradient = require("gradient-string");

// 🌈 Basic static colors
const colors = {
  success: chalk.hex("#00FF99").bold,      // Neon Green
  error: chalk.hex("#FF0055").bold,        // Bright Red
  warn: chalk.hex("#FFD300").bold,         // Yellow Glow
  info: chalk.hex("#00BFFF").bold,         // Sky Blue
  neutral: chalk.hex("#CCCCCC"),           // Soft Gray
};

// 💫 Gradient styles for fancy effects
const gradients = {
  meheraz: gradient(["#00F0FF", "#9B00FF", "#FF0099"]), // cyan → violet → pink
  fire: gradient(["#FF6B00", "#FF0000", "#990000"]),     // orange → red → dark red
  ocean: gradient(["#00E5FF", "#0055FF", "#001AFF"]),    // aqua → blue → deep blue
  galaxy: gradient(["#7F00FF", "#E100FF", "#00FFFF"]),   // purple → pink → cyan
};

// ✨ Glowing console text
function glow(text, type = "meheraz") {
  const chosen = gradients[type] || gradients.meheraz;
  return chosen.multiline(text);
}

// 💥 Fade text animation
async function glowPulse(text, times = 3, delay = 150) {
  for (let i = 0; i < times; i++) {
    process.stdout.write("\r" + glow(text, "galaxy"));
    await new Promise(r => setTimeout(r, delay));
    process.stdout.write("\r" + glow(text, "meheraz"));
    await new Promise(r => setTimeout(r, delay));
  }
  process.stdout.write("\r" + glow(text, "fire") + "\n");
}

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📦 Exports
// ✦━━━━━━━━━━━━━━━━━━━━━✦
module.exports = {
  colors,
  gradients,
  glow,
  glowPulse,
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦
