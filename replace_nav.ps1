$newNav = @"
    <style>
        /* Shared Nav Styles injected from index.html */
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: center; }
        .nav-inner { width: 100%; max-width: 1100px; display: flex; align-items: center; justify-content: space-between; background: rgba(8, 11, 16, .82); border: 1px solid rgba(255, 255, 255, 0.07); backdrop-filter: blur(24px); border-radius: 100px; padding: .5rem 1rem .5rem 0.6rem; }
        .nav-logo { display: flex; align-items: center; text-decoration: none; }
        .nav-logo img { height: 40px; width: auto; }
        .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; padding: 0; margin: 0; }
        .nav-links a { text-decoration: none; font-family: 'Outfit', sans-serif; font-size: .65rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: rgba(255, 255, 255, 0.52); transition: all 0.3s; white-space: nowrap; display: flex; align-items: center; gap: 6px; padding: 0.5rem 0; }
        .nav-links a:hover { color: #fff; }
        .nav-cta { text-decoration: none; font-family: 'Outfit', sans-serif; font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #080b10; background: #00c2a8; padding: .6rem 1.4rem; border-radius: 100px; white-space: nowrap; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0, 194, 168, 0.2); }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0, 194, 168, 0.3); }
        .nav-dropdown { position: relative; }
        .nav-dropdown-menu { position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(10px); min-width: 200px; padding-top: 15px; opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1); z-index: 1001; }
        .nav-dropdown:hover .nav-dropdown-menu { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
        .nav-dropdown-inner { background: #000; border: 1px solid var(--border, rgba(255,255,255,0.07)); border-radius: 16px; padding: .6rem 0; backdrop-filter: blur(20px); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .nav-dropdown-inner a { display: block; padding: .65rem 1.25rem; font-size: .65rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(255, 255, 255, 0.52); text-decoration: none; }
        .nav-dropdown-inner a:hover { color: #fff; background: rgba(255, 255, 255, 0.05); }
        @media(max-width:960px) { .nav-links { display: none; } }
    </style>
    <nav>
        <div class="nav-inner">
            <div class="nav-side">
                <a href="index.html" class="nav-logo"><img src="logo.png" alt="Tusker Ways"></a>
            </div>
            
            <ul class="nav-links">
                <li><a href="index.html">The Experience</a></li>
                <li><a href="our-way.html">Our Way</a></li>
                <li class="nav-dropdown">
                    <a href="signature-journeys.html">Signature Journeys <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6,9 12,15 18,9" /></svg></a>
                    <div class="nav-dropdown-menu">
                        <div class="nav-dropdown-inner">
                            <a href="daily-escapes.html">Daily Escapes</a>
                            <a href="grand-escapes.html">Grand Escapes</a>
                        </div>
                    </div>
                </li>
                <li><a href="sri-lanka-edit.html">The Sri Lanka Edit</a></li>
            </ul>

            <div class="nav-side right">
                <a href="plan-escape.html" class="nav-cta">Plan Your Escape</a>
            </div>
        </div>
    </nav>
"@

$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -notin "admin.html", "index.html" }

foreach ($file in $files) {
    if ($file.Name -match "admin") {
        continue
    }
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Simple regex replace
    $content = $content -replace "(?s)<nav>.*?</nav>", $newNav
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated $($file.Name)"
}
Write-Host "Done!"
