// ============================================
// COMPONENTS - Header & Footer Templates
// ============================================

const HeaderTemplate = `
  <header id="header">
    <nav class="nav-container">
      <a href="index.html" class="logo">
        <span class="logo-studio">studio</span><span class="logo-maker">Maker</span>
      </a>

      <!-- Desktop Nav -->
      <ul class="nav-links">
        <li><a href="index.html" data-page="index.html">Home</a></li>
        <li><a href="about.html" data-page="about.html">About</a></li>
        <li><a href="services.html" data-page="services.html">Services</a></li>
        <li><a href="portfolio.html" data-page="portfolio.html">Portfolio</a></li>
        <li><a href="pricing.html" data-page="pricing.html">Pricing</a></li>
        <li><a href="contact.html" data-page="contact.html">Contact</a></li>
        <li><a href="contact.html" class="btn btn-primary">Get Started</a></li>
      </ul>

      <!-- Mobile Menu Button -->
      <button id="menu-toggle" class="menu-toggle" aria-label="Toggle menu">
        <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu hidden">
      <ul>
        <li><a href="index.html" data-page="index.html">Home</a></li>
        <li><a href="about.html" data-page="about.html">About</a></li>
        <li><a href="services.html" data-page="services.html">Services</a></li>
        <li><a href="portfolio.html" data-page="portfolio.html">Portfolio</a></li>
        <li><a href="pricing.html" data-page="pricing.html">Pricing</a></li>
        <li><a href="contact.html" data-page="contact.html">Contact</a></li>
        <li><a href="contact.html" class="btn btn-primary btn-block">Get Started</a></li>
      </ul>
    </div>
  </header>
`;

const FooterTemplate = `
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <span class="logo-studio">studio</span><span class="logo-maker">Maker</span>
          </a>
          <p>Building websites that work</p>

          <!-- Social Links -->
          <div class="social-links">
            <a href="https://twitter.com/studiomaker" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/studiomaker" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://instagram.com/studiomaker" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke-width="2"/>
                <path stroke-width="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"/>
              </svg>
            </a>
            <a href="https://github.com/studiomaker" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-copyright">
          <p>&copy; 2026 studioMaker. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
`;

// Initialize components on page load
document.addEventListener('DOMContentLoaded', () => {
  // Inject header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = HeaderTemplate;
  }

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FooterTemplate;
  }

  // Initialize navigation after components are injected
  if (typeof initNavigation === 'function') {
    initNavigation();
  }

  // Load Tawk.to live chat (only on production, not localhost)
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    loadTawkTo();
  }

  // Register service worker for PWA
  registerServiceWorker();
});

// Tawk.to Live Chat Integration
function loadTawkTo() {
  // Sign up at tawk.to and replace YOUR_TAWK_PROPERTY_ID and YOUR_TAWK_WIDGET_ID with your actual IDs
  var Tawk_API = Tawk_API || {};
  var Tawk_LoadStart = new Date();

  (function() {
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/YOUR_TAWK_PROPERTY_ID/YOUR_TAWK_WIDGET_ID';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  })();
}

// Service Worker Registration for PWA
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('New Service Worker found');

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker installed, show update notification
              console.log('New content available! Please refresh.');
              showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'CACHE_UPDATED') {
        console.log('Cache updated:', event.data);
      }
    });
  }
}

// Show update notification (optional)
function showUpdateNotification() {
  // Create a simple notification that a new version is available
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
    z-index: 10000;
    font-size: 0.9rem;
    cursor: pointer;
    animation: slide-up 0.4s ease-out;
  `;
  notification.textContent = 'New version available! Click to reload.';

  notification.addEventListener('click', () => {
    window.location.reload();
  });

  document.body.appendChild(notification);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    notification.remove();
  }, 10000);
}
