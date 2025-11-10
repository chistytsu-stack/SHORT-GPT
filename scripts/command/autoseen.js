module.exports = {
  config: {
    name: "autoseen",
    version: "1.0.0",
    author: "⚡ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑰𝒔𝒍𝒂𝒎 𝑪𝒉𝒊𝒔𝒕𝒚 ⚡",
    countDown: 0,
    role: 0,
    shortDescription: "Automatically mark messages as seen",
    longDescription: "Automatically reacts by marking messages as seen, silently like a ghost 👀",
    category: "system"
  },

  // ✦━━━━━━━━━━━━━━━━━━━━━✦
  // 👁 Auto Seen Event Trigger
  // ✦━━━━━━━━━━━━━━━━━━━━━✦
  onEvent: async function ({ api, event }) {
    try {
      // যদি message থাকে, তাহলে auto seen করবে
      if (event && event.threadID) {
        api.markAsRead(event.threadID, err => {
          if (err) console.error("AutoSeen Error:", err);
        });
      }
    } catch (e) {
      console.error("AutoSeen Exception:", e);
    }
  }
};
