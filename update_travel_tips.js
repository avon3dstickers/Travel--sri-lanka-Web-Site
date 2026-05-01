const fs = require('fs');

let html = fs.readFileSync('travel-tips.html', 'utf8');

// Replace all .tips-grid content with empty so we can dynamically inject.
html = html.replace(/<div class="tips-grid">[\s\S]*?<\/div>\s*<\/div>/g, '<div class="tips-grid" data-grid-cat="$&"></div></div>');
// Wait, the regex captures the closing </div> of tips-grid and the closing </div> of category-section. Let's do it safer:
html = html.replace(/<div class="tips-grid">[\s\S]*?(?=<\/div>\s*<\/div>\s*<!--)/g, '<div class="tips-grid">');

// Read default tips to inject into the script
const tipsStr = fs.readFileSync('tips_data.json', 'utf8');

const jsCode = `
        const defaultTips = ${tipsStr};
        let activeTips = defaultTips;
        
        try {
            const saved = localStorage.getItem('tusker_config');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.travelTips) activeTips = parsed.travelTips;
            }
        } catch(e){}

        const categories = {
            visa: { color: '#38bdf8', catIcon: 'globe' },
            connectivity: { color: '#a78bfa', catIcon: 'wifi' },
            transport: { color: '#34d399', catIcon: 'train-front' },
            culture: { color: '#fb923c', catIcon: 'landmark' },
            health: { color: '#f43f5e', catIcon: 'heart-pulse' },
            safety: { color: '#fbbf24', catIcon: 'shield-check' }
        };

        function hexToRgba(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
            return \`rgba(\${r},\${g},\${b},\${alpha})\`;
        }

        // Generate grids
        document.querySelectorAll('.category-section').forEach(sec => {
            const cat = sec.id.replace('cat-', '');
            const grid = sec.querySelector('.tips-grid');
            if (!grid) return;
            
            grid.innerHTML = '';
            
            const catTips = activeTips.filter(t => t.category === cat);
            const conf = categories[cat] || {color: '#888', catIcon: 'info'};
            
            // update count
            const countDiv = sec.querySelector('.cat-count');
            if(countDiv) countDiv.textContent = \`\${catTips.length} Essential Tips\`;

            catTips.forEach(t => {
                grid.innerHTML += \`
                <div class="tip-card" data-cat="\${t.category}" data-keywords="\${t.keywords}">
                    <div class="tip-icon" style="background:\${hexToRgba(conf.color, 0.1)};">
                        <i data-lucide="\${t.icon || 'info'}" style="width:18px;height:18px;color:\${conf.color}"></i>
                    </div>
                    <div>
                        <div class="tip-title">\${t.title}</div>
                        <div class="tip-desc">\${t.desc}</div>
                    </div>
                </div>\`;
            });
            
            if(catTips.length === 0) sec.style.display = 'none';
        });
        
        lucide.createIcons();
`;

html = html.replace('lucide.createIcons();', jsCode);

fs.writeFileSync('travel-tips.html', html);
console.log('travel-tips.html is now totally dynamic!');
