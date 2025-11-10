const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "pending",
    aliases: ["pend"],
    version: "2.0",
    author: "Meheraz Islam (Chisty)",
    countDown: 5,
    role: 2,
    shortDescription: "Accept pending messages",
    longDescription: "Approve pending user or group chats easily.",
    category: "system"
  },

  onReply: async function ({ api, event, Reply }) {
    const { author, pending } = Reply;
    if (String(event.senderID) !== String(author)) return;

    const { body, threadID, messageID } = event;
    if (!body) return api.sendMessage("⚠️ | Invalid reply!", threadID, messageID);

    if (body.startsWith("c"))
      return api.sendMessage("❌ | Cancelled successfully.", threadID, messageID);

    const indices = body.split(/\s+/)
      .map(n => parseInt(n))
      .filter(n => !isNaN(n) && n > 0 && n <= pending.length);

    if (!indices.length)
      return api.sendMessage("⚠️ | No valid numbers found!", threadID, messageID);

    api.unsendMessage(messageID);

    const filePath = path.join(__dirname, "assets", "approve.mp4");
    const videoUrl = "https://drive.google.com/uc?export=download&id=19D0PcMNOsIY3kniXDq3tlQIh7UG-YLVe";

    try {
      const response = await axios({ method: "GET", url: videoUrl, responseType: "stream" });
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        for (const i of indices) {
          const targetID = pending[i - 1].threadID;

          api.changeNickname(
            `[ ${global.GoatBot.config.prefix} ] ${global.GoatBot.config.nickNameBot || "Bot"}`,
            targetID,
            api.getCurrentUserID()
          );

          api.sendMessage({
            body: `✦━━━━━━━━━━━━━━━━━━━━━✦
🎉 𝐁𝐎𝐓 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 🎉
✦━━━━━━━━━━━━━━━━━━━━━✦

💬 𝗛𝗲𝗹𝗹𝗼! I'm now active in your chat.
🚀 Use “${global.GoatBot.config.prefix}help” to see all commands.

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝗠𝗲𝗵𝗲𝗿𝗮𝘇 𝗦𝘁𝘆𝗹𝗲 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
            attachment: fs.createReadStream(filePath)
          }, targetID);
        }

        api.sendMessage(
          `✅ | Successfully approved ${indices.length} thread(s)!`,
          threadID,
          messageID
        );
      });

      writer.on("error", err => {
        api.sendMessage("❌ | Error writing video file!", threadID, messageID);
        console.error(err);
      });
    } catch (err) {
      api.sendMessage("❌ | Failed to download file!", threadID, messageID);
      console.error(err);
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    const { threadID, messageID, senderID } = event;
    const adminIDs = global.GoatBot.config.adminBot;

    if (!adminIDs.includes(senderID))
      return api.sendMessage("⛔ | You don't have permission to use this command!", threadID, messageID);

    if (!args.length)
      return api.sendMessage(
        `✦━━━━━━━━━━━━━━━━━━━━━✦
📋 𝗣𝗘𝗡𝗗𝗜𝗡𝗚 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗛𝗘𝗟𝗣
✦━━━━━━━━━━━━━━━━━━━━━✦

🔹 pending user → Show pending user chats  
🔹 pending thread → Show pending group chats  
🔹 pending all → Show all pending approvals  

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝗠𝗲𝗵𝗲𝗿𝗮𝘇 𝗦𝘁𝘆𝗹𝗲 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
        threadID, messageID
      );

    let listType = args[0].toLowerCase();
    let msg = "", list = [], index = 1;

    try {
      const spam = await api.getThreadList(100, null, ["OTHER"]) || [];
      const pending = await api.getThreadList(100, null, ["PENDING"]) || [];
      const combined = [...spam, ...pending];

      if (listType === "user" || listType === "u") {
        list = combined.filter(t => !t.isGroup);
      } else if (listType === "thread" || listType === "t") {
        list = combined.filter(t => t.isGroup);
      } else {
        return api.sendMessage("⚠️ | Invalid option! Use 'user' or 'thread'.", threadID, messageID);
      }
    } catch (e) {
      return api.sendMessage("❌ | Failed to fetch pending list!", threadID, messageID);
    }

    for (const single of list) {
      const name = listType === "user"
        ? await usersData.getName(single.threadID)
        : single.name || "Unknown";
      msg += `${index++}. ${name} (${single.threadID})\n`;
    }

    if (list.length) {
      api.sendMessage(
        `✦━━━━━━━━━━━━━━━━━━━━━✦
📨 𝗣𝗘𝗡𝗗𝗜𝗡𝗚 𝗟𝗜𝗦𝗧 (${listType.toUpperCase()})
✦━━━━━━━━━━━━━━━━━━━━━✦

${msg}
💬 Reply with number(s) to approve  
or type “c” to cancel.

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝗠𝗲𝗵𝗲𝗿𝗮𝘇 𝗦𝘁𝘆𝗹𝗲 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
        threadID,
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: senderID,
            pending: list
          });
        },
        messageID
      );
    } else {
      api.sendMessage(`📭 | No ${listType}(s) pending approval.`, threadID, messageID);
    }
  }
};
