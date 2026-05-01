$files = Get-ChildItem -Filter "tour-*.html"
$navScript = '    <!-- Tour Navigation -->
    <script src="tour-navigation.js"></script>'
$navStyle = '    <link rel="stylesheet" href="tour-navigation.css">'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Inject CSS in head
    if ($content -notmatch "tour-navigation\.css") {
        $content = $content -replace '</head>', "$navStyle`n</head>"
    }
    
    # Inject JS before </body> or before cookie-consent
    if ($content -notmatch "tour-navigation\.js") {
        if ($content -match '<script src="cookie-consent\.js"></script>') {
            $content = $content -replace '<script src="cookie-consent\.js"></script>', "$navScript`n    <script src=""cookie-consent.js""></script>"
        } else {
            $content = $content -replace '</body>', "$navScript`n</body>"
        }
    }
    
    $content | Set-Content $file.FullName
    Write-Host "Updated $($file.Name)"
}
