$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

foreach ($file in $files) {
    if ($file.Name -match "admin") {
        continue
    }
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace the placeholder link with actual terms.html link
    $content = $content -replace 'href="#">Terms</a>', 'href="terms.html">Terms</a>'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated $($file.Name)"
}
Write-Host "Done!"
