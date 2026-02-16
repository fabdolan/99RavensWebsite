// Data Structures from copy.md - COMPLETE CONTENT
const submenuData = {
    experts: {
        number: '01',
        title: 'For Experts',
        subtitle: 'The talent agency for marketing experts and their AI.',
        desc: "The marketing world extracts your expertise. Software eats scraps of your thinking. Employers claim your IP. Platforms train on your data. We are the antidote. We don't just broker deals; we package brilliance. We help you build, sell, and protect your expertise as a scalable asset.",
        indexTitle: 'Services',
        items: [
            { 
                key: 'platform', 
                title: 'We are your Platform.', 
                desc: 'We provide the enterprise-grade AI stack and the ex-Google product team to build your "Strategic Signature" into working software. Zero up-front cost.' 
            },
            { 
                key: 'agent', 
                title: 'We are your Agent.', 
                desc: 'We handle the business; you handle the strategy. We negotiate software licensing, secure advisory retainers, and manage your speaking and personal brand.' 
            },
            { 
                key: 'moat', 
                title: 'We are your Moat.', 
                desc: 'The only model where you truly own your strategic work. We provide the legal framework to guarantee 100% ownership of your ideas, frameworks, data, and AI agents.' 
            }
        ],
        cta: 'Apply for Representation'
    },
    brands: {
        number: '02',
        title: 'For Brands',
        subtitle: 'Expert humans delivering strategy and software.',
        desc: "The traditional agency model is broken: you pay for hours, get junior talent, and receive static PowerPoints. We offer a new delivery model. Access the world's top 1% of strategic minds— work with them directly and access their personal suite of AI applications.",
        indexTitle: 'Solutions',
        items: [
            { 
                key: 'licensing', 
                title: 'Expert AI Licensing', 
                desc: 'License AI agents and workflows built by world-class marketing CMOs, Creatives, and Strategists. Scale their expert-level methodologies for briefing, planning, and creative instantly across your teams.' 
            },
            { 
                key: 'advisory', 
                title: 'Human Advisory', 
                desc: 'Direct engagements with our roster of C-suite experts for high-level direction, governance, and complex problem solving.' 
            },
            { 
                key: 'hybrid', 
                title: 'Hybrid Execution', 
                desc: 'The ultimate force multiplier. Our experts set the vision; we design proprietary AI agents so you can execute the workflows. Speed without sacrificing strategic depth.' 
            },
            { 
                key: 'custom', 
                title: 'Custom Architecture', 
                desc: "Work with our product team and experts to build your own AI agents—custom infrastructure trained on your brand's specific data and strategy." 
            }
        ],
        cta: 'Work with us'
    },
    builders: {
        number: '03',
        title: 'For Builders',
        subtitle: 'Build on the stack expert marketers use.',
        desc: "Giving everyone Copilot isn't a strategic investment; it's a dependency. Don't force your team to use generic AI. Build your own proprietary agents using the same enterprise-grade platform we use to power the world's top marketers. Because we are expert marketers, we know how to build AI that actually delivers high-quality strategic thinking.",
        indexTitle: 'Offerings',
        items: [
            { 
                key: 'platform-licensing', 
                title: 'Flexible Platform Licensing', 
                desc: 'Deploy the 99Ravens expert stack where you need it. Available as a managed SaaS solution, deployed in your private cloud (VPC), or integrated directly into Gemini for Enterprise.' 
            },
            { 
                key: 'ai-ops', 
                title: 'Managed AI Ops', 
                desc: 'We handle the technical lifecycle. From building and testing to deploying and maintaining, we ensure your internal marketing AI is always operational and up-to-date.' 
            },
            { 
                key: 'custom-building', 
                title: 'Custom Agent Building', 
                desc: 'We capture your organization\'s tribal wisdom and tacit knowledge, transforming your unique "way of working" into proprietary AI agents that think like your best people.' 
            },
            { 
                key: 'change-management', 
                title: 'Training & Change Management', 
                desc: "We don't just ship code; we train your marketers to work with AI. A full program to ensure adoption, trust, and workflow integration." 
            }
        ],
        cta: 'Book a technical consultation'
    }
};

