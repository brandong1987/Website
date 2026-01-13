// ============================================
// BLOG - Dynamic Rendering & Filtering
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.getElementById('blog-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!blogGrid) return;

  let activeCategory = 'all';

  // Render blog posts
  function renderBlogPosts(category = 'all') {
    const filteredPosts = category === 'all'
      ? blogPosts
      : blogPosts.filter(post => post.category === category);

    if (filteredPosts.length === 0) {
      blogGrid.innerHTML = '<p style="text-align: center; color: var(--color-text-light); grid-column: 1 / -1;">No posts found in this category.</p>';
      return;
    }

    blogGrid.innerHTML = filteredPosts.map((post, index) => `
      <article class="blog-card fade-in-up" style="animation-delay: ${index * 0.1}s;">
        <a href="blog-post.html?slug=${post.slug}" class="blog-card-link">
          <div class="blog-image" style="background-image: url('${post.image}')">
            <div class="blog-overlay"></div>
          </div>
          <div class="blog-content">
            <div class="blog-meta">
              <span class="blog-category">${post.category}</span>
              <span class="blog-read-time">${post.readTime}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="blog-author">
              <span>${post.author}</span>
              <span>•</span>
              <span>${formatDate(post.date)}</span>
            </div>
          </div>
        </a>
      </article>
    `).join('');
  }

  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Filter functionality
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Get category and render
        const category = btn.dataset.category;
        activeCategory = category;
        renderBlogPosts(category);
      });
    });
  }

  // Initial render
  renderBlogPosts();
});
