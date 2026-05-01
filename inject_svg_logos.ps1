$wa = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><path fill="#25D366" d="M60,10A50,50,0,0,0,16.51,84.62L10,110l25.86-6.4A50,50,0,1,0,60,10Z"/><path fill="#ffffff" d="M82.8,72.4c-1.3-3.6-7.8-6.9-10.4-8-2.6-1.1-4.5-1.7-6.4,1.1s-7.4,9.1-9.1,11-5.1,2.1-7.7.8a30.84,30.84,0,0,1-13.6-11.8c-2.3-3.9-1.2-5.4,1-7.6,3.6-3.6,5.3-6.5,7.9-10,.9-1.3,1.3-3,.4-4.8s-6.4-15.4-8.7-21.1c-2.3-5.6-4.5-5.6-6.4-5.6s-3.7-.2-5.7-.2a10.94,10.94,0,0,0-7.9,3.7A29.7,29.7,0,0,0,21,43.2c0,11.2,7.7,22,8.8,23.5,1.1,1.5,15.8,25.2,39.3,34.4,15.8,6.2,21.8,6.2,26,5.2,5.2-1.2,16.2-6.6,18.5-13S94.9,80.1,93.6,78.8Z"/></svg>'

$ta = '<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="50" fill="#34E0A1" /><g transform="translate(25, 35) scale(0.15)"><path fill="#000000" d="M115.8 245.9c0-18.7 15.1-33.8 33.8-33.8s33.8 15.1 33.8 33.8-15.1 33.8-33.8 33.8-33.8-15.1-33.8-33.8m148.8 0c0-18.7 15.1-33.8 33.8-33.8s33.8 15.1 33.8 33.8-15.1 33.8-33.8 33.8-33.8-15.1-33.8-33.8m37.8-124c-20.9-14-41.3-21.4-61.9-22.1V51.7c0-1.8-1.5-3.3-3.3-3.3h-25.9c-1.8 0-3.3 1.5-3.3 3.3v48c-20.4 .7-41 8.2-61.9 22.1-43.1 28.5-70.1 63.3-80.4 103.5H35.4c-8.9 0-14.7 9.5-10.7 17.5L50.4 295c10.4 20.8 24.3 37.8 41 50.4 28 21.2 61 31.8 100.9 31.8 15-22.4 26.5-44.1 31.8-49.8 5.3 5.7 16.8 27.4 31.8 49.8 39.8 0 72.8-10.6 100.9-31.8 16.7-12.6 30.6-29.6 41-50.4l25.7-52.2c4-8 .9-17.5-8-17.5h-29.9c-10.3-40.2-37.3-75-80.4-103.5M149.6 313.4c-37.3 0-67.6-30.3-67.6-67.6s30.3-67.6 67.6-67.6c37.3 0 67.6 30.3 67.6 67.6s-30.3 67.6-67.6 67.6m148.8 0c-37.3 0-67.6-30.3-67.6-67.6s30.3-67.6 67.6-67.6c37.3 0 67.6 30.3 67.6 67.6s-30.3 67.6-67.6 67.6"/></g><text x="60" y="140" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="18" fill="#ffffff" text-anchor="middle">Tripadvisor</text></svg>'

$tr = '<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="15" width="90" height="90" rx="30" fill="#00c2a8" /><circle cx="60" cy="60" r="24" fill="#ffffff" /><polygon points="60,45 67,60 60,75 53,60" fill="#00c2a8" transform="rotate(45 60 60)" /><text x="60" y="140" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5">tourist</text></svg>'

Set-Content -Path "images\whatsapp.svg" -Value $wa
Set-Content -Path "images\tripadvisor.svg" -Value $ta
Set-Content -Path "images\tourist.svg" -Value $tr

$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

$oldBadges = '(?s)<div class="flex gap-(?:6|8|10) items-center pt-(?:2|8) (?:border-t border-white/5 mt-8 )?opacity-[0-9]+">.*?</div>'
$newBadges = @"
                    <div class="flex gap-16 items-center pt-8 border-t border-white/5 mt-8">
                        <a href="#" class="hover:scale-105 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,194,168,0.3)]">
                            <img src="images/tourist.svg" alt="Tourist" class="h-16 md:h-24 w-auto">
                        </a>
                        <a href="https://www.tripadvisor.com" target="_blank" class="hover:scale-105 transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,194,168,0.3)]">
                            <img src="images/tripadvisor.svg" alt="TripAdvisor" class="h-16 md:h-24 w-auto">
                        </a>
                    </div>
"@

foreach ($file in $files) {
    if ($file.Name -match "admin") { continue }
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace whatsapp PNG with SVG
    $content = $content -replace 'whatsapp.png', 'whatsapp.svg'
    
    if ($content -match $oldBadges) {
        $content = [regex]::Replace($content, $oldBadges, $newBadges)
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Replaced with pure SVG in $($file.Name)"
    }
}
Write-Host "Done SVG replacement!"
