(function() {
    window.applyTheme = function() {
        // Remove existing dynamic styles if any
        const existing = document.getElementById('tusker-dynamic-typography');
        if (existing) existing.remove();

        const saved = localStorage.getItem('tusker_config');
        if (!saved) return;

        const config = JSON.parse(saved);
        let css = '';

        // Helper to add style block
        const addStyle = (selector, font, size) => {
            if (!font && !size) return '';
            let s = `${selector} { `;
            if (font) s += `font-family: ${font} !important; `;
            if (size && size > 0) s += `font-size: ${size}px !important; `;
            s += '} \n';
            return s;
        };

        // Heading 1: Master Hero Titles
        // Targets: Main h1, page hero titles, and the index.html react hero title
        css += addStyle('h1, .hero-title-main, #page-hero-title, .hero-text-glitch', config.h1Font, config.h1Size);

        // Heading 2: Hero Sub-Headlines
        // Targets: Subtitles right under the hero title
        css += addStyle('.hero-sub, #page-hero-subtitle, .hero-subtext-reveal', config.h2Font, config.h2Size);

        // Heading 3: Section Titles
        // Targets: Section headers like "Grand Escapes", "Why Choose Us"
        // In many pages these use .hero-title class but are h2
        css += addStyle('h2.hero-title, #welcome-title, .section-header-text', config.h3Font, config.h3Size);

        // Heading 4: Action & Detail Tags
        // Targets: Small accent headings, partner tags, labels
        // Often these are colored primary or have tracking-widest
        css += addStyle('.accent-tag, .partners-tag, span.text-primary.tracking-widest', config.h4Font, config.h4Size);

        if (css) {
            const style = document.createElement('style');
            style.id = 'tusker-dynamic-typography';
            style.innerHTML = css;
            document.head.appendChild(style);
        }

        // --- Start: Dynamic Popular Escapes in Footer ---
        try {
            const defaultGrandTours = [
                { name: "Cultural Triangle & Hills", link: "tour-cultural-triangle.html" },
                { name: "Misty Mountains", link: "tour-misty-mountains.html" },
                { name: "Wildlife Wonders", link: "tour-wildlife-wonders.html" },
                { name: "Southern Shores", link: "tour-southern-shores.html" }
            ];
            
            const grandEscapes = config.grandEscapes || [];
            let tours = defaultGrandTours.map((t, i) => grandEscapes[i] && grandEscapes[i].name ? { ...t, name: grandEscapes[i].name } : t);
            
            // Allow discovering newly added Grand Escapes
            if (grandEscapes.length > 4) {
                for (let i = 4; i < grandEscapes.length; i++) {
                    if (grandEscapes[i] && grandEscapes[i].name) {
                        tours.push({ name: grandEscapes[i].name, link: grandEscapes[i].link || '#' });
                    }
                }
            }

            const headers = document.querySelectorAll('h4');
            headers.forEach(h4 => {
                if (h4.textContent.trim().toUpperCase() === 'POPULAR ESCAPES') {
                    let nextEl = h4.nextElementSibling;
                    if (nextEl && nextEl.tagName === 'UL') {
                        let listHTML = '';
                        tours.forEach(t => {
                            listHTML += `<li><a href="${t.link}" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all"></span> ${t.name}</a></li>`;
                        });
                        nextEl.innerHTML = listHTML;
                    }
                }
            });
        } catch (e) {
            console.error("Error populating Popular Escapes:", e);
        }
        // --- End: Dynamic Popular Escapes ---

    };

    // Initial run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTheme);
    } else {
        applyTheme();
    }

    // Listen for storage changes
    window.addEventListener('storage', (e) => {
        if (e.key === 'tusker_config') applyTheme();
    });
})();
