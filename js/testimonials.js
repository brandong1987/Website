// ============================================
// TESTIMONIALS CAROUSEL
// ============================================

class TestimonialsCarousel {
  constructor(container, options = {}) {
    this.container = container;
    this.items = container.querySelectorAll('.testimonial-item');
    this.currentIndex = 0;
    this.autoRotate = options.autoRotate ?? true;
    this.interval = options.interval || 6000;
    this.autoRotateTimer = null;
    this.touchStartX = 0;
    this.touchEndX = 0;

    if (this.items.length > 0) {
      this.init();
    }
  }

  init() {
    this.createControls();
    this.showItem(0);

    if (this.autoRotate) {
      this.startAutoRotate();

      // Pause on hover
      this.container.addEventListener('mouseenter', () => this.pauseAutoRotate());
      this.container.addEventListener('mouseleave', () => this.startAutoRotate());
    }

    // Touch/swipe support
    this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e));
  }

  createControls() {
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonials-dots';

    this.items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dot.addEventListener('click', () => {
        this.showItem(index);
        this.resetAutoRotate();
      });
      dotsContainer.appendChild(dot);
    });

    this.container.appendChild(dotsContainer);
    this.dotsContainer = dotsContainer;

    // Create prev/next buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'testimonial-prev';
    prevButton.innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    `;
    prevButton.setAttribute('aria-label', 'Previous testimonial');
    prevButton.addEventListener('click', () => {
      this.prev();
      this.resetAutoRotate();
    });

    const nextButton = document.createElement('button');
    nextButton.className = 'testimonial-next';
    nextButton.innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    `;
    nextButton.setAttribute('aria-label', 'Next testimonial');
    nextButton.addEventListener('click', () => {
      this.next();
      this.resetAutoRotate();
    });

    this.container.appendChild(prevButton);
    this.container.appendChild(nextButton);
  }

  showItem(index) {
    // Hide all items
    this.items.forEach((item) => {
      item.classList.remove('active');
      item.style.opacity = '0';
      item.style.transform = 'translateX(20px)';
    });

    // Show current item
    this.items[index].classList.add('active');
    setTimeout(() => {
      this.items[index].style.opacity = '1';
      this.items[index].style.transform = 'translateX(0)';
    }, 50);

    this.currentIndex = index;
    this.updateDots();
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  next() {
    const newIndex = (this.currentIndex + 1) % this.items.length;
    this.showItem(newIndex);
  }

  prev() {
    const newIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.showItem(newIndex);
  }

  startAutoRotate() {
    if (this.autoRotate) {
      this.autoRotateTimer = setInterval(() => this.next(), this.interval);
    }
  }

  pauseAutoRotate() {
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
    }
  }

  resetAutoRotate() {
    this.pauseAutoRotate();
    this.startAutoRotate();
  }

  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left, show next
        this.next();
      } else {
        // Swiped right, show prev
        this.prev();
      }
      this.resetAutoRotate();
    }
  }
}

// Initialize testimonials carousel on page load
document.addEventListener('DOMContentLoaded', () => {
  const testimonialsContainer = document.getElementById('testimonials-carousel');
  if (testimonialsContainer) {
    new TestimonialsCarousel(testimonialsContainer, {
      autoRotate: true,
      interval: 6000
    });
  }
});
