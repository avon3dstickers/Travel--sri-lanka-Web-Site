const fs = require('fs');
const html = fs.readFileSync('travel-tips.html', 'utf8');

const tips = [];
const regex = /<div class="tip-card" data-cat="(.*?)" data-keywords="(.*?)">[\s\S]*?<i data-lucide="(.*?)"[\s\S]*?<div class="tip-title">(.*?)<\/div><div class="tip-desc">(.*?)<\/div>/g;

let match;
let id = 1;
while ((match = regex.exec(html)) !== null) {
  tips.push({
    id: id++,
    category: match[1],
    keywords: match[2],
    icon: match[3],
    title: match[4],
    desc: match[5]
  });
}

fs.writeFileSync('tips_data.json', JSON.stringify(tips, null, 2));
console.log('Extracted ' + tips.length + ' tips.');
