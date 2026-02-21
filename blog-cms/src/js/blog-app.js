// Blog App — v3 List View
class BlogApp {
    constructor() {
        this.currentFilter = 'all';
        this.allPosts = [...blogData.posts].filter(p => p.status === 'published');
        this.filteredPosts = [...this.allPosts];
        this.init();
    }

    getPostUrl(post) {
        if (post.type === 'case-study') {
            return `/resources/case-studies/${post.slug}/`;
        } else if (post.type === 'white-paper') {
            return `/resources/white-papers/${post.slug}/`;
        }
        return `/resources/blogs/${post.slug}/`;
    }

    init() {
        this.setupEventListeners();
        this.renderBlogList();
        this.updateFilterCount();
    }

    setupEventListeners() {
        // Filter tags
        const filterTags = document.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                this.handleFilterChange(e.target.dataset.category);
            });
        });

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
    }

    handleFilterChange(category) {
        this.currentFilter = category;

        // Update active tag
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
            if (tag.dataset.category === category) {
                tag.classList.add('active');
            }
        });

        // Filter posts — type-level filters use the `type` field, category filters use `category`
        if (category === 'all') {
            this.filteredPosts = [...this.allPosts];
        } else if (category === 'white-papers') {
            this.filteredPosts = this.allPosts.filter(post => post.type === 'white-paper');
        } else if (category === 'newsletter') {
            this.filteredPosts = this.allPosts.filter(post => post.type === 'newsletter' || post.substack === true);
        } else {
            this.filteredPosts = this.allPosts.filter(post => post.category === category);
        }

        this.renderBlogList();
        this.updateFilterCount();
    }

    renderBlogList() {
        const container = document.getElementById('blogList');
        if (!container) return;

        if (this.filteredPosts.length === 0) {
            container.innerHTML = `
                <div style="padding: 4rem 0; text-align: center; color: var(--text-muted);">
                    <p style="font-family: var(--font-mono); font-size: 0.85rem;">No articles found in this category.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredPosts.map((post, index) => this.createPostItem(post, index)).join('');

        // Add click handlers
        container.querySelectorAll('.blog-post-item').forEach(item => {
            item.addEventListener('click', () => {
                const slug = item.dataset.slug;
                const type = item.dataset.type;
                const post = { slug, type };
                window.location.href = this.getPostUrl(post);
            });
        });
    }

    createPostItem(post, index) {
        const num = String(index + 1).padStart(2, '0');
        const categoryName = this.getCategoryName(post.category);
        const formattedDate = this.formatDateShort(post.publishedAt);
        const typeBadge = this.getTypeBadge(post.type);

        return `
            <div class="blog-post-item" data-slug="${post.slug}" data-type="${post.type || 'article'}">
                <span class="blog-post-num">${num}</span>
                <div class="blog-post-body">
                    <div class="blog-post-meta-row">
                        <span class="blog-post-date">${formattedDate}</span>
                        <span class="blog-post-category">${categoryName}</span>
                        ${typeBadge}
                    </div>
                    <div class="blog-post-title">${post.title}</div>
                    <div class="blog-post-summary">${post.excerpt}</div>
                    <div class="blog-post-author">${post.author} · ${post.readTime} min read</div>
                </div>
            </div>
        `;
    }

    getTypeBadge(type) {
        if (!type || type === 'article') return '';
        const badges = {
            'case-study':  { label: 'Case Study',  bg: '#F66302', color: '#FFFFFF', border: 'none' },
            'white-paper': { label: 'White Paper', bg: '#000000', color: '#FFFFFF', border: 'none' },
            'newsletter':  { label: 'Newsletter',  bg: '#D2D0BD', color: '#1A1A1A', border: '1px solid rgba(26,26,26,0.3)' }
        };
        const b = badges[type];
        if (!b) return '';
        return `<span class="content-type-badge" style="background:${b.bg};color:${b.color};border:${b.border}">${b.label}</span>`;
    }

    updateFilterCount() {
        const countEl = document.getElementById('filterCount');
        if (countEl) {
            const count = this.filteredPosts.length;
            countEl.textContent = `${count} item${count !== 1 ? 's' : ''}`;
        }
    }

    getCategoryName(categoryId) {
        const category = blogData.categories.find(cat => cat.id === categoryId);
        return category ? category.name : categoryId;
    }

    formatDateShort(dateString) {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BlogApp();
});