const contentData = {
    'about': {
        title: 'About Us',
        headline: 'Software is worthless.<br>Expertise is everything.',
        tagline: 'Software is worthless. Expertise is everything.',
        footerText: 'The entire software industry isn\'t built to serve experts—it\'s built to extract from them. Employers want to own their knowledge. Platforms want to use it for training data. So we built the antidote.',
        content: `
            <div class="letter">
                <p>After 12 years leading marketing teams at Google, I left with one core belief: as big tech commoditized execution, strategy was the only thing left that mattered.</p>
                <p>So I started a company to build "Grammarly for strategy." We followed the classic SaaS playbook: raise money, build an AI platform, and sell it to marketers.</p>
                <p>It failed. Miserably.</p>
                <p>No one could agree on what "good" strategy from the AI looked like. We spent our time iterating UI/UX and pricing models while our potential customers made one thing clear: they didn't want another piece of software.</p>
                <p>So I stopped building. I interviewed dozens of senior marketers, and in every conversation, I saw it: a unique "strategic signature." A collection of distinct perspectives, experiences, and frameworks that defined how they thought.</p>
                <p>On a hunch, we tried something new. We asked the AI to mimic these strategic signatures. The responses got exponentially better.</p>
                <p>That's when the first insight hit me: software is worthless. Expertise is everything. We could build better AI if we focused on converting unwritten human expertise into software.</p>
                <p>But we hit another wall. The smartest experts asked the questions that mattered: "Who owns this once it's codified? What are you training your platform on? Who is looking out for my interests?"</p>
                <p>Then it truly clicked. The entire software industry isn't built to serve experts—it's built to extract from them. Employers want to own their knowledge. Platforms want to use it for training data.</p>
                <p>So we built something different.</p>
                <p>99Ravens is the first intellectual talent agency for the AI age. We help CMOs, Executive Creatives and Strategists capture their thinking, codify their philosophy, and—with the help of AI—monetize their knowledge in ways that weren't possible before.</p>
                <p>We give experts the tools to build, but more importantly, we provide the model for them to own it.</p>
                <div class="letter-signature">
                    <img src="/public/Fab Dolan.png" alt="Fab Dolan signature" class="signature-img">
                    <p class="signature-name"><a href="https://ca.linkedin.com/in/fabdolancmo" target="_blank" rel="noopener" class="founder-link">Fab Dolan</a></p>
                    <p class="signature-title">Founder, 99Ravens</p>
                </div>
            </div>
        `
    },
    'contact': {
        title: 'Contact',
        headline: 'Real intelligence.',
        tagline: 'Get in touch',
        footerText: 'Software is nothing without human expertise. Contact us to build, license, or hire the expertise you need.',
        content: `
            <div class="contact-emails">
            <h3>General Inquiries</h3>
                <p><a href="mailto:hello@99ravens.ai" class="text-link">hello@99ravens.ai</a></p>
                <h3>Expert Representation</h3>
                <p><a href="mailto:representation@99ravens.ai" class="text-link">representation@99ravens.ai</a></p>
                <h3>Enterprise Licensing</h3>
                <p><a href="mailto:licensing@99ravens.ai" class="text-link">licensing@99ravens.ai</a></p>
            </div>
            
            <div class="office-locations">
                <h3>Network</h3>
                
                <div class="constellation-map">
                    <svg viewBox="0 0 300 200" class="map-constellation">
                        <!-- Connection lines - network -->
                        <line class="constellation-line" x1="60" y1="70" x2="240" y2="50" />
                        <line class="constellation-line" x1="240" y1="50" x2="90" y2="140" />
                        <line class="constellation-line" x1="90" y1="140" x2="60" y2="70" />
                        <line class="constellation-line" x1="200" y1="80" x2="240" y2="50" />
                        <line class="constellation-line" x1="200" y1="80" x2="60" y2="70" />
                        <line class="constellation-line" x1="200" y1="80" x2="90" y2="140" />
                        
                        <!-- San Francisco node -->
                        <g class="constellation-node" data-city="sf">
                            <circle class="node-pulse" cx="60" cy="70" r="12" />
                            <circle class="node-core" cx="60" cy="70" r="4" />
                            <text class="node-label" x="60" y="95">SF</text>
                        </g>
                        
                        <!-- Toronto node -->
                        <g class="constellation-node" data-city="to">
                            <circle class="node-pulse" cx="240" cy="50" r="12" />
                            <circle class="node-core" cx="240" cy="50" r="4" />
                            <text class="node-label" x="240" y="35">TO</text>
                        </g>
                        
                        <!-- Waterloo node -->
                        <g class="constellation-node" data-city="wl">
                            <circle class="node-pulse" cx="200" cy="80" r="12" />
                            <circle class="node-core" cx="200" cy="80" r="4" />
                            <text class="node-label" x="200" y="105">WL</text>
                        </g>
                        
                        <!-- Los Angeles node -->
                        <g class="constellation-node" data-city="la">
                            <circle class="node-pulse" cx="90" cy="140" r="12" />
                            <circle class="node-core" cx="90" cy="140" r="4" />
                            <text class="node-label" x="90" y="165">LA</text>
                        </g>
                        
                        <!-- Coordinate annotations -->
                        <text class="coord-text" x="60" y="55">37.77°N</text>
                        <text class="coord-text" x="240" y="70">43.65°N</text>
                        <text class="coord-text" x="200" y="65">43.46°N</text>
                        <text class="coord-text" x="110" y="140">34.05°N</text>
                    </svg>
                </div>
                
                <div class="city-list">
                    <div class="city-item">
                        <span class="city-name">San Francisco</span>
                        <span class="city-detail">Engineering Office</span>
                    </div>
                    <div class="city-item">
                        <span class="city-name">Waterloo</span>
                        <span class="city-detail">Engineering Office</span>
                    </div>
                    <div class="city-item">
                        <span class="city-name">Los Angeles</span>
                        <span class="city-detail">Creative Studio</span>
                    </div>
                    <div class="city-item">
                        <span class="city-name">Toronto</span>
                        <span class="city-detail">International</span>
                    </div>
                </div>
            </div>
        `
    }
};

// DOM Elements
const body = document.body;
const intro = document.getElementById('intro');
const introVideo = document.getElementById('intro-video');
const siteWrapper = document.getElementById('site-wrapper');
const logoBtn = document.getElementById('logo-btn');
const menuToggle = document.getElementById('menu-toggle');
const navOverlay = document.getElementById('nav-overlay');

// Section Elements
const sectionLayer = document.getElementById('section-layer');
const sectionGrid = document.getElementById('section-grid');

// Detail Panel Elements
const detailPanel = document.getElementById('detail-panel');
const panelContent = document.getElementById('panel-content');

// Navigation Arrows
const navArrowPrev = document.getElementById('nav-arrow-prev');
const navArrowNext = document.getElementById('nav-arrow-next');

// Triggers
const navItems = document.querySelectorAll('.nav-item');
const overlayLinks = document.querySelectorAll('.overlay-link');
const secondaryLinks = document.querySelectorAll('.secondary-link');

// Notification Strip Elements
const notificationStrip = document.getElementById('notification-strip');
const notificationClose = document.getElementById('notification-close');
const notificationLink = document.getElementById('notification-link');

// Fetch latest post from Substack via Vercel serverless proxy (/api/latest-post)
// Falls back to generic Substack link if fetch fails (e.g. local dev without Vercel)
async function fetchLatestSubstackPost() {
    try {
        const res = await fetch('/api/latest-post');
        if (!res.ok) throw new Error('Feed fetch failed');
        const data = await res.json();
        if (notificationLink && data.title) {
            notificationLink.textContent = data.title;
            notificationLink.href = data.url;
        }
    } catch (e) {
        // Fallback — generic link to Substack
        if (notificationLink) {
            notificationLink.textContent = 'Read the latest from X Becomes Software';
            notificationLink.href = 'https://fabdolan.substack.com';
        }
    }
}

// Notification Strip Logic
function showNotificationStrip() {
    if (notificationStrip) {
        fetchLatestSubstackPost();
        setTimeout(() => {
            notificationStrip.classList.add('visible');
            document.body.classList.add('has-notification');
        }, 800);
    }
}

