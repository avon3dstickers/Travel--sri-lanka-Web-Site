$files = Get-ChildItem -Filter "*.html"
$waPattern = '(?s)<!-- WhatsApp Button -->.*?</a>'
$scriptTag = '    <!-- Floating Hub -->
    <script src="floating-hub.js"></script>'

foreach ($file in $files) {
    if ($file.Name -eq "admin.html") { continue } # Skip admin
    
    $content = Get-Content $file.FullName -Raw
    
    # Remove old WhatsApp if exists
    if ($content -match $waPattern) {
        $content = $content -replace $waPattern, ""
    }
    
    # Check if already injected
    if ($content -notmatch "floating-hub\.js") {
        # Inject before cookie-consent or before </body>
        if ($content -match '<script src="cookie-consent\.js"></script>') {
            $content = $content -replace '<script src="cookie-consent\.js"></script>', "$scriptTag`n    <script src=""cookie-consent.js""></script>"
        } else {
            $content = $content -replace '</body>', "$scriptTag`n</body>"
        }
        $content | Set-Content $file.FullName
        Write-Host "Updated $($file.Name)"
    }
}
