// ✦━━━━━━━━━━━━━━━━━━━━━✦
//  languages/events/en.js
//  💫 Meheraz Edition — Event Messages (English)
// ✦━━━━━━━━━━━━━━━━━━━━━✦

module.exports = {
  // ─── 💬 Message Events ────────────────────────────────
  message: {
    deleted: "🗑️ Message deleted by {name}",
    unsent: "❌ {name} just unsent a message!",
    blocked: "🚫 Message blocked due to restricted content."
  },

  // ─── 👥 Group Member Events ───────────────────────────
  memberJoin: {
    welcome: "🎉 Welcome {name} to {group}!\n💬 Say hi and enjoy the chat!",
    multiple: "👋 Welcome everyone who joined {group}!",
    rule: "📘 Please read the group rules before chatting."
  },

  memberLeave: {
    goodbye: "😢 {name} has left the group.",
    kicked: "🚪 {name} was removed by an admin.",
    selfLeave: "👋 {name} left the group voluntarily."
  },

  // ─── 🪄 Name / Title Change ───────────────────────────
  nameChange: {
    group: "✏️ Group name changed → {newName}",
    nickname: "🪶 {oldName} is now known as {newName}",
    botRename: "🤖 Bot’s name has been updated to {botName}"
  },

  // ─── 📸 Avatar / Theme ────────────────────────────────
  themeChange: {
    color: "🎨 Theme color updated!",
    emoji: "🌈 Group emoji changed to {emoji}",
    wallpaper: "🖼️ New group wallpaper set!"
  },

  // ─── ⚙️ Bot / System ──────────────────────────────────
  system: {
    restart: "🔁 Bot restarted successfully!",
    update: "⬆️ Bot updated to version {version}",
    error: "⚠️ System error detected: {error}"
  },

  // ─── 🔔 Mention / Tag ─────────────────────────────────
  mention: {
    adminTag: "👑 Admin {admin} has been mentioned by {user}.",
    botTag: "🤖 Hey {user}, you just mentioned me!",
    userTag: "📢 {user} mentioned {target}."
  }
};

// ✦━━━━━━━━━━━━━━━━━━━━━✦
// ⚡ Powered by Meheraz 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦
