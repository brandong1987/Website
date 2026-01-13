// ============================================
// THEME TOGGLE - Dark/Light Mode Switcher
// ============================================

class ThemeToggle {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    // Apply saved theme
    this.applyTheme(this.theme);

    // Create toggle button
    this.createToggleButton();

    // Listen for toggle events
    this.setupEventListeners();
  }

  createToggleButton() {
    const header = document.querySelector('header');
    if (!header) return;

    const nav = header.querySelector('nav');
    if (!nav) return;

    // Create toggle container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'theme-toggle-container';
    toggleContainer.innerHTML = `
      <button class="theme-toggle-btn" aria-label="Toggle theme">
        <svg class="sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <svg class="moon-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      </button>
    `;

    // Insert before mobile menu button
    const mobileMenuBtn = nav.querySelector('.menu-toggle');
    if (mobileMenuBtn) {
      nav.insertBefore(toggleContainer, mobileMenuBtn);
    } else {
      // Fallback: insert at end of nav
      nav.appendChild(toggleContainer);
    }
  }

  setupEventListeners() {
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Keyboard support
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Update toggle button state
    const toggleBtn = document.querySelector('.theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
  }
}

// Initialize theme toggle when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
});