function dismissNotificationStrip() {
    if (notificationStrip) {
        notificationStrip.classList.add('dismissed');
        document.body.classList.remove('has-notification');
    }
}

if (notificationClose) {
    notificationClose.addEventListener('click', dismissNotificationStrip);
}

// Email subjects for each section CTA
const ctaEmailSubjects = {
    experts: 'Expert Representation Inquiry',
    brands: 'Brand Partnership Inquiry',
    builders: 'Technical Consultation Inquiry'
};

// State
let hasEntered = false;
let heroAnimated = false;
let currentSectionIndex = 0;
const sectionOrder = ['experts', 'brands', 'builders'];

// Check if mobile device
const isMobile = window.innerWidth <= 768;

// Check if user is navigating from within the same site (e.g. Resources page)
const isInternalNav = document.referrer && new URL(document.referrer).origin === window.location.origin;

// Init - show intro video on first visit, skip if navigating internally or on mobile
if (isMobile || isInternalNav) {
    intro.classList.add('hidden');
    siteWrapper.classList.add('visible');
    hasEntered = true;
    setTimeout(animateHero, 100);
    showNotificationStrip();
    // Handle URL routing after site is visible
    setTimeout(handleInitialRoute, 200);
}

// Intro Handler - smooth transition to main site
function enterSite() {
    if (hasEntered) return;
    hasEntered = true;
    
    // Smooth fade out intro
    intro.classList.add('hidden');
    
    // Stagger the reveal of main content
    setTimeout(() => {
        siteWrapper.classList.add('visible');
        // Start hero animation after site is visible
        setTimeout(animateHero, 400);
        // Handle URL routing after animations
        setTimeout(handleInitialRoute, 600);
        // Show notification strip after site loads
        setTimeout(showNotificationStrip, 1000);
    }, 400);
}

// Listen for video end
if (introVideo) {
    introVideo.addEventListener('ended', enterSite);
    // Fallback: if video fails to load, enter after 2 seconds
    introVideo.addEventListener('error', () => setTimeout(enterSite, 500));
}

// Skip button for faster entry
const introSkip = document.getElementById('intro-skip');
if (introSkip) {
    introSkip.addEventListener('click', enterSite);
}

// Contrarian word reveal animation - words emerge with intention
function animateHero() {
    if (heroAnimated) return;
    heroAnimated = true;
    
    const heroLines = document.querySelectorAll('.hero-line');
    let globalWordIndex = 0;
    const baseDelay = 50; // ms between words
    
    heroLines.forEach((line, lineIndex) => {
        const text = line.textContent.trim();
        const words = text.split(/\s+/);
        line.innerHTML = '';
        
        words.forEach((word, wordIndex) => {
            const wordWrapper = document.createElement('span');
            wordWrapper.className = 'word';
            
            const wordInner = document.createElement('span');
            wordInner.className = 'word-inner';
            wordInner.textContent = word;
            // Add staggered delay based on global word position
            wordInner.style.transitionDelay = `${globalWordIndex * baseDelay}ms`;
            
            wordWrapper.appendChild(wordInner);
            line.appendChild(wordWrapper);
            
            if (wordIndex < words.length - 1) {
                const space = document.createElement('span');
                space.innerHTML = '&nbsp;';
                line.appendChild(space);
            }
            
            globalWordIndex++;
        });
    });
    
    // Trigger all reveals after DOM is ready
    requestAnimationFrame(() => {
        document.querySelectorAll('.hero-line .word-inner').forEach(inner => {
            inner.classList.add('revealed');
        });
    });
}

