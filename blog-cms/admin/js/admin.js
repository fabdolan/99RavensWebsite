// Admin Panel - JavaScript functionality
class AdminPanel {
    constructor() {
        this.posts = [...blogData.posts];
        this.filteredPosts = [...this.posts];
        this.editingPostId = null;
        this.deletePostId = null;
        this.init();
    }

    init() {
        this.updateStats();
        this.renderPosts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // New Post button
        document.getElementById('newPostBtn').addEventListener('click', () => {
            this.openEditor();
        });

        // Filter changes
        document.getElementById('statusFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('categoryFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('searchFilter').addEventListener('input', () => this.applyFilters());

        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());

        // Modal controls
        document.getElementById('modalBackdrop').addEventListener('click', () => this.closeEditor());
        document.getElementById('modalClose').addEventListener('click', () => this.closeEditor());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeEditor());

        // Editor form
        document.getElementById('editorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePost();
        });

        // Auto-generate slug from title
        document.getElementById('postTitle').addEventListener('input', (e) => {
            if (!this.editingPostId) {
                const slug = this.generateSlug(e.target.value);
                document.getElementById('postSlug').value = slug;
            }
        });

        // Delete modal controls
        document.getElementById('deleteBackdrop').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('deleteModalClose').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('deleteCancelBtn').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('deleteConfirmBtn').addEventListener('click', () => this.confirmDelete());
    }

    updateStats() {
        const total = this.posts.length;
        const published = this.posts.filter(p => p.status === 'published').length;
        const drafts = this.posts.filter(p => p.status === 'draft').length;

        document.getElementById('totalPosts').textContent = total;
        document.getElementById('publishedPosts').textContent = published;
        document.getElementById('draftPosts').textContent = drafts;
    }

    applyFilters() {
        const statusFilter = document.getElementById('statusFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;
        const searchFilter = document.getElementById('searchFilter').value.toLowerCase();

        this.filteredPosts = this.posts.filter(post => {
            // Status filter
            if (statusFilter !== 'all' && post.status !== statusFilter) {
                return false;
            }

            // Category filter
            if (categoryFilter !== 'all' && post.category !== categoryFilter) {
                return false;
            }

            // Search filter
            if (searchFilter && !post.title.toLowerCase().includes(searchFilter)) {
                return false;
            }

            return true;
        });

        this.renderPosts();
    }

    renderPosts() {
        const container = document.getElementById('postsList');

        if (this.filteredPosts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No posts found.</p>
                </div>
            `;
            return;
        }

        // Sort by date (newest first)
        const sortedPosts = [...this.filteredPosts].sort((a, b) => 
            new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        container.innerHTML = sortedPosts.map(post => this.createPostItem(post)).join('');

        // Add event listeners to buttons
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = parseInt(btn.dataset.id);
                this.openEditor(postId);
            });
        });

        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const postId = parseInt(btn.dataset.id);
                this.openDeleteModal(postId);
            });
        });

        container.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slug = btn.dataset.slug;
                window.open(`/resources/blogs/${slug}/`, '_blank');
            });
        });
    }

    createPostItem(post) {
        const categoryName = this.getCategoryName(post.category);
        const formattedDate = this.formatDate(post.publishedAt);

        return `
            <div class="post-item">
                <div class="post-item-content">
                    <h3 class="post-item-title">${post.title}</h3>
                    <div class="post-item-meta">
                        <span class="post-item-status ${post.status}">${post.status}</span>
                        <span>${categoryName}</span>
                        <span>${post.author}</span>
                        <span>${formattedDate}</span>
                        ${post.featured ? '<span style="color: var(--orange);">Featured</span>' : ''}
                    </div>
                </div>
                <div class="post-item-actions">
                    <button class="post-item-btn view-btn" data-slug="${post.slug}">View</button>
                    <button class="post-item-btn edit-btn" data-id="${post.id}">Edit</button>
                    <button class="post-item-btn delete delete-btn" data-id="${post.id}">Delete</button>
                </div>
            </div>
        `;
    }

    openEditor(postId = null) {
        this.editingPostId = postId;
        const modal = document.getElementById('editorModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('editorForm');

        if (postId) {
            // Edit existing post
            const post = this.posts.find(p => p.id === postId);
            if (!post) return;

            modalTitle.textContent = 'Edit Post';
            document.getElementById('postId').value = post.id;
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postSlug').value = post.slug;
        document.getElementById('postCategory').value = post.category;
        document.getElementById('postAuthor').value = post.author;
            document.getElementById('postReadTime').value = post.readTime;
        document.getElementById('postExcerpt').value = post.excerpt;
        document.getElementById('postContent').value = post.content;
        document.getElementById('postImage').value = post.image || '';
            document.getElementById('postTags').value = post.tags ? post.tags.join(', ') : '';
            document.getElementById('postStatus').value = post.status;
        document.getElementById('postFeatured').checked = post.featured;
        } else {
            // New post
            modalTitle.textContent = 'New Post';
            form.reset();
            document.getElementById('postId').value = '';
            document.getElementById('postAuthor').value = '99Ravens Team';
            document.getElementById('postReadTime').value = '5';
            document.getElementById('postStatus').value = 'draft';
            document.getElementById('postFeatured').checked = false;
        }
        
        modal.classList.add('active');
    }

    closeEditor() {
        const modal = document.getElementById('editorModal');
        modal.classList.remove('active');
        this.editingPostId = null;
    }

    savePost() {
        const postId = document.getElementById('postId').value;
        const isNew = !postId;
        
        const postData = {
            id: isNew ? this.getNextId() : parseInt(postId),
            title: document.getElementById('postTitle').value,
            slug: document.getElementById('postSlug').value,
            category: document.getElementById('postCategory').value,
            author: document.getElementById('postAuthor').value,
            authorTitle: '99Ravens',
            readTime: parseInt(document.getElementById('postReadTime').value),
            excerpt: document.getElementById('postExcerpt').value,
            content: document.getElementById('postContent').value,
            image: document.getElementById('postImage').value,
            tags: document.getElementById('postTags').value.split(',').map(t => t.trim()).filter(t => t),
            status: document.getElementById('postStatus').value,
            featured: document.getElementById('postFeatured').checked,
            publishedAt: isNew ? new Date().toISOString().split('T')[0] : this.posts.find(p => p.id === parseInt(postId))?.publishedAt || new Date().toISOString().split('T')[0]
        };

        if (isNew) {
            this.posts.unshift(postData);
        } else {
            const index = this.posts.findIndex(p => p.id === parseInt(postId));
            if (index !== -1) {
                this.posts[index] = postData;
            }
        }

        // If this post is featured, unfeatured others
        if (postData.featured) {
            this.posts.forEach(p => {
                if (p.id !== postData.id) {
                    p.featured = false;
                }
            });
        }

        this.closeEditor();
        this.updateStats();
        this.applyFilters();

        // Show success message
        alert(isNew ? 'Post created successfully!' : 'Post updated successfully!');

        // Note: In a real implementation, you would save to a backend here
    }

    openDeleteModal(postId) {
        this.deletePostId = postId;
        document.getElementById('deletePostId').value = postId;
        document.getElementById('deleteModal').classList.add('active');
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').classList.remove('active');
        this.deletePostId = null;
    }

    confirmDelete() {
        if (!this.deletePostId) return;

        const index = this.posts.findIndex(p => p.id === this.deletePostId);
        if (index !== -1) {
            this.posts.splice(index, 1);
        }

        this.closeDeleteModal();
        this.updateStats();
        this.applyFilters();

        alert('Post deleted successfully!');
    }

    exportData() {
        const dataStr = JSON.stringify(this.posts, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileName = `blog-posts-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileName);
        linkElement.click();
    }

    getNextId() {
        return Math.max(...this.posts.map(p => p.id), 0) + 1;
    }

    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    getCategoryName(categoryId) {
        const categories = {
            'strategy': 'Strategy',
            'ai': 'AI & Technology',
            'culture': 'Culture',
            'case-studies': 'Case Studies'
        };
        return categories[categoryId] || categoryId;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AdminPanel();
});
