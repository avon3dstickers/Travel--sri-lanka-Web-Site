$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

foreach ($file in $files) {
    if ($file.Name -match "admin") {
        continue
    }
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # regex match for href="#" class="...">Terms</a>
    $content = $content -replace 'href="#"([^>]+)>Terms</a>', 'href="terms.html"$1>Terms</a>'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed $($file.Name)"
}
Write-Host "Done!"
