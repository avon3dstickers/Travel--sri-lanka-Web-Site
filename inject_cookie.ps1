$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }
$scriptTag = "<script src=`"cookie-consent.js`"></script>`n</body>"

foreach ($file in $files) {
    if ($file.Name -match "admin") {
        continue
    }
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Avoid injecting multiple times
    if ($content -notmatch 'cookie-consent\.js') {
        $content = $content -replace "</body>", $scriptTag
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name)"
    } else {
        Write-Host "Skipped $($file.Name), already injected."
    }
}
Write-Host "Done!"
