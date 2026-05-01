$dir = "F:\Web Design\Tuskerways\web templates\2"
$files = Get-ChildItem -Path $dir -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

# The dropdown replacement block (same indentation style as Our Way / Signature Journeys)
$dropdown = @'
<li class="nav-dropdown">
                    <a href="sri-lanka-edit.html">The Sri Lanka Edit <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6,9 12,15 18,9"/></svg></a>
                    <div class="nav-dropdown-menu">
                        <div class="nav-dropdown-inner">
                            <a href="sri-lanka-edit.html" style="display:flex;align-items:center;gap:8px;"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>Sri Lanka Edit</a>
                            <a href="travel-tips.html" style="display:flex;align-items:center;gap:8px;"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Travel Tips &amp; Advice</a>
                        </div>
                    </div>
                </li>
'@

$count = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $original = $content

    # Pattern 1: plain link (most pages)
    $p1 = '<li><a href="sri-lanka-edit.html">The Sri Lanka Edit</a></li>'
    # Pattern 2: with teal style (e.g. travel-tips.html where it was "active")
    $p2 = '<li><a href="sri-lanka-edit.html" style="color:#00c2a8">The Sri Lanka Edit</a></li>'

    if ($content.Contains($p1)) {
        $content = $content.Replace($p1, $dropdown.Trim())
    }
    if ($content.Contains($p2)) {
        $content = $content.Replace($p2, $dropdown.Trim())
    }

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($file.Name)"
        $count++
    }
}

Write-Host ""
Write-Host "Done! $count file(s) updated."
