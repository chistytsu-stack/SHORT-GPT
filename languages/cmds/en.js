// ✦━━━━━━━━━━━━━━━━━━━━━✦
//  languages/cmds/en.js
//  💫 Meheraz Edition — Clean, Stylish & Fast
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = {
  // ─── 🪄 General ──────────────────────────────────────
  help: {
    shortDescription: "Show all commands or detailed info",
    longDescription: "Displays a stylish list of all commands with descriptions and usage examples.",
    example: "help / help ping",
    reply: {
      header: "💫 Meheraz Bot Command List 💫",
      single: "✨ Command: {cmd}\n📝 Description: {desc}\n📘 Usage: {usage}",
      notFound: "⚠️ Command not found. Try again!"
    }
  },

  // ─── ⚡ Prefix System ─────────────────────────────────
  prefix: {
    shortDescription: "View or update bot prefix",
    longDescription: "Shows current bot prefix or changes it if you are an admin.",
    example: "prefix / prefix set !",
    reply: {
      current: "🔹 Current prefix: {prefix}",
      changed: "✅ Prefix changed successfully → {prefix}",
      noPerm: "⚠️ Only admins can change prefix!"
    }
  },

  // ─── 🕒 Uptime ────────────────────────────────────────
  uptime: {
    shortDescription: "Show live uptime",
    longDescription: "Displays bot running time in a glowing style.",
    example: "uptime",
    reply: {
      running: "🕐 Uptime: {uptime}",
      live: "💫 Bot is running live and active!"
    }
  },

  // ─── 🏓 Ping Test ─────────────────────────────────────
  ping: {
    shortDescription: "Test bot speed",
    longDescription: "Measures response delay and returns ping result.",
    example: "ping",
    reply: {
      pong: "🏓 Pong! Response speed: {ms}ms ⚡"
    }
  },

  // ─── 👑 Admin / Info ──────────────────────────────────
  about: {
    shortDescription: "Show bot info",
    longDescription: "Displays version, author, system, and uptime in elegant style.",
    example: "about",
    reply: {
      info: "⚡ {botName} — v{version}\n👑 Author: Meheraz Islam Chishti\n💻 Node.js {nodeVersion}"
    }
  },

  // ─── 🔐 Add User / Admin ──────────────────────────────
  adduser: {
    shortDescription: "Add new user to group",
    longDescription: "Allows admin to add a user to the group using UID or mention.",
    example: "adduser 1000123456789",
    reply: {
      success: "✅ User added successfully!",
      failed: "❌ Could not add user. Check permissions!"
    }
  },

  admin: {
    shortDescription: "Admin tools",
    longDescription: "Lists all admin-only commands for group management.",
    example: "admin",
    reply: {
      list: "👑 Admin Commands: {cmds}",
      noAccess: "🚫 You’re not authorized to use this."
    }
  }
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦

