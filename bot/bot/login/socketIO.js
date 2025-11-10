// ✦━━━━━━━━━━━━━━━━━━━━━✦
// 📁 File: bot/login/socketIO.js
// 👑 Style: 𝑴𝒆𝒉𝒆𝒓𝒂𝒛 𝑺𝒕𝒚𝒍𝒆 💫
// ✦━━━━━━━━━━━━━━━━━━━━━✦

const { io } = require("socket.io-client");
const chalk = require("chalk");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚙️ Function: Connect to Socket.IO Server
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = function connectSocketIO(serverURL, botName = "Meheraz Bot") {
  console.clear();
  console.log(chalk.cyanBright("\n✦━━━━━━━━━━━━━━━━━━━━━✦"));
  console.log(chalk.magentaBright(`🌐 Connecting ${botName} to Socket.IO server...`));
  console.log(chalk.cyanBright("✦━━━━━━━━━━━━━━━━━━━━━✦\n"));

  if (!serverURL) {
    console.log(chalk.redBright("❌ No Socket.IO server URL provided!"));
    console.log(chalk.yellowBright("ℹ️  Example: connectSocketIO('https://meheraz-socket.glitch.me')"));
    return;
  }

  const socket = io(serverURL, {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3000,
    transports: ["websocket"]
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🧠 Socket Events
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  socket.on("connect", () => {
    console.log(chalk.greenBright(`✅ Connected to ${serverURL}`));
    console.log(chalk.cyanBright("✨ Meheraz Bot is now online & synced 💠\n"));
  });

  socket.on("disconnect", () => {
    console.log(chalk.redBright("❌ Disconnected from Socket.IO server!"));
    console.log(chalk.yellowBright("🔁 Attempting to reconnect...\n"));
  });

  socket.on("reconnect_attempt", (attempt) => {
    console.log(chalk.cyanBright(`🔄 Reconnection attempt #${attempt}`));
  });

  socket.on("connect_error", (err) => {
    console.log(chalk.redBright("💥 Socket.IO connection error:"));
    console.error(chalk.gray(err.message));
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 💬 Example: Receive broadcast from dashboard
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  socket.on("broadcast", (data) => {
    console.log(chalk.yellowBright(`📢 Broadcast received: ${data.message}`));
    if (global.api) {
      global.api.sendMessage(`🔔 Admin Broadcast:\n${data.message}`, data.threadID || global.threadID);
    }
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ⚡ Return the socket object
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return socket;
};

