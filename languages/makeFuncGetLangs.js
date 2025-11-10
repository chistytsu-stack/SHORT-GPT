// ✦━━━━━━━━━━━━━━━━━━━━━✦
//  languages/makeFuncGetLangs.js
//  💫 Meheraz Edition — Dynamic Language Handler
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const fs = require("fs");
const path = require("path");

// 🌍 Default language
const DEFAULT_LANG = "en";

// ─────────────────────────────────────────────
// 🔮 Load a language file safely
// ─────────────────────────────────────────────
function loadLangFile(langCode) {
  const langPath = path.join(__dirname, `${langCode}.lang`);
  if (fs.existsSync(langPath)) {
    try {
      return require(langPath);
    } catch (e) {
      console.error(`⚠️ Failed to load ${langCode}.lang →`, e.message);
      return {};
    }
  }
  return {};
}

// ─────────────────────────────────────────────
// 💫 Get language text dynamically
// ─────────────────────────────────────────────
function getLangText(lang, key, variables = {}) {
  const parts = key.split(".");
  let value = lang;

  for (const part of parts) {
    value = value?.[part];
    if (!value) break;
  }

  if (!value) return `⚠️ Missing text for key: ${key}`;

  // Replace placeholders (e.g. {name}, {time})
  return value.replace(/{(\w+)}/g, (_, k) => variables[k] || `{${k}}`);
}

// ─────────────────────────────────────────────
// 🪄 Create global language getter
// ─────────────────────────────────────────────
function makeFuncGetLangs(currentLang = DEFAULT_LANG) {
  const langData = loadLangFile(currentLang);

  return function (key, vars = {}) {
    return getLangText(langData, key, vars);
  };
}

// ─────────────────────────────────────────────
// ⚡ Export
// ─────────────────────────────────────────────
module.exports = makeFuncGetLangs;

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦
