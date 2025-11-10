const { writeFileSync, existsSync, readFileSync } = require("fs");
const file = __dirname + "/userPrefix.json";

// ✦━━━━━━━━━━━━━━━━━━━━━✦
//  Create prefix data file if not exists
// ✦━━━━━━━━━━━━━━━━━━━━━✦
if (!existsSync(file)) writeFileSync(file, "{}");

module.exports = {
  config: {
    name: "prefix",
    aliases: ["setprefix", "prefix"],
    version: "2.0",
    author: "Meheraz Islam (Chisty)",
    countDown: 5,
    role: 0,
    shortDescription: "Set your own prefix",
    longDescription: "Each user can set and use their own custom prefix.",
    category: "system",
  },

  // ✦━━━━━━━━━━━━━━━━━━━━━✦
  //  When command is used
  // ✦━━━━━━━━━━━━━━━━━━━━━✦
  onStart: async function ({ api, event, args }) {
    const { senderID, threadID, messageID } = event;
    const globalPrefix = global.GoatBot.config.prefix;
    let data = JSON.parse(readFileSync(file));

    // যদি prefix file এ ওই user না থাকে তাহলে add করে দাও
    if (!data[senderID]) data[senderID] = globalPrefix;

    // ✦━━━━━━━━━━━━━━━━━━━━━✦
    //  যদি কিছু না দেয়, শুধু prefix দেখাও
    // ✦━━━━━━━━━━━━━━━━━━━━━✦
    if (!args[0]) {
      return api.sendMessage(
        `✦━━━━━━━━━━━━━━━━━━━━━✦
💠 𝗬𝗢𝗨𝗥 𝗣𝗥𝗘𝗙𝗜𝗫 💠
✦━━━━━━━━━━━━━━━━━━━━━✦

🔹 Your current prefix: “${data[senderID]}”
🔹 Global prefix: “${globalPrefix}”

Use “${data[senderID]}prefix [new prefix]” to change it.

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝗠𝗲𝗵𝗲𝗿𝗮𝘇 𝗦𝘁𝘆𝗹𝗲 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
        threadID,
        messageID
      );
    }

    // ✦━━━━━━━━━━━━━━━━━━━━━✦
    //  Update user prefix
    // ✦━━━━━━━━━━━━━━━━━━━━━✦
    const newPrefix = args[0];
    data[senderID] = newPrefix;
    writeFileSync(file, JSON.stringify(data, null, 2));

    api.sendMessage(
      `✦━━━━━━━━━━━━━━━━━━━━━✦
✅ 𝗣𝗥𝗘𝗙𝗜𝗫 𝗨𝗣𝗗𝗔𝗧𝗘𝗗 ✅
✦━━━━━━━━━━━━━━━━━━━━━✦

🔹 Old Prefix: “${globalPrefix}”
🔹 New Prefix: “${newPrefix}”
🔹 Updated by: @${senderID}

Now you can use:
“${newPrefix}help” or “${newPrefix}menu”

✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ 𝗠𝗲𝗵𝗲𝗿𝗮𝘇 𝗦𝘁𝘆𝗹𝗲 ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
      threadID,
      messageID
    );
  },
};
