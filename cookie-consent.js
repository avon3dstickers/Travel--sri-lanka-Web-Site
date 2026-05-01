document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tusker_cookie_consent")) return;

    const banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.className = "fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-transform duration-700 ease-out translate-y-full shadow-[0_-15px_40px_rgba(0,0,0,0.6)] border-t border-white/5";
    banner.style.backgroundColor = "#121212";
    
    banner.innerHTML = `
        <div class="text-white text-xs md:text-sm max-w-5xl opacity-90 leading-relaxed text-center sm:text-left flex-1 font-sans">
            We use cookies to elevate your browsing experience, offer personalized tours, and analyze traffic to ensure the highest standard of luxury travel. By clicking "Accept", you agree to our use of cookies.
        </div>
        <div class="flex-shrink-0">
            <button id="cookie-accept-btn" class="px-8 py-2.5 rounded-full font-bold text-[#080b10] uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(0,209,178,0.3)] hover:scale-105 transition-transform whitespace-nowrap" style="background-color: #00D1B2;">
                Accept
            </button>
        </div>
    `;

    document.body.appendChild(banner);

    // Trigger slide up animation shortly after load
    setTimeout(() => {
        banner.classList.remove("translate-y-full");
        banner.classList.add("translate-y-0");
    }, 800);

    document.getElementById("cookie-accept-btn").addEventListener("click", () => {
        localStorage.setItem("tusker_cookie_consent", "true");
        // Slide down animation to hide
        banner.classList.remove("translate-y-0");
        banner.classList.add("translate-y-full");
        setTimeout(() => {
            banner.remove();
        }, 700);
    });
});
