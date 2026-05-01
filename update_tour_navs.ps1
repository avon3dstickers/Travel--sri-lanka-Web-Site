$files = Get-ChildItem "f:/Web Design/Tuskerways/web templates/Harima eka/2/tour-*.html"

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = Get-Content $file.FullName -Raw

    # 1. Clean up old nav styles and add standardized ones
    $navStylePattern = '(?s)nav \{.*?\}.*?@media\(max-width:960px\) \{.*?\}'
    $newNavStyle = 'nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: center; }
        .nav-inner { width: 100%; max-width: 1100px; display: flex; align-items: center; justify-content: space-between; background: rgba(8, 11, 16, .82); border: 1px solid rgba(255, 255, 255, 0.07); backdrop-filter: blur(24px); border-radius: 100px; padding: .5rem 1rem .5rem 0.6rem; }
        .nav-logo { display: flex; align-items: center; text-decoration: none; }
        .nav-logo img { height: 40px; width: auto; }
        .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; padding: 0; margin: 0; }
        .nav-links a { text-decoration: none; font-family: ''Outfit'', sans-serif; font-size: .65rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: rgba(255, 255, 255, 0.52); transition: all 0.3s; white-space: nowrap; display: flex; align-items: center; gap: 6px; padding: 0.5rem 0; }
        .nav-links a:hover { color: #fff; }
        .nav-cta { text-decoration: none; font-family: ''Outfit'', sans-serif; font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #080b10; background: #00c2a8; padding: .6rem 1.4rem; border-radius: 100px; white-space: nowrap; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0, 194, 168, 0.2); }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0, 194, 168, 0.3); }
        .nav-dropdown { position: relative; }
        .nav-dropdown-menu { position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(10px); min-width: 200px; padding-top: 15px; opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1); z-index: 1001; }
        .nav-dropdown:hover .nav-dropdown-menu { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
        .nav-dropdown-inner { background: #000; border: 1px solid var(--border, rgba(255,255,255,0.07)); border-radius: 16px; padding: .6rem 0; backdrop-filter: blur(20px); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .nav-dropdown-inner a { display: block; padding: .65rem 1.25rem; font-size: .65rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(255, 255, 255, 0.52); text-decoration: none; }
        .nav-dropdown-inner a:hover { color: #fff; background: rgba(255, 255, 255, 0.05); }
        @media(max-width:960px) { .nav-links { display: none; } }'

    # Replace all occurrences of nav styles (they are duplicated in these files)
    $content = $content -replace $navStylePattern, $newNavStyle
    # Also handle the "Shared Nav Styles" comment block if it exists
    $content = $content -replace '(?s)/\* Shared Nav Styles.*?\*/\s*nav \{.*?\}', $newNavStyle

    # 2. Add id="navbar"
    $content = $content -replace '<nav>', '<nav id="navbar">'

    # 3. Add mobile menu button
    $ctaPattern = '<div class="nav-side right">\s*<a href="plan-escape.html" class="nav-cta">Plan Your Escape</a>\s*</div>'
    $newCta = '<div class="nav-side right">
                <a href="plan-escape.html" class="nav-cta hidden md:block">Plan Your Escape</a>
                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="lg:hidden text-white/80 hover:text-white p-2 ml-2 transition-colors">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>'
    $content = $content -replace $ctaPattern, $newCta

    # 4. Add mobile menu overlay before </body>
    if ($content -notmatch 'id="mobile-menu"') {
        $overlay = '    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[2000] bg-[#080b10]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 opacity-0 pointer-events-none transition-all duration-300">
        <button id="mobile-menu-close" class="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <i data-lucide="x" class="w-8 h-8"></i>
        </button>
        
        <a href="index.html" class="text-2xl font-bold text-white hover:text-primary transition-colors">The Experience</a>
        <a href="our-way.html" class="text-2xl font-bold text-white hover:text-primary transition-colors">Our Way</a>
        <a href="signature-journeys.html" class="text-2xl font-bold text-white hover:text-primary transition-colors">Signature Journeys</a>
        <a href="sri-lanka-edit.html" class="text-2xl font-bold text-white hover:text-primary transition-colors">The Sri Lanka Edit</a>
        <a href="plan-escape.html" class="bg-primary text-secondary font-bold px-8 py-3 rounded-full mt-4">Plan Your Escape</a>
    </div>

    <script>
        // Mobile Menu Logic
        const menuBtn = document.getElementById(''mobile-menu-btn'');
        const menuClose = document.getElementById(''mobile-menu-close'');
        const mobileMenu = document.getElementById(''mobile-menu'');

        if (menuBtn && mobileMenu) {
            menuBtn.onclick = () => {
                mobileMenu.classList.remove(''opacity-0'', ''pointer-events-none'');
                mobileMenu.classList.add(''opacity-100'');
            };
        }

        if (menuClose && mobileMenu) {
            menuClose.onclick = () => {
                mobileMenu.classList.add(''opacity-0'', ''pointer-events-none'');
                mobileMenu.classList.remove(''opacity-100'');
            };
        }

        mobileMenu.querySelectorAll(''a'').forEach(link => {
            link.onclick = () => {
                mobileMenu.classList.add(''opacity-0'', ''pointer-events-none'');
                mobileMenu.classList.remove(''opacity-100'');
            };
        });
    </script>
</body>'
        $content = $content -replace '</body>', $overlay
    }

    $content | Set-Content $file.FullName
}
