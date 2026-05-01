(function() {
    const tours = [
        // Daily Escapes
        { name: "Kandy Cultural Tour", url: "tour-daily.html?id=0", category: "daily" },
        { name: "Galle Heritage & Coast", url: "tour-daily.html?id=1", category: "daily" },
        { name: "Sigiriya & Dambulla", url: "tour-daily.html?id=2", category: "daily" },
        { name: "Nuwara Eliya Highlands", url: "tour-daily.html?id=3", category: "daily" },
        { name: "Yala Leopard Safari", url: "tour-daily.html?id=4", category: "daily" },
        { name: "Udawalawe Elephant Safari", url: "tour-daily.html?id=5", category: "daily" },
        { name: "Colombo City Tour", url: "tour-daily.html?id=6", category: "daily" },
        { name: "Whale Watching Mirissa", url: "tour-daily.html?id=7", category: "daily" },
        { name: "Minneriya Safari", url: "tour-daily.html?id=8", category: "daily" },
        
        // Grand Escapes
        { name: "Cultural Triangle", url: "tour-cultural-triangle.html", category: "grand" },
        { name: "Misty Mountains", url: "tour-misty-mountains.html", category: "grand" },
        { name: "Wildlife Wonders", url: "tour-wildlife-wonders.html", category: "grand" },
        { name: "Southern Shores", url: "tour-southern-shores.html", category: "grand" },
        { name: "Ancient Kingdoms", url: "tour-ancient-kingdoms.html", category: "grand" },
        { name: "Coastal Escape", url: "tour-coastal-escape.html", category: "grand" }
    ];

    function initNavigation() {
        try {
            const config = JSON.parse(localStorage.getItem('tusker_config') || '{}');
            const customGrandTours = config.grandEscapes || [];
            const customDailyTours = config.dailyEscapes || [];
            
            // Map the correct custom names if available
            tours.forEach((t) => {
                if (t.category === 'grand') {
                    const gIndex = tours.filter(x => x.category === 'grand').indexOf(t);
                    if (customGrandTours[gIndex] && customGrandTours[gIndex].name) {
                        t.name = customGrandTours[gIndex].name;
                    } else if (gIndex === 0 && !customGrandTours[gIndex]) {
                        t.name = "Cultural Triangle & Hills";
                    }
                } else if (t.category === 'daily') {
                    const dIndex = tours.filter(x => x.category === 'daily').indexOf(t);
                    if (customDailyTours[dIndex] && customDailyTours[dIndex].name) {
                        t.name = customDailyTours[dIndex].name;
                    }
                }
            });
        } catch (e) {
            console.error(e);
        }

        const currentUrl = window.location.pathname.split('/').pop() + window.location.search;
        let currentIndex = tours.findIndex(t => t.url === currentUrl);
        
        // Handle case where URL might be full path or relative
        if (currentIndex === -1) {
            currentIndex = tours.findIndex(t => currentUrl.includes(t.url));
        }

        if (currentIndex === -1) return; // Not a tour page or not in sequence

        const currentTour = tours[currentIndex];
        
        // Filter tours by the same category to stay within Grand or Daily escapes
        const categoryTours = tours.filter(t => t.category === currentTour.category);
        const categoryIndex = categoryTours.findIndex(t => t.url === currentTour.url);

        // Enable looping within the category
        const prevTour = categoryTours.length > 1 ? categoryTours[(categoryIndex - 1 + categoryTours.length) % categoryTours.length] : null;
        const nextTour = categoryTours.length > 1 ? categoryTours[(categoryIndex + 1) % categoryTours.length] : null;

        const navHtml = `

            <div class="tour-nav-container">
                ${prevTour ? `
                    <a href="${prevTour.url}" class="tour-nav-btn prev">
                        <i data-lucide="chevron-left" class="tour-nav-icon w-5 h-5"></i>
                        ${currentTour.category === 'grand' ? '' : '<span class="tour-nav-label">Previous Escape</span>'}
                        <span class="tour-nav-title">${prevTour.name}</span>
                    </a>
                ` : '<div style="flex:1"></div>'}
                
                ${nextTour ? `
                    <a href="${nextTour.url}" class="tour-nav-btn next">
                        <i data-lucide="chevron-right" class="tour-nav-icon w-5 h-5"></i>
                        ${currentTour.category === 'grand' ? '' : '<span class="tour-nav-label">Next Escape</span>'}
                        <span class="tour-nav-title">${nextTour.name}</span>
                    </a>
                ` : '<div style="flex:1"></div>'}
            </div>
        `;

        const main = document.querySelector('main') || document.querySelector('article') || document.body;
        const footer = document.querySelector('footer');
        
        const navWrapper = document.createElement('div');
        navWrapper.innerHTML = navHtml;

        if (footer) {
            footer.parentNode.insertBefore(navWrapper, footer);
        } else if (main) {
            main.appendChild(navWrapper);
        }
        
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
})();

