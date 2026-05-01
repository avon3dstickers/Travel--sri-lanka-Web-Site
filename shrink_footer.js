const fs = require('fs');
const path = require('path');

const dir = 'f:\\Web Design\\Tuskerways\\web templates\\2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedFiles = [];
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('class="space-y-4 text-sm"')) {
      // replace with tighter space and smaller font size in footer lists
      content = content.replace(/class="space-y-4 text-sm"/g, 'class="space-y-2.5 text-[11.5px]"');
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedFiles.push(file);
  }
}
console.log('Modified Files: ' + modifiedFiles.join(', '));