// Navigation Logic
function openSection(sectionId, updateHistory = true) {
    const data = submenuData[sectionId];
    if (!data) return;
    
    // Track current section index
    currentSectionIndex = sectionOrder.indexOf(sectionId);
    updateNavArrows();
    
    // Generate the new radical layout
    let contentHTML = `
        <div class="section-left">
            <div class="section-label">
                <span class="section-number">${data.number}</span>
                <span class="section-title">${data.title.toUpperCase()}</span>
            </div>

            <div class="section-statement">
                <h1 class="section-subtitle">${data.subtitle}</h1>
            </div>

            <div class="section-footer">
                <div class="section-rule"></div>
                <p class="section-desc">${data.desc}</p>
                <button class="section-cta">${data.cta}</button>
            </div>
        </div>

        <div class="section-right">
            <div class="index-header">${data.indexTitle || 'Services'}</div>
    `;

    data.items.forEach((item, i) => {
        const activeClass = i === 0 ? ' active' : '';
        contentHTML += `
            <div class="index-item${activeClass}" data-index="${i}">
                <span class="index-num">0${i + 1}</span>
                <div class="index-title">${item.title}</div>
                <div class="index-desc">${item.desc}</div>
            </div>
        `;
    });

    contentHTML += `
        </div>
    `;

    sectionGrid.innerHTML = contentHTML;
    
    // Add click handlers to toggle active state
    const indexItems = sectionGrid.querySelectorAll('.index-item');
    indexItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            indexItems.forEach(i => i.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');
        });
    });
    
    // Wire up CTA button to send email
    const ctaBtn = sectionGrid.querySelector('.section-cta');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            const subject = ctaEmailSubjects[sectionId] || 'Inquiry';
            window.location.href = `mailto:hello@99ravens.ai?subject=${encodeURIComponent(subject)}`;
        });
    }
    
    // Show Page Layer
    body.classList.add('page-open');
    navOverlay.classList.remove('active');
    
    // Update URL
    const urlMap = { experts: '/experts', brands: '/brands', builders: '/builders' };
    const seoKeyMap = { experts: 'experts', brands: 'brands', builders: 'builders' };
    if (updateHistory !== false) {
        history.pushState({ page: 'section', section: sectionId }, '', urlMap[sectionId] || `/${sectionId}`);
    }
    
    // Update SEO
    if (window.updatePageSEO) updatePageSEO(seoKeyMap[sectionId] || sectionId);
}

function updateNavArrows() {
    navArrowPrev.disabled = currentSectionIndex === 0;
    navArrowNext.disabled = currentSectionIndex === sectionOrder.length - 1;
}

function goToPrevSection() {
    if (currentSectionIndex > 0) {
        openSection(sectionOrder[currentSectionIndex - 1]);
    }
}

function goToNextSection() {
    if (currentSectionIndex < sectionOrder.length - 1) {
        openSection(sectionOrder[currentSectionIndex + 1]);
    }
}

function resetToHome(updateHistory = true) {
    body.classList.remove('page-open');
    navOverlay.classList.remove('active');
    detailPanel.classList.remove('active');
    
    // Update URL to home
    if (updateHistory) {
        history.pushState({ page: 'home' }, '', '/');
    }
    
    // Update SEO
    if (window.updatePageSEO) updatePageSEO('home');
}

function toggleMenu() {
    navOverlay.classList.toggle('active');
}

function openDetail(contentKey, updateHistory = true) {
    const data = contentData[contentKey];
    if (!data) return;
    
    // Update URL
    if (updateHistory) {
        history.pushState({ page: 'detail', content: contentKey }, '', `/${contentKey}`);
    }
    
    // Update SEO
    if (window.updatePageSEO) updatePageSEO(contentKey);
    
    panelContent.innerHTML = `
        <div class="panel-left">
            <button class="panel-left-header panel-home-btn" onclick="goToMainPage()">
                <img src="/public/logos/24006_99Ravens_Logo_black_FA.png" alt="99Ravens" class="panel-logo">
            </button>
            <div class="panel-hero">
                <h2>${data.headline || data.title}</h2>
            </div>
            <div class="panel-left-footer">
                <p>${data.footerText || data.tagline}</p>
            </div>
        </div>
        <div class="panel-right">
            <div class="panel-right-header">
                <button class="panel-close" onclick="closeDetail()">
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div class="panel-right-content">
        ${data.content}
            </div>
        </div>
    `;
    detailPanel.classList.add('active');
}

function goToMainPage() {
    resetToHome(true);
}

window.goToMainPage = goToMainPage;

function closeDetail(updateHistory = true) {
    detailPanel.classList.remove('active');
    if (updateHistory) {
        history.pushState({ page: 'home' }, '', '/');
    }
}

