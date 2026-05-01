const fs = require('fs');
const path = 'f:\\Web Design\\Tuskerways\\web templates\\2\\index.html';
let c = fs.readFileSync(path, 'utf8');

// Replace the display:'block' style string to add textAlign:'center' and make sure flex helps if needed.
// Originally: display:'block',margin:'0 auto',letterSpacing:'0.04em',whiteSpace:'nowrap'
c = c.replace(/display:'block',margin:'0 auto',letterSpacing:'0.04em',whiteSpace:'nowrap'/, 
              "display:'flex',justifyContent:'center',margin:'0 auto',letterSpacing:'0.04em',whiteSpace:'nowrap'");

fs.writeFileSync(path, c, 'utf8');
console.log("Centered horizontally");
