const fs = require('fs');

const dir = 'F:/Web Design/Tuskerways/web templates/2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'admin.html');

const replacementHtml = `                <div>
                    <h4 class="text-[11px] uppercase tracking-[0.15em] font-bold text-primary mb-6">Popular Escapes</h4>
                    <ul class="space-y-2.5 text-[11.5px]" id="footer-popular-escapes">
                        <li><a href="travel-tips.html" class="text-white hover:text-primary transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all"></span> Travel Tips & Advice</a></li>
                        <li><a href="daily-escapes.html?tour=0" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all"></span> The Highland & Heritage Escape</a></li>
                        <li><a href="daily-escapes.html?tour=2" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all"></span> Nature's Symphony : Coast to Cloud</a></li>
                        <li><a href="grand-escapes.html?tour=3" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all"></span> Wildlife Wonders</a></li>
                        <li><a href="daily-escapes.html?tour=5" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all"></span> Southern Shores</a></li>
                        <li><a href="grand-escapes.html?tour=4" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all"></span> Wild Discovery & Rustic Retreats</a></li>
                    </ul>
                </div>`;

let updatedCount = 0;

for (const file of files) {
    const path = dir + '/' + file;
    let content = fs.readFileSync(path, 'utf8');

    // Find the third column block: The block that comes right before the 'Connect With Us' section starts
    // Format: <div>\s*<h4...>Popular Escapes</h4>...</div>\s*<div class="bg-white/5... Connect With Us
    
    // There are two cases right now:
    // Case 1: "Traveler Resources" (sri-lanka-edit.html, travel-tips.html)
    // Case 2: "Popular Escapes" (everything else)
    
    const regex = /<div>\s*<h4 class="text-\[11px\] uppercase tracking-\[0.15em\] font-bold text-primary mb-6">(?:Popular Escapes|Traveler Resources)<\/h4>[\s\S]*?<\/ul>\s*<\/div>(?=\s*<div class="bg-white\/5 p-8 rounded-\[2rem\] border border-white\/10 h-fit">)/g;

    const matches = content.match(regex);
    if(matches && matches.length === 1) {
        content = content.replace(regex, replacementHtml);
        fs.writeFileSync(path, content, 'utf8');
        updatedCount++;
        console.log('Updated: ' + file);
    } else {
        console.log('Skipped (Pattern not exactly matched): ' + file);
    }
}

console.log('Successfully updated ' + updatedCount + ' files.');
