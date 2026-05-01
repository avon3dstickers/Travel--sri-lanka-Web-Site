$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

foreach ($file in $files) {
    if ($file.Name -match "admin") {
        continue
    }
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Simple regex replace
    $content = $content -replace "Tusker\s*Ways\s*<span class=`"text-primary`">Luxury Travel</span>", "Tusker Ways<br><span class=`"text-primary`">Luxury Travel</span>"
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated $($file.Name)"
}
Write-Host "Done!"
