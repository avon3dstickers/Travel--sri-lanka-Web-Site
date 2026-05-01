$source = "our-way.html"
$dest = "terms.html"

# Copy the file
Copy-Item $source $dest -Force

# Read content
$content = Get-Content $dest -Raw

# Prepare new content
$newContent = @"
</nav>

<header class="hero" style="min-height:40vh; display:flex; align-items:flex-end; padding-bottom:4rem; padding-top:8rem;">
    <div class="rv text-center mx-auto" style="max-width:800px;">
        <h1 class="hero-title" style="font-size:3.5rem;">Terms & Conditions</h1>
        <p class="hero-sub" style="margin-top:1rem; text-align:center; max-width:100%;">Last updated: January 2026. Please read our terms carefully before planning your escape.</p>
    </div>
</header>

<section class="max-w-4xl mx-auto py-16 px-6 relative z-10 w-full mb-20">
    <div class="rv bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-sm text-gray-300 leading-relaxed font-light text-sm md:text-base space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        <div>
            <h3 class="text-xl font-display text-white mb-4 font-bold tracking-wide">1. Acceptance of Terms</h3>
            <p>By accessing our website and utilizing our travel planning services, you agree to be bound by these Terms & Conditions. Tusker Ways reserves the right to update or modify these terms at any time without prior notice.</p>
        </div>

        <div>
            <h3 class="text-xl font-display text-white mb-4 font-bold tracking-wide">2. Booking and Payments</h3>
            <p>A non-refundable deposit of 30% is strictly required at the time of booking to secure your curated journey and luxury accommodations. The remaining balance must be settled no later than 45 days prior to your arrival in Sri Lanka. Failure to pay the balance on time may result in cancellation of your itinerary.</p>
        </div>

        <div>
            <h3 class="text-xl font-display text-white mb-4 font-bold tracking-wide">3. Cancellations & Refunds</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400 mt-2">
                <li><strong class="text-white">60+ days prior to arrival:</strong> 50% refund of the deposit.</li>
                <li><strong class="text-white">45-59 days prior to arrival:</strong> Loss of full deposit.</li>
                <li><strong class="text-white">Less than 45 days prior:</strong> No refund will be issued.</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-display text-white mb-4 font-bold tracking-wide">4. Changes to Itinerary</h3>
            <p>Tusker Ways curates highly personalized journeys. While we make every effort to adhere to the agreed-upon blueprint, unforeseen circumstances (e.g., severe weather, unexpected local closures) may require us to alter the sequence or specific locations of your tour. In such events, we will always substitute with an alternative of equal or higher luxury standard.</p>
        </div>

        <div>
            <h3 class="text-xl font-display text-white mb-4 font-bold tracking-wide">5. Travel Insurance</h3>
            <p>Comprehensive travel insurance is absolutely mandatory for all guests. You must ensure your policy covers medical expenses, emergency evacuations, trip cancellations, and adventure activities (e.g., wildlife safaris, surfing).</p>
        </div>

        <div>
            <h3 class="text-xl font-display text-white mb-4 font-bold tracking-wide">6. Limitation of Liability</h3>
            <p>Tusker Ways acts as an agent connecting you with world-class local partners. We are not liable for any personal injury, property damage, or loss incurred during your stay at any provided accommodation or during any curated activity.</p>
        </div>
        
    </div>
</section>

<!-- Footer -->
"@

# Regex replace everything between </nav> and <!-- Footer -->
$content = $content -replace "(?s)</nav>.*?<!-- Footer -->", $newContent

Set-Content $dest $content -NoNewline
Write-Host "terms.html created successfully."
