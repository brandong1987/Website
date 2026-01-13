// ============================================
// ANIMATIONS - Intersection Observer & Parallax
// ============================================

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initParallax();
});

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Optional: unobserve after animating once for better performance
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .fade-in, .scale-in, .slide-in-left, .slide-in-right'
  );

  animatedElements.forEach(el => {
    animateOnScroll.observe(el);
  });
}

// Parallax effect for hero backgrounds
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');

  if (parallaxElements.length === 0) return;

  // Throttle scroll events for better performance
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.5;
          const yPos = -(scrolled * speed);
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        ticking = false;
      });

      ticking = true;
    }
  });
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
