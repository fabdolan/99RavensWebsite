// Post Page — v3 Article View
class PostPage {
    constructor() {
        this.post = null;
        this.init();
    }

    getPostUrl(slug) {
        return `/resources/blogs/${slug}/`;
    }

    init() {
        this.loadPost();
        this.setupEventListeners();
    }

    loadPost() {
        const path = window.location.pathname;
        const matches = path.match(/\/resources\/blogs\/([^\/]+)\/?/);
        let slug = matches ? matches[1] : null;

        if (!slug) {
            const urlParams = new URLSearchParams(window.location.search);
            slug = urlParams.get('slug');
        }

        if (!slug) {
            const pathParts = path.split('/').filter(p => p);
            if (pathParts.length >= 3 && pathParts[0] === 'resources' && pathParts[1] === 'blogs') {
                slug = pathParts[2];
            }
        }

        if (!slug) {
            this.showError('Post not found');
            return;
        }

        this.post = blogData.posts.find(p => p.slug === slug);

        if (!this.post) {
            this.showError('Post not found');
            return;
        }

        this.renderArticleHero();
        this.renderArticleBody();
        this.renderRelatedPosts();
        this.updateMetaTags();
    }

    renderArticleHero() {
        const container = document.getElementById('articleHero');
        if (!container) return;

        const categoryName = this.getCategoryName(this.post.category);
        const formattedDate = this.formatDate(this.post.publishedAt);
        const initials = this.getInitials(this.post.author);

        container.innerHTML = `
            <div class="article-hero-inner">
                <a href="/resources/blogs/" class="article-back">&larr; Back to Resources</a>
                <div class="article-meta-top">
                    <span class="article-category">${categoryName}</span>
                    <span class="article-date">${formattedDate}</span>
                </div>
                <h1>${this.post.title}</h1>
                <div class="article-byline">
                    <div class="author-avatar">${initials}</div>
                    <div class="author-info">
                        <span class="author-name">${this.post.author}</span>
                        <span class="author-role">${this.post.authorTitle || ''}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderArticleBody() {
        const container = document.getElementById('articleContent');
        if (!container) return;

        container.innerHTML = this.post.content;
    }

    renderRelatedPosts() {
        const container = document.getElementById('relatedPosts');
        if (!container) return;

        const relatedPosts = blogData.posts
            .filter(p => p.category === this.post.category && p.slug !== this.post.slug && p.status === 'published')
            .slice(0, 3);

        if (relatedPosts.length === 0) {
            container.style.display = 'none';
            return;
        }

        // Get the index of each related post in the full list
        const allPublished = blogData.posts.filter(p => p.status === 'published');

        container.innerHTML = `
            <div class="related-label">Continue Reading</div>
            ${relatedPosts.map(post => {
                const idx = allPublished.indexOf(post);
                const num = String(idx + 1).padStart(2, '0');
                return `
                    <a href="${this.getPostUrl(post.slug)}" class="related-item">
                        <span class="related-num">${num}</span>
                        <span class="related-title">${post.title}</span>
                    </a>
                `;
            }).join('')}
        `;
    }

    updateMetaTags() {
        document.title = `${this.post.title} | 99Ravens`;

        const pageDescription = document.getElementById('pageDescription');
        const ogTitle = document.getElementById('ogTitle');
        const ogDescription = document.getElementById('ogDescription');
        const ogImage = document.getElementById('ogImage');
        const publishedTime = document.getElementById('publishedTime');
        const description = this.post.metaDescription || this.post.excerpt || '';

        if (pageDescription) pageDescription.setAttribute('content', description);
        if (ogTitle) ogTitle.setAttribute('content', this.post.title);
        if (ogDescription) ogDescription.setAttribute('content', description);
        if (ogImage && this.post.image) ogImage.setAttribute('content', this.post.image);
        if (publishedTime) publishedTime.setAttribute('content', this.post.publishedAt);
    }

    setupEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navOverlay = document.getElementById('nav-overlay');

        const overlayClose = document.getElementById('overlay-close');

        if (menuToggle && navOverlay) {
            menuToggle.addEventListener('click', () => {
                navOverlay.classList.toggle('active');
            });
            if (overlayClose) {
                overlayClose.addEventListener('click', () => {
                    navOverlay.classList.remove('active');
                });
            }
            document.addEventListener('click', (e) => {
                if (!navOverlay.contains(e.target) && !menuToggle.contains(e.target)) {
                    navOverlay.classList.remove('active');
                }
            });
        }

        // Share buttons
        const shareTwitter = document.getElementById('shareTwitter');
        const shareLinkedIn = document.getElementById('shareLinkedIn');
        const shareCopy = document.getElementById('shareCopy');

        if (shareTwitter) shareTwitter.addEventListener('click', () => this.shareOnTwitter());
        if (shareLinkedIn) shareLinkedIn.addEventListener('click', () => this.shareOnLinkedIn());
        if (shareCopy) shareCopy.addEventListener('click', () => this.copyLink());
    }

    shareOnTwitter() {
        if (!this.post) return;
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(this.post.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }

    shareOnLinkedIn() {
        if (!this.post) return;
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }

    copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const shareCopy = document.getElementById('shareCopy');
            if (shareCopy) {
                const originalTitle = shareCopy.getAttribute('title');
                shareCopy.setAttribute('title', 'Copied!');
                shareCopy.style.borderColor = 'var(--accent-orange)';
                setTimeout(() => {
                    shareCopy.setAttribute('title', originalTitle);
                    shareCopy.style.borderColor = '';
                }, 2000);
            }
        });
    }

    showError(message) {
        const heroContainer = document.getElementById('articleHero');
        const contentContainer = document.getElementById('articleContent');
        const relatedContainer = document.getElementById('relatedPosts');

        if (heroContainer) {
            heroContainer.innerHTML = `
                <div class="article-hero-inner">
                    <a href="/resources/blogs/" class="article-back">&larr; Back to Resources</a>
                    <h1>${message}</h1>
                </div>
            `;
        }
        if (contentContainer) {
            contentContainer.innerHTML = `
                <p>The article you're looking for doesn't exist or has been removed.</p>
                <p><a href="/resources/blogs/" style="color: var(--accent-orange);">Return to Resources</a></p>
            `;
        }
        if (relatedContainer) relatedContainer.style.display = 'none';
    }

    getCategoryName(categoryId) {
        const category = blogData.categories.find(cat => cat.id === categoryId);
        return category ? category.name : categoryId;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PostPage();
});
