const fs = require('fs');
const path = require('path');

const dir = 'f:\\Web Design\\Tuskerways\\web templates\\2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedFiles = [];
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Paragraph: "Crafting soulful..."
  if (content.includes('leading-relaxed text-sm max-w-sm')) {
      content = content.replace(/leading-relaxed text-sm max-w-sm/g, 'leading-relaxed text-[11.5px] max-w-sm');
      changed = true;
  }
  
  // Connect With Us List
  if (content.includes('space-y-6 text-sm')) {
      content = content.replace(/space-y-6 text-sm/g, 'space-y-4 text-[11.5px]');
      changed = true;
  }
  
  // Connect With Us Labels
  if (content.includes('text-xs text-gray-500 uppercase font-bold tracking-widest')) {
      content = content.replace(/text-xs text-gray-500 uppercase font-bold tracking-widest/g, 'text-[9px] text-gray-500 uppercase font-bold tracking-[0.15em]');
      changed = true;
  }
  
  // Connect With Us Title and other footer titles
  if (content.includes('text-sm uppercase tracking-[0.2em] font-bold text-primary mb-8')) {
      content = content.replace(/text-sm uppercase tracking-\[0.2em\] font-bold text-primary mb-8/g, 'text-[11px] uppercase tracking-[0.15em] font-bold text-primary mb-6');
      changed = true;
  }

  if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedFiles.push(file);
  }
}
console.log('Modified Files: ' + modifiedFiles.join(', '));
