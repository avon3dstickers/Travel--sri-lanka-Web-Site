const fs = require('fs');

const tipsStr = fs.readFileSync('tips_data.json', 'utf8');
let adminHtml = fs.readFileSync('admin.html', 'utf8');

const injection = `const defaultTravelTips = ${tipsStr};\n\n        const defaultDailyEscapes`;
adminHtml = adminHtml.replace('const defaultDailyEscapes', injection);

fs.writeFileSync('admin.html', adminHtml);
console.log('Injected defaultTravelTips into admin.html');
