$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

foreach ($file in $files) {
    if ($file.Name -match "admin") {
        continue
    }
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Use robust regex to remove the elements completely with optional surrounding whitespace
    $content = $content -replace '(?i)\s*<a href="[^"]*" class="[^"]*">Privacy</a>', ''
    $content = $content -replace '(?i)\s*<a href="[^"]*" class="[^"]*">\s*Responsible Travel\s*</a>', ''
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Removed links from $($file.Name)"
}
Write-Host "Done!"
