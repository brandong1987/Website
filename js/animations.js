// ============================================
// ANIMATIONS - Intersection Observer & Parallax
// ============================================

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initParallax();
  initScrollProgress();
  initRippleEffect();
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

// ============================================
// ENHANCED ANIMATIONS
// ============================================

// Scroll Progress Indicator
function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.prepend(progressBar);

  const bar = progressBar.querySelector('.scroll-progress-bar');

  // Update progress on scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress(bar);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function updateScrollProgress(bar) {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
  bar.style.width = `${scrollPercent}%`;
}

// Ripple Effect on Buttons
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn, button');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple element
      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');

      // Get button position and size
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // Position and size the ripple
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Add to button
      this.appendChild(ripple);

      // Remove after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Card Tilt Effect (optional - can be applied with tilt-card class)
function initCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
  });
}

function handleTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;

  card.style.setProperty('--tilt-x', `${rotateX}deg`);
  card.style.setProperty('--tilt-y', `${rotateY}deg`);
}

function resetTilt(e) {
  const card = e.currentTarget;
  card.style.setProperty('--tilt-x', '0deg');
  card.style.setProperty('--tilt-y', '0deg');
}
