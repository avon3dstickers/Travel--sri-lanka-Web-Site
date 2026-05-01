$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

foreach ($file in $files) {
    if ($file.Name -match "admin") {
        continue
    }
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace the dark gray icons with lighter ones so they are visible on dark bg
    $content = $content -replace 'class="w-5 h-5 text-gray-500 group-hover:text-white"', 'class="w-5 h-5 text-white/80 group-hover:text-white"'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated $($file.Name)"
}
Write-Host "Done!"
