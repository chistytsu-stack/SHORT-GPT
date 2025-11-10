const axios = require("axios");

module.exports = {
  config: {
    name: "quiz",
    aliases: ["qz", "quiz"],
    version: "1.0.0",
    author: "⚡ 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑰𝒔𝒍𝒂𝒎 𝑪𝒉𝒊𝒔𝒕𝒚 ⚡",
    countDown: 3,
    role: 0,
    shortDescription: "Play random quiz in Meheraz style",
    longDescription: "Fun random quiz game with glowing Meheraz layout.",
    category: "fun"
  },

  onReply: async function({ api, event, Reply }) {
    const { author, correctAnswer } = Reply;
    if (String(event.senderID) !== String(author)) return;

    const { body, threadID, messageID } = event;
    const answer = body.trim().toLowerCase();

    api.unsendMessage(Reply.messageID);

    if (answer === correctAnswer.toLowerCase()) {
      return api.sendMessage(
        `✦━━━━━━━━━━━━━━━━━━━━━✦
🎉 𝗖𝗢𝗥𝗥𝗘𝗖𝗧 𝗔𝗡𝗦𝗪𝗘𝗥! 🎉
✦━━━━━━━━━━━━━━━━━━━━━✦
💫 You’re truly smart ✦𝑴𝒆𝒉𝒆𝒓𝒂𝒛✦ style champion!
⚡ Keep shining, genius! ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
        threadID, messageID
      );
    } else {
      return api.sendMessage(
        `✦━━━━━━━━━━━━━━━━━━━━━✦
❌ 𝗪𝗥𝗢𝗡𝗚 𝗔𝗡𝗦𝗪𝗘𝗥 ❌
✦━━━━━━━━━━━━━━━━━━━━━✦
💡 Correct: ${Reply.correctAnswer}
Try again next time 💫
⚡ Powered by Meheraz ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`,
        threadID, messageID
      );
    }
  },

  onStart: async function({ api, event }) {
    const { threadID, messageID, senderID } = event;

    // Optional trivia API
    const { data } = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
    const q = data.results[0];

    const question = q.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    const correct = q.correct_answer;
    const options = [...q.incorrect_answers, correct].sort(() => Math.random() - 0.5);

    const msg = `
✦━━━━━━━━━━━━━━━━━━━━━✦
💡 𝗠𝗘𝗛𝗘𝗥𝗔𝗭 𝗤𝗨𝗜𝗭 𝗧𝗜𝗠𝗘 💡
✦━━━━━━━━━━━━━━━━━━━━━✦

🧠 ${question}

${options.map((opt, i) => `${i + 1}. ${opt}`).join("\n")}

💬 Reply with the correct option number!
✦━━━━━━━━━━━━━━━━━━━━━✦
⚡ Powered by Meheraz ⚡
✦━━━━━━━━━━━━━━━━━━━━━✦`;

    api.sendMessage(msg, threadID, (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: "quiz",
        messageID: info.messageID,
        author: senderID,
        correctAnswer: correct
      });
    }, messageID);
  }
};
