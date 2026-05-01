/* Floating Hub Javascript */

(function() {
    // 1. Inject CSS if not already present
    if (!document.getElementById('floating-hub-style')) {
        const link = document.createElement('link');
        link.id = 'floating-hub-style';
        link.rel = 'stylesheet';
        link.href = 'floating-hub.css';
        document.head.appendChild(link);
    }

    // 2. Inject HTML
    const hubHtml = `
        <!-- Floating Hub -->
        <div class="float-hub" id="floatHub">
            <div class="bot-greeting-hub" id="botGreeting">May I help with your mission?</div>
            <div class="float-main-btn" id="hubToggle">
                <i data-lucide="message-circle" class="w-8 h-8"></i>
            </div>
            <div class="float-menu">
                <a href="https://wa.me/94711503252" target="_blank" class="float-item float-item-wa" title="WhatsApp">
                    <i data-lucide="message-circle" class="w-6 h-6"></i>
                    <span class="float-item-label">WhatsApp Chat</span>
                </a>
                <div class="float-item float-item-assist" id="botEntry" title="AI Guide">
                    <i data-lucide="sparkles" class="w-6 h-6"></i>
                    <span class="float-item-label">Tusker Guide AI</span>
                </div>
            </div>
        </div>

        <!-- Back to Top -->
        <div class="float-top-btn" id="topBtn">
            <div class="float-top-btn-text">Top</div>
        </div>

        <!-- Bot Window -->
        <div class="bot-window" id="hubBotWindow">
            <div class="bot-header">
                <div class="bot-title">
                    <i data-lucide="sparkles" class="w-5 h-5"></i>
                    Tusker Guide AI
                </div>
                <p style="font-size: 10px; opacity: 0.8; margin-top: 4px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px;">Orbital Support Active</p>
            </div>
            <div class="bot-chat-area" id="hubBotChatArea">
                <div class="msg-bot">
                    Ayubowan! I'm your Tusker Guide. How can I assist with your Sri Lankan mission today?
                    <div class="bot-options">
                        <div class="bot-opt" onclick="handleHubBotOption('itinerary')">Suggest an Itinerary</div>
                        <div class="bot-opt" onclick="handleHubBotOption('expert')">Talk to a Travel Expert</div>
                        <div class="bot-opt" onclick="handleHubBotOption('plan')">Plan My Escape</div>
                    </div>
                </div>
            </div>
            <div class="bot-input-area">
                <input type="text" id="botUserInput" placeholder="Ask me anything..." autocomplete="off" />
                <button id="botSendBtn"><i data-lucide="send" class="w-5 h-5"></i></button>
            </div>
        </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = hubHtml;
    document.body.appendChild(container);

    // 3. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 4. Hub Logic
    const hubToggle = document.getElementById('hubToggle');
    const floatHub = document.getElementById('floatHub');
    const botEntry = document.getElementById('botEntry');
    const hubBotWindow = document.getElementById('hubBotWindow');
    const topBtn = document.getElementById('topBtn');
    const botChatArea = document.getElementById('hubBotChatArea');
    const botUserInput = document.getElementById('botUserInput');
    const botSendBtn = document.getElementById('botSendBtn');

    hubToggle.onclick = (e) => {
        e.stopPropagation();
        floatHub.classList.toggle('active');
        hubToggle.classList.toggle('active');
    };

    botEntry.onclick = (e) => {
        e.stopPropagation();
        hubBotWindow.classList.toggle('active');
        floatHub.classList.remove('active');
        hubToggle.classList.remove('active');
        botUserInput.focus();
    };

    // Chat Execution
    function handleChatSend() {
        const text = botUserInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        botUserInput.value = '';
        
        // Bot Typing Indicator
        const typing = document.createElement('div');
        typing.className = 'bot-typing';
        typing.innerText = 'Tusker Guide is thinking...';
        botChatArea.appendChild(typing);
        botChatArea.scrollTop = botChatArea.scrollHeight;

        setTimeout(() => {
            typing.remove();
            const response = getSmartResponse(text);
            addHubBotMessage(response);
        }, 1200);
    }

    botSendBtn.onclick = handleChatSend;
    botUserInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
    });

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'msg-user';
        msg.innerText = text;
        botChatArea.appendChild(msg);
        botChatArea.scrollTop = botChatArea.scrollHeight;
    }

    function getSmartResponse(input) {
        const low = input.toLowerCase();
        
        // Contact & Support Keywords
        if (low.includes('contact') || low.includes('phone') || low.includes('call') || low.includes('whatsapp') || low.includes('talk') || low.includes('reach')) {
            return "You can reach our mission control directly: <br><b>WhatsApp/Call:</b> +94 71 150 3252 <br>We're available 24/7 for our travelers.";
        }
        if (low.includes('email') || low.includes('mail')) {
            return "For formal inquiries or documentation, email us at: <br><b>info@tuskerways.com</b> <br>or <b>tuskerwaysinfo@gmail.com</b>.";
        }
        if (low.includes('address') || low.includes('location') || low.includes('office') || low.includes('where')) {
            return "Our primary presence is in <b>Colombo, Sri Lanka</b>, but our curators are active across the entire island. We don't have a public walk-in office as we prefer meeting you at the start of your journey!";
        }

        // Travel Keywords
        if (low.includes('hello') || low.includes('hi') || low.includes('ayubowan')) return "Ayubowan! I'm here to help you navigate the magic of Sri Lanka. What's on your mind?";
        if (low.includes('itinerary') || low.includes('plan')) return "I can certainly help with that. Our <b>Signature Journeys</b> are a great start, or we can build a 100% bespoke orbit together. Shall we look at the journeys?";
        if (low.includes('price') || low.includes('cost') || low.includes('budget')) return "Our experiences are tailored to your preferences, ranging from boutique comfort to absolute ultra-luxury. For a specific quote, initialize the <b>Plan Your Escape</b> mission.";
        if (low.includes('weather') || low.includes('time to visit') || low.includes('when')) return "Sri Lanka is a year-round destination! Each month has its highlights. Our 'The Sri Lanka Edit' page has a full month-by-month guide. Would you like to see it?";
        if (low.includes('hotel') || low.includes('stay') || low.includes('resort')) return "We work with the island's most soulful boutique villas and iconic luxury resorts like Aman and Resplendent Ceylon. What kind of vibe are you looking for?";
        if (low.includes('beach') || low.includes('ocean') || low.includes('surf')) return "The South coast (Mirissa, Hiriketiya) is vibrant right now, while the East coast (Arugam Bay) shines later in the year. Do you prefer active surfing or tranquil sands?";
        if (low.includes('sigiriya') || low.includes('kandy') || low.includes('ella')) return "Excellent choices. These constitute the 'Golden Core' of the island. We have specialized missions for all these locations.";
        
        return "That sounds like an interesting mission! To give you the best expert advice, I recommend connecting with our Lead Curator via WhatsApp. Should I establish a link?";
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (floatHub && !floatHub.contains(e.target)) {
            floatHub.classList.remove('active');
            hubToggle.classList.remove('active');
        }
        if (hubBotWindow && !hubBotWindow.contains(e.target) && !botEntry.contains(e.target)) {
            hubBotWindow.classList.remove('active');
        }
    });

    // 5. TOP Button Logic
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    topBtn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 6. Bot Logic Functions (Global for onclick)
    window.handleHubBotOption = function(type) {
        let response = '';
        if (type === 'itinerary') {
            response = "For an epic mission, I suggest: <b>The Golden Core</b> (Sigiriya → Kandy → Ella → Galle). Would you like to view our Signature Journeys?";
            addHubBotMessage(response, 'signature-journeys.html', 'View Journeys →');
        } else if (type === 'plan') {
            response = "Ready to build your bespoke orbit? Let's initialize the Plan Your Escape module.";
            addHubBotMessage(response, 'plan-escape.html', 'Plan My Escape →');
        } else if (type === 'expert') {
            response = "Establishing a direct link to a Tusker Specialist via WhatsApp... Opening secure channel.";
            addHubBotMessage(response);
            setTimeout(() => window.open('https://wa.me/94711503252', '_blank'), 1500);
        }
    };

    function addHubBotMessage(text, link = '', linkText = '') {
        const chatArea = document.getElementById('hubBotChatArea');
        const msg = document.createElement('div');
        msg.className = 'msg-bot';
        msg.style.marginTop = '10px';
        msg.innerHTML = text;
        if (link) {
            msg.innerHTML += `<br><a href="${link}" class="inline-block mt-2 text-primary font-bold hover:underline" style="color: #00c2a8; text-decoration: none;">${linkText}</a>`;
        }
        chatArea.appendChild(msg);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    // Show initial greeting after delay
    setTimeout(() => {
        const greeting = document.getElementById('botGreeting');
        if (greeting && !hubBotWindow.classList.contains('active')) {
            greeting.style.opacity = '1';
            greeting.style.visibility = 'visible';
            greeting.style.transform = 'translateY(-50%) translateX(0)';
            setTimeout(() => {
                greeting.style.opacity = '0';
                greeting.style.visibility = 'hidden';
                greeting.style.transform = 'translateY(-50%) translateX(20px)';
            }, 6000);
        }
    }, 4000);

})();
