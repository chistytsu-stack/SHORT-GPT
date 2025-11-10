module.exports = {
  config: {
    name: "fontlist",
    aliases: ["font", "fontlist"],
    version: "2.5",
    author: "Meheraz 💫",
    role: 0,
    shortDescription: "Show all Meheraz font styles",
    longDescription: "Displays all 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 font variations with previews ✨",
    category: "fun",
    guide: {
      en: "{pn}\n\nExample:\n{pn}"
    }
  },

  onStart: async function ({ message }) {
    const border = "✦━━━━━━━━━━━━━━━━━━━━━✦";
    const title = "💫 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑭𝒐𝒏𝒕 𝑪𝒐𝒍𝒍𝒆𝒄𝒕𝒊𝒐𝒏 💫";
    const tagline = "⚡ Powered by Meheraz Engine";

    const fonts = [
      { name: "Classic", preview: "𝑴𝒆𝒉𝒆𝒓𝒂𝒛" },
      { name: "Soft Script", preview: "𝓜𝓮𝓱𝓮𝓻𝓪𝔃" },
      { name: "Bold", preview: "𝗠𝗲𝗵𝗲𝗿𝗮𝘇" },
      { name: "Italic", preview: "𝘔𝘦𝘩𝘦𝘳𝘢𝘇" },
      { name: "Gothic", preview: "𝔐𝔢𝔥𝔢𝔯𝔞𝔷" },
      { name: "Dark Gothic", preview: "𝕸𝖊𝖍𝖊𝖗𝖆𝖟" },
      { name: "Double Line", preview: "𝕄𝕖𝕙𝕖𝕣𝕒𝕫" },
      { name: "Tech Line", preview: "𝙈𝙚𝙝𝙚𝙧𝙖𝙯" },
      { name: "Caps Elegant", preview: "𝑴𝑬𝑯𝑬𝑹𝑨𝒁" },
      { name: "Square", preview: "🅼🅴🅷🅴🆁🅰🆉" },
      { name: "Fullwidth", preview: "ｍｅｈｅｒａｚ" },
      { name: "Mono", preview: "𝚖𝚎𝚑𝚎𝚛𝚊𝚣" },
      { name: "Mini High", preview: "ᴹᵉʰᵉʳᵃᶻ" },
      { name: "Mini Low", preview: "ᵐᵉʰᵉʳᵃᶻ" },
      { name: "Boxed", preview: "🄼🄴🄷🄴🅁🄰🅉" }
    ];

    let fontList = fonts.map(
      (f, i) => `💠 ${i + 1}. *${f.name}*\n   Preview: ${f.preview}`
    ).join("\n\n");

    const msg = `${border}\n${title}\n${border}\n\n${fontList}\n\n${tagline}\n${border}`;

    message.reply(msg);
  }
};
