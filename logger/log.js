
/* Meheraz Style - log.js
   Main logger with tags and gradient styling.
*/
const logColor = require("./logColor");

const defaultColors = [{r:255,g:100,b:50},{r:200,g:50,b:255}];

function timeStamp(){
  return new Date().toISOString();
}

function formatTag(level){
  const tag = `[${level}]`;
  return logColor.tag(tag, defaultColors);
}

function info(...args){ console.log(`${formatTag("INFO")} ${logColor.paintGradient(args.join(" "), defaultColors)} ${logColor.reset()}`); }
function success(...args){ console.log(`${formatTag("SUCCESS")} ${logColor.paintGradient(args.join(" "), [{r:80,g:220,b:120},{r:30,g:180,b:200}])} ${logColor.reset()}`); }
function error(...args){ console.error(`${formatTag("ERROR")} ${logColor.paintGradient(args.join(" "), [{r:255,g:60,b:60},{r:180,g:40,b:140}])} ${logColor.reset()}`); }
function debug(...args){ console.log(`${formatTag("DEBUG")} ${args.join(" ")}`); }

module.exports = { info, success, error, debug };
