
/* Meheraz Style - logColor.js
   Handles gradient color generation for console output.
   (This file is included in the ZIP but its source is not displayed in chat per user request.)
*/
const ESC = "\x1b[";
function color(code) { return ESC + code + "m"; }

function rgbToAnsi(r,g,b){
  // Convert RGB to 24-bit ANSI escape
  return `38;2;${r};${g};${b}`;
}

function gradientColors(text, colors){
  // Split text and map gradient
  const len = Math.max(1, text.length);
  const out = [];
  for(let i=0;i<len;i++){
    const t = i/(len-1||1);
    const r = Math.round(colors[0].r + (colors[1].r - colors[0].r)*t);
    const g = Math.round(colors[0].g + (colors[1].g - colors[0].g)*t);
    const b = Math.round(colors[0].b + (colors[1].b - colors[0].b)*t);
    out.push({ch: text[i], ansi: rgbToAnsi(r,g,b)});
  }
  return out;
}

module.exports = {
  // colors: array of two RGB objects for gradient start/end
  paintGradient(text, colors){
    if(!colors || colors.length<2) colors = [{r:255,g:100,b:100},{r:100,g:100,b:255}];
    const arr = gradientColors(text, colors);
    return arr.map(x => `${ESC}${x.ansi}m${x.ch}`).join('') + color("0");
  },
  // helper to build a colored tag like [INFO]
  tag(text, colors){
    return this.paintGradient(text, colors);
  },
  reset(){ return color("0"); }
};
