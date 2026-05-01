const fs = require('fs');
const path = 'f:\\Web Design\\Tuskerways\\web templates\\2\\index.html';
let c = fs.readFileSync(path, 'utf8');

c = c.replace(/display:'block',margin:'0 auto',letterSpacing:'0.04em'\}/, "display:'block',margin:'0 auto',letterSpacing:'0.04em',whiteSpace:'nowrap'}");

fs.writeFileSync(path, c, 'utf8');
console.log("Added whiteSpace:nowrap");
