// ========================================
// SEO CONFIGURATION
// Edit this file to update SEO for all pages
// ========================================

const SEO_CONFIG = {
    
    // Default/fallback values
    siteName: '99Ravens',
    siteUrl: 'https://99ravens.agency',
    defaultImage: 'https://99ravens.agency/public/og-image.png',
    twitterHandle: '@99ravens',
    
    // ========================================
    // PAGE-SPECIFIC SEO
    // ========================================
    
    pages: {
        
        // HOME PAGE
        home: {
            title: '99Ravens | Hire Expert Marketers & License their Enterprise-grade AI',
            description: "The world's first talent agency for the AI age. Hire top Chief Marketers, Strategists and Creatives, or license their verified, expert-trained AI agents.",
            keywords: 'AI talent agency, marketing experts, CMO, fractional executive, AI agents, expert AI, marketing AI, enterprise AI',
            image: 'https://99ravens.agency/public/og-image.png'
        },
        
        // FOR EXPERTS
        experts: {
            title: '99Ravens | The Talent Agency for Marketing Experts',
            description: 'We represent expert CMOs, Creatives and Strategists. We help you build Personal AI, represent you for consulting and software licensing deals, and protect your intellectual property.',
            keywords: 'expert representation, CMO talent agency, strategist representation, AI expertise, intellectual property, knowledge monetization',
            image: 'https://99ravens.agency/public/og-image.png'
        },
        
        // FOR BRANDS
        brands: {
            title: '99Ravens | Hire Expert Marketers & License Their AI',
            description: 'Hire fractional CMOs and Strategists to lead your team, or license their custom AI agents to upgrade your own marketing stack.',
            keywords: 'expert AI licensing, marketing strategy, fractional CMO, AI marketing agents, brand strategy, executive advisory',
            image: 'https://99ravens.agency/public/og-image.png'
        },
        
        // FOR BUILDERS
        builders: {
            title: '99Ravens | The Enterprise Marketing AI Platform The Experts Use',
            description: 'The only agent orchestration platform built for expert marketers. License the platform to build your own custom agents, or deploy our pre-trained expert AIs out-of-the-box.',
            keywords: 'AI platform, enterprise AI, marketing AI infrastructure, custom AI agents, AI ops, AI development, agent orchestration',
            image: 'https://99ravens.agency/public/og-image.png'
        },
        
        // ABOUT
        about: {
            title: '99Ravens | Software is Worthless. Expertise is Everything.',
            description: 'The Story of 99Ravens: Why We Built the Talent Agency For Expert Marketers.',
            keywords: '99Ravens about, Fab Dolan, intellectual talent agency, AI age, expert monetization, Google marketing',
            ogTitle: 'The Story of 99Ravens: Why We Built the Talent Agency For Expert Marketers',
            image: 'https://99ravens.agency/public/og-image.png'
        },
        
        // CONTACT
        contact: {
            title: '99Ravens | Contact 99Ravens',
            description: 'Apply for representation as an expert, or book a consultation to discuss consulting and licensing of one of our experts.',
            keywords: '99Ravens contact, expert representation inquiry, AI licensing contact, marketing consultation',
            image: 'https://99ravens.agency/public/og-image.png'
        },
    }
};

// ========================================
// SEO UPDATE FUNCTION
// Called automatically when routes change
// ========================================

function updatePageSEO(pageKey) {
    const config = SEO_CONFIG.pages[pageKey] || SEO_CONFIG.pages.home;
    
    // Update title
    document.title = config.title;
    
    // Update meta tags
    updateMetaTag('name', 'title', config.title);
    updateMetaTag('name', 'description', config.description);
    updateMetaTag('name', 'keywords', config.keywords);
    
    // Update Open Graph
    updateMetaTag('property', 'og:title', config.ogTitle || config.title);
    updateMetaTag('property', 'og:description', config.description);
    updateMetaTag('property', 'og:image', config.image || SEO_CONFIG.defaultImage);
    updateMetaTag('property', 'og:url', `${SEO_CONFIG.siteUrl}/${pageKey === 'home' ? '' : pageKey}`);
    
    // Update Twitter
    updateMetaTag('name', 'twitter:title', config.title);
    updateMetaTag('name', 'twitter:description', config.description);
    updateMetaTag('name', 'twitter:image', config.image || SEO_CONFIG.defaultImage);
    
    // Update canonical URL
    const canonicalUrl = `${SEO_CONFIG.siteUrl}/${pageKey === 'home' ? '' : pageKey}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        canonical.href = canonicalUrl;
    }
}

function updateMetaTag(attr, key, value) {
    let meta = document.querySelector(`meta[${attr}="${key}"]`);
    if (meta) {
        meta.setAttribute('content', value);
    }
}

// Export for use in script.js
window.updatePageSEO = updatePageSEO;
window.SEO_CONFIG = SEO_CONFIG;

