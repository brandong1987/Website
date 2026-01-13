// ============================================
// PORTFOLIO - Filtering & Lightbox Modal
// ============================================

class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.portfolioItems = document.querySelectorAll('.portfolio-item');
    this.currentFilter = 'all';

    if (this.filterButtons.length > 0 && this.portfolioItems.length > 0) {
      this.init();
    }
  }

  init() {
    // Initialize filter buttons
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.filterItems(filter);
        this.updateActiveButton(e.target);
        this.currentFilter = filter;
      });
    });

    // Initialize lightbox for portfolio items
    this.portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const projectData = {
          title: item.dataset.title,
          category: item.dataset.category,
          description: item.dataset.description,
          tech: item.dataset.tech,
          features: item.dataset.features,
          gradient: item.dataset.gradient
        };
        this.openLightbox(projectData);
      });
    });
  }

  filterItems(category) {
    this.portfolioItems.forEach(item => {
      const itemCategory = item.dataset.category;

      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
        // Trigger fade-in animation
        setTimeout(() => {
          item.classList.add('fade-in-up');
          item.classList.add('animate-in');
        }, 10);
      } else {
        item.style.display = 'none';
        item.classList.remove('animate-in');
      }
    });
  }

  updateActiveButton(activeBtn) {
    this.filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
  }

  openLightbox(projectData) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('portfolio-modal');

    if (!modal) {
      modal = this.createModal();
      document.body.appendChild(modal);
    }

    // Populate modal with project data
    modal.querySelector('.modal-title').textContent = projectData.title;
    modal.querySelector('.modal-category').textContent = projectData.category;
    modal.querySelector('.modal-description').textContent = projectData.description;
    modal.querySelector('.modal-tech').textContent = `Tech Stack: ${projectData.tech}`;

    // Update project visual (gradient)
    const projectVisual = modal.querySelector('.modal-project-visual');
    projectVisual.style.background = projectData.gradient;
    projectVisual.querySelector('.project-name-overlay').textContent = projectData.title;

    // Update features list
    const featuresList = modal.querySelector('.modal-features');
    featuresList.innerHTML = '';
    const features = projectData.features.split(',');
    features.forEach(feature => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        ${feature.trim()}
      `;
      featuresList.appendChild(li);
    });

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  createModal() {
    const modal = document.createElement('div');
    modal.id = 'portfolio-modal';
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Close modal">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="modal-body">
          <div class="modal-project-visual">
            <div class="project-name-overlay"></div>
          </div>

          <div class="modal-details">
            <div class="modal-category"></div>
            <h2 class="modal-title"></h2>
            <p class="modal-description"></p>
            <p class="modal-tech"></p>

            <h3>Key Features:</h3>
            <ul class="modal-features"></ul>

            <div class="modal-actions">
              <button class="btn btn-outline modal-close-btn">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add close event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const closeBtn2 = modal.querySelector('.modal-close-btn');
    const backdrop = modal.querySelector('.modal-backdrop');

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
    };

    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    return modal;
  }
}

// Initialize portfolio on page load
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioFilter();
});
