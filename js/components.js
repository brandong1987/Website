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
});
