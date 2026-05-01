$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

$oldBadges = '(?s)<div class="flex gap-(?:6|8|10) items-center pt-(?:2|8) (?:border-t border-white/5 mt-8 )?opacity-(?:60|70|90|100)">.*?</div>'
$newBadges = @"
                    <div class="flex gap-10 items-center pt-8 border-t border-white/5 mt-8 opacity-100">
                        <a href="#" class="hover:scale-105 transition-all duration-300">
                            <img src="images/tourist.png" alt="Tourist" class="h-16 md:h-24 w-auto mix-blend-multiply brightness-110 contrast-110">
                        </a>
                        <a href="https://www.tripadvisor.com" target="_blank" class="hover:scale-105 transition-all duration-300">
                            <img src="images/tripadvisor.png" alt="TripAdvisor" class="h-16 md:h-24 w-auto mix-blend-multiply brightness-110 contrast-110">
                        </a>
                    </div>
"@

foreach ($file in $files) {
    if ($file.Name -match "admin") { continue }
    $content = Get-Content -Path $file.FullName -Raw
    
    if ($content -match $oldBadges) {
        $content = [regex]::Replace($content, $oldBadges, $newBadges)
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name) to HERO size"
    }
}
Write-Host "Final Global Logo Scaling Complete!"
