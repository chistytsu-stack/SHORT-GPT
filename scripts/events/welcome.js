const { getTime, drive } = global.utils;

if (!global.temp) global.temp = {};
if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};

module.exports = {
    config: {
        name: "welcome",
        version: "2.1",
        author: "Modified-by-Meheraz",
        category: "events",
        description: "Cool & Modern welcome messages (Bangla + English) with GIF/attachment support"
    },

    langs: {
        en: {
            session1: "☀ Morning",
            session2: "⛅ Noon",
            session3: "🌆 Afternoon",
            session4: "🌙 Evening",
            welcomeMessage:
`✦━━━━━━━━━━━━━━━━✦
🎀  WELCOME  🎀
✦━━━━━━━━━━━━━━━━✦

🚀 Thank you for inviting me!
⚡ Bot Prefix: %1
🔎 To see commands type: %1help

✨ Have a great {session}!
✦━━━━━━━━━━━━━━━━✦`,
            defaultWelcomeMessage:
`✦━━━━━━━━━━━━━━━━✦
🎉  WELCOME  🎉
✦━━━━━━━━━━━━━━━━✦

💠 Hey {userName}!
🔹 You just joined 『 {boxName} 』
⏳ Time for some fun — have a fantastic {session} 🎊

✦━━━━━━━━━━━━━━━━✦`,
            multiple1: "🔹 You",
            multiple2: "🔹 You Guys"
        },
        vi: {
            session1: "☀ 𝗦𝗮́𝗻𝗴",
            session2: "⛅ 𝗧𝗿𝘂̛𝗮",
            session3: "🌆 𝗖𝗵𝗶𝗲̂̀𝘂",
            session4: "🌙 𝗧𝗼̂́𝗶",
            welcomeMessage: "✨ 𝗖𝗮̉𝗺 𝗼̛𝗻 𝗯𝗮̣𝗻 𝗱𝗮̃ 𝗺𝗼𝗿 𝘁𝗼̂𝗶 𝘃𝗮̀𝗼 𝗻𝗵𝗼́𝗺!\n⚡ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗯𝗼𝘁: %1\n🔎 𝗗𝗲̂̉ 𝘅𝗲𝗺 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗹𝗲̣̂𝗻𝗵 𝗵𝗮̃𝘆 𝗻𝗵𝗮̣̂𝗽: %1help",
            defaultWelcomeMessage: "🎉 𝗖𝗵𝗮̀𝗼 𝗺𝘂̛̀𝗻𝗴 {userName} 🎊\n\n🚀 𝗖𝗵𝗮̀𝗼 𝗺𝘂̛̀𝗻𝗴 𝗯𝗮̣𝗻 𝗱𝗲̂́𝗻 𝘃𝗼̛́𝗶 『 {boxName} 』\n🔹 𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝗰𝗼́ 𝗯𝘂𝗼̂̉𝗶 {session} 𝘃𝘂𝗶 𝘃𝗲̉! ✨"
        },
        bn: {
            session1: "☀ সকাল",
            session2: "⛅ দুপুর",
            session3: "🌆 বিকেল",
            session4: "🌙 রাত",
            welcomeMessage:
`✦━━━━━━━━━━━━━━━━✦
🎀 স্বাগতম 🎀
✦━━━━━━━━━━━━━━━━✦

🚀 আমায় আমন্ত্রণ করার জন্য ধন্যবাদ!
⚡ বট প্রিফিক্স: %1
🔎 সকল কমান্ড দেখতে টাইপ করুন: %1help

✨ শুভ {session}!
✦━━━━━━━━━━━━━━━━✦`,
            defaultWelcomeMessage:
`✦━━━━━━━━━━━━━━━━✦
🎉 স্বাগতম 🎉
✦━━━━━━━━━━━━━━━━✦

💠 হে {userName}!
🔹 তুমি এখন 『 {boxName} 』-এ যোগ দিয়েছো
⏳ মজার সময় কাটুক — শুভ {session} 🎊

✦━━━━━━━━━━━━━━━━✦`,
            multiple1: "🔹 তুমি",
            multiple2: "🔹 তোমরা সবাই"
        }
    },

    onStart: async ({ threadsData, message, event, api, getLang }) => {
        try {
            if (event.logMessageType !== "log:subscribe") return;

            const { threadID, logMessageData } = event;
            const { addedParticipants } = logMessageData;

            // if bot itself is added to a thread
            const botId = api.getCurrentUserID?.() || api.getCurrentUID?.() || api.getCurrentUserID;
            if (addedParticipants.some(p => p.userFbId === botId)) {
                const nickNameBot = (global.GoatBot && global.GoatBot.config && global.GoatBot.config.nickNameBot) || null;
                if (nickNameBot) {
                    try { await api.changeNickname(nickNameBot, threadID, botId); } catch (e) { /* ignore */ }
                }
                const prefix = global.utils.getPrefix ? global.utils.getPrefix(threadID) : "!";
                return message.send(getLang("welcomeMessage", prefix));
            }

            // prepare temp store for batch handling
            if (!global.temp.welcomeEvent[threadID]) {
                global.temp.welcomeEvent[threadID] = { joinTimeout: null, dataAddedParticipants: [] };
            }

            // append newly added participants into temp store
            global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...addedParticipants);

            // reset previous timeout
            clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

            // wait a little to batch multiple joins together
            global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async () => {
                try {
                    const threadData = await threadsData.get(threadID);
                    // respect thread setting to disable welcome messages
                    if (threadData && threadData.settings && threadData.settings.sendWelcomeMessage === false) {
                        delete global.temp.welcomeEvent[threadID];
                        return;
                    }

                    const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants || [];
                    const bannedUsers = (threadData && threadData.data && threadData.data.banned_ban) ? threadData.data.banned_ban : [];
                    const threadName = (threadData && threadData.threadName) ? threadData.threadName : "this group";

                    // create user lists and mentions
                    let userNameList = [], mentions = [];
                    for (const user of dataAddedParticipants) {
                        if (bannedUsers.some(b => b.id === user.userFbId)) continue;
                        userNameList.push(user.fullName);
                        mentions.push({ tag: user.fullName, id: user.userFbId });
                    }

                    if (userNameList.length === 0) {
                        delete global.temp.welcomeEvent[threadID];
                        return;
                    }

                    // detect session based on hour
                    const hours = getTime("HH");
                    const session = hours <= 10 ? getLang("session1") :
                                    hours <= 12 ? getLang("session2") :
                                    hours <= 18 ? getLang("session3") :
                                    getLang("session4");

                    // Compose welcome message (prefer thread-specific welcomeMessage, fallback to default)
                    let welcomeMessage = (threadData && threadData.data && threadData.data.welcomeMessage) ? threadData.data.welcomeMessage : getLang("defaultWelcomeMessage");

                    // Replace placeholders
                    const userNamesStr = userNameList.join(", ");
                    const isMultiple = userNameList.length > 1;
                    welcomeMessage = welcomeMessage
                        .replace(/\{userName\}|\{userNameTag\}/g, userNamesStr)
                        .replace(/\{boxName\}|\{threadName\}/g, threadName)
                        .replace(/\{multiple\}/g, isMultiple ? getLang("multiple2") : getLang("multiple1"))
                        .replace(/\{session\}/g, session);

                    // Build message form
                    const form = { body: welcomeMessage, mentions: welcomeMessage.includes("{userNameTag}") ? mentions : mentions };

                    // Attach custom welcomeAttachment if exists (supporting array of file IDs stored in threadData)
                    if (threadData && threadData.data && threadData.data.welcomeAttachment && Array.isArray(threadData.data.welcomeAttachment) && threadData.data.welcomeAttachment.length) {
                        const files = threadData.data.welcomeAttachment;
                        const attachments = files.map(file => drive.getFile(file, "stream"));
                        const results = await Promise.allSettled(attachments);
                        form.attachment = results
                            .filter(r => r.status === "fulfilled" && r.value)
                            .map(r => r.value);
                    } else {
                        // ---------- Assistant's chosen default cyber-neon GIF ----------
                        const defaultGif = "https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif";
                        try {
                            const stream = await drive.getFile(defaultGif, "stream").catch(() => null);
                            if (stream) form.attachment = [stream];
                        } catch (_) { /* ignore if drive can't fetch external URL */ }
                    }

                    // final send
                    await message.send(form);

                } catch (err) {
                    console.error("Welcome handler error:", err);
                } finally {
                    // cleanup
                    delete global.temp.welcomeEvent[threadID];
                }
            }, 1500);

        } catch (err) {
            console.error("welcome.onStart error:", err);
        }
    }
};

