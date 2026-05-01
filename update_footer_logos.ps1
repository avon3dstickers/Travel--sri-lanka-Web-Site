$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "admin.html" }

# Clean blocks for replacement
$whatsappHtml = @"
                        <a href="https://wa.me/94711503252" target="_blank"
                            class="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center hover:bg-[#25D366] hover:scale-110 transition-all border border-[#25D366]/20 group">
                            <img src="images/whatsapp.png" alt="WhatsApp" class="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all">
                        </a>
"@

$badgesHtml = @"
                    <div class="flex gap-8 items-center pt-8 border-t border-white/5 mt-8 opacity-70">
                        <a href="#" class="hover:opacity-100 hover:scale-105 transition-all duration-300">
                            <img src="images/tourist.png" alt="Tourist" class="h-11 md:h-14 w-auto drop-shadow-[0_0_10px_rgba(0,194,168,0.15)]">
                        </a>
                        <a href="https://www.tripadvisor.com" target="_blank" class="hover:opacity-100 hover:scale-105 transition-all duration-300">
                            <img src="images/tripadvisor.png" alt="TripAdvisor" class="h-11 md:h-14 w-auto drop-shadow-[0_0_10px_rgba(0,194,168,0.15)]">
                        </a>
                    </div>
"@

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # skip if already updated
    if ($content -like "*whatsapp.png*") { continue }

    # Find the Facebook block end
    $fbRef = 'facebook.com/people/Tusker-Ways/61552265249288/'
    if ($content.Contains($fbRef)) {
        # Find the end of this anchor tag
        $startIndex = $content.IndexOf($fbRef)
        $endAnchorIndex = $content.IndexOf("</a>", $startIndex) + 4
        
        $content = $content.Insert($endAnchorIndex, "`n$whatsappHtml")
        
        # Now find the end of the flex gap-4 div to insert badges
        $flexIndex = $content.IndexOf("<div class=""flex gap-4"">")
        $flexEndIndex = $content.IndexOf("</div>", $flexIndex) + 6
        
        $content = $content.Insert($flexEndIndex, "`n$badgesHtml")
        
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name)"
    }
}
Write-Host "Footer Update Complete!"
