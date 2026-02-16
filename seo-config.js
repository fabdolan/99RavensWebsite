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
            title: '99Ravens | Expert Knowledge Becomes AI',
            description: 'We turn expert knowledge into AI. We work with senior practitioners to codify their tacit knowledge into AI tools they own \u2014 then bring that methodology to enterprises and release what we learn as open source.',
            keywords: 'expert knowledge, tacit knowledge, expertise codification, Strategic Signature, AI agents, expertise systems, knowledge infrastructure, open source AI, expert AI, marketing AI',
            image: 'https://99ravens.agency/public/og-image.png'
        },

        // FOR EXPERTS
        experts: {
            title: '99Ravens | Codify What You Know. Own What You Build.',
            description: '99Ravens works 1:1 with senior practitioners to codify their Strategic Signature into AI tools they own. We build it, you own it, we represent you.',
            keywords: 'expert representation, Strategic Signature, expertise codification, AI tools, intellectual property, knowledge monetization',
            image: 'https://99ravens.agency/public/og-image.png'
        },

        // FOR ENTERPRISES
        enterprises: {
            title: '99Ravens | Expertise Systems Built on Your Organization\u2019s Knowledge',
            description: 'The AI quality gap is expert knowledge. We bring a rigorous methodology for codifying tacit knowledge into working software \u2014 training, consulting, and custom builds on your stack.',
            keywords: 'expertise systems, tacit knowledge, enterprise AI, knowledge codification, AI consulting, custom AI development',
            image: 'https://99ravens.agency/public/og-image.png'
        },

        // FOR DEVELOPERS
        developers: {
            title: '99Ravens | Open Source Tools for Expertise Codification',
            description: 'An open source agent orchestration platform purpose-built for expertise systems. Fork the same stack we use with expert knowledge workers.',
            keywords: 'open source AI, agent orchestration, expertise systems, AI platform, AI development, developer tools',
            image: 'https://99ravens.agency/public/og-image.png'
        },

        // ABOUT
        about: {
            title: '99Ravens | Expertise is Everything.',
            description: 'The story of 99Ravens \u2014 how a failed SaaS platform led to a methodology for turning expert knowledge into AI.',
            keywords: '99Ravens about, Fab Dolan, expertise codification, AI age, expert knowledge, Google marketing',
            ogTitle: '99Ravens | Expertise is Everything.',
            image: 'https://99ravens.agency/public/og-image.png'
        },

        // CONTACT
        contact: {
            title: '99Ravens | Get in Touch',
            description: 'Apply for expert representation, explore enterprise engagements, or talk to our team about building expertise systems.',
            keywords: '99Ravens contact, expert representation inquiry, enterprise engagement, expertise systems',
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

