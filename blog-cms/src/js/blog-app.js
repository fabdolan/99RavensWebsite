// Blog App — v3 List View
class BlogApp {
    constructor() {
        this.currentFilter = 'all';
        this.allPosts = [...blogData.posts].filter(p => p.status === 'published');
        this.filteredPosts = [...this.allPosts];
        this.init();
    }

    getPostUrl(slug) {
        return `/resources/blogs/${slug}/`;
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

        // Filter posts
        if (category === 'all') {
            this.filteredPosts = [...this.allPosts];
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
                window.location.href = this.getPostUrl(slug);
            });
        });
    }

    createPostItem(post, index) {
        const num = String(index + 1).padStart(2, '0');
        const categoryName = this.getCategoryName(post.category);
        const formattedDate = this.formatDateShort(post.publishedAt);

        return `
            <div class="blog-post-item" data-slug="${post.slug}">
                <span class="blog-post-num">${num}</span>
                <div class="blog-post-body">
                    <div class="blog-post-meta-row">
                        <span class="blog-post-date">${formattedDate}</span>
                        <span class="blog-post-category">${categoryName}</span>
                    </div>
                    <div class="blog-post-title">${post.title}</div>
                    <div class="blog-post-summary">${post.excerpt}</div>
                    <div class="blog-post-author">${post.author} · ${post.readTime} min read</div>
                </div>
            </div>
        `;
    }

    updateFilterCount() {
        const countEl = document.getElementById('filterCount');
        if (countEl) {
            const count = this.filteredPosts.length;
            countEl.textContent = `${count} article${count !== 1 ? 's' : ''}`;
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
