
/* Meheraz Style - loading.js
   Animated CLI loader that uses gradient-colored spinner frames.
*/
const log = require("./log");

function sleep(ms){ return new Promise(res=>setTimeout(res,ms)); }

async function spinner(text="Loading", ms=80, rounds=60){
  const frames = ["◐","◓","◑","◒"];
  for(let i=0;i<rounds;i++){
    const frame = frames[i % frames.length];
    process.stdout.write("\r" + frame + " " + text + " ");
    await sleep(ms);
  }
  process.stdout.write("\r✓ " + text + " - done\n");
}

module.exports = { spinner };