// Make closeDetail available globally for onclick
window.closeDetail = closeDetail;

// ========================================
// URL ROUTING
// ========================================

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    const state = event.state;
    
    if (!state || state.page === 'home') {
        resetToHome(false);
    } else if (state.page === 'section' && state.section) {
        openSection(state.section, false);
    } else if (state.page === 'detail' && state.content) {
        openDetail(state.content, false);
    }
});

// Check URL on page load and navigate to correct page
function handleInitialRoute() {
    const path = window.location.pathname.toLowerCase();
    
    // Map URL paths to sections/content
    const routeMap = {
        '/experts': { type: 'section', id: 'experts' },
        '/brands': { type: 'section', id: 'brands' },
        '/builders': { type: 'section', id: 'builders' },
        '/about': { type: 'detail', id: 'about' },
        '/contact': { type: 'detail', id: 'contact' },
    };
    
    const route = routeMap[path];
    
    if (route) {
        // Replace current history state (don't add new entry)
        if (route.type === 'section') {
            history.replaceState({ page: 'section', section: route.id }, '', path);
            // Delay to ensure intro animation completes if needed
            setTimeout(() => openSection(route.id, false), hasEntered ? 100 : 1500);
        } else if (route.type === 'detail') {
            history.replaceState({ page: 'detail', content: route.id }, '', path);
            setTimeout(() => openDetail(route.id, false), hasEntered ? 100 : 1500);
        }
    } else if (path !== '/' && path !== '' && !path.startsWith('/resources/') && !path.startsWith('/blog-cms/')) {
        // Unknown route (old WordPress pages, etc.) - redirect to home
        // But allow /resources/ and /blog-cms/ paths to load their own pages
        history.replaceState({ page: 'home' }, '', '/');
        // Ensure page is in home state
        setTimeout(() => resetToHome(false), hasEntered ? 100 : 1500);
    } else if (path.startsWith('/resources/') || path.startsWith('/blog-cms/')) {
        // These paths have their own HTML files, don't interfere
        return;
    } else {
        // Home page
        history.replaceState({ page: 'home' }, '', '/');
    }
}

// Event Listeners
navItems.forEach(item => {
    item.addEventListener('click', () => {
        openSection(item.dataset.section);
    });
});

overlayLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Handle section links
        if (link.dataset.section) {
            e.preventDefault();
            openSection(link.dataset.section);
        } 
        // Handle content links (About/Contact)
        else if (link.dataset.content) {
            e.preventDefault();
            navOverlay.classList.remove('active');
            openDetail(link.dataset.content);
        }
        // Handle external links (like Sign in) - redirect explicitly
        else if (link.href && link.href.startsWith('http')) {
            window.location.href = link.href;
        }
    });
});

secondaryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Only handle links with data-content attribute (About, Contact)
        // Let regular links (Resources) navigate normally
        if (link.dataset.content) {
            e.preventDefault();
            openDetail(link.dataset.content);
        }
    });
});

logoBtn.addEventListener('click', resetToHome);
menuToggle.addEventListener('click', toggleMenu);

const overlayClose = document.getElementById('overlay-close');
if (overlayClose) {
    overlayClose.addEventListener('click', toggleMenu);
}

// Handle secondary links inside gold overlay
document.querySelectorAll('.overlay-link-secondary').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.dataset.content) {
            e.preventDefault();
            navOverlay.classList.remove('active');
            openDetail(link.dataset.content);
        }
    });
});

navArrowPrev.addEventListener('click', goToPrevSection);
navArrowNext.addEventListener('click', goToNextSection);

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (detailPanel.classList.contains('active')) closeDetail();
        else if (navOverlay.classList.contains('active')) toggleMenu();
        else if (body.classList.contains('page-open')) resetToHome();
    }
    // Enter key to enter site
    if (e.key === 'Enter' && !hasEntered && introSkip) {
        introSkip.click();
    }
    // Arrow keys for section navigation
    if (body.classList.contains('page-open') && !detailPanel.classList.contains('active')) {
        if (e.key === 'ArrowLeft') goToPrevSection();
        if (e.key === 'ArrowRight') goToNextSection();
    }
});
