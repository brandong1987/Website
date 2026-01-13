// ============================================
// PRICING CALCULATOR - Interactive Quote Tool
// ============================================

class PricingCalculator {
  constructor() {
    this.basePrice = 800;
    this.pricePerPage = 150;
    this.features = {
      'ecommerce': 1700,
      'booking': 400,
      'blog': 300,
      'cms': 500,
      'seo': 200,
      'analytics': 150
    };

    this.init();
  }

  init() {
    this.pageSlider = document.getElementById('page-count');
    this.pageDisplay = document.getElementById('page-display');
    this.checkboxes = document.querySelectorAll('.feature-checkbox');
    this.totalPrice = document.getElementById('total-price');
    this.quoteButton = document.getElementById('get-quote-btn');

    if (!this.pageSlider || !this.totalPrice) return;

    this.setupEventListeners();
    this.updatePrice();
  }

  setupEventListeners() {
    // Page count slider
    this.pageSlider.addEventListener('input', () => {
      this.pageDisplay.textContent = this.pageSlider.value;
      this.updatePrice();
    });

    // Feature checkboxes
    this.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updatePrice();
      });
    });

    // Quote button
    if (this.quoteButton) {
      this.quoteButton.addEventListener('click', () => {
        this.redirectToContact();
      });
    }
  }

  calculateTotal() {
    let total = this.basePrice;

    // Add pages cost
    const pageCount = parseInt(this.pageSlider.value);
    if (pageCount > 1) {
      total += (pageCount - 1) * this.pricePerPage;
    }

    // Add features cost
    this.checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const feature = checkbox.dataset.feature;
        total += this.features[feature] || 0;
      }
    });

    return total;
  }

  updatePrice() {
    const total = this.calculateTotal();
    this.animatePrice(total);
  }

  animatePrice(newPrice) {
    const currentPrice = parseInt(this.totalPrice.textContent.replace(/[^0-9]/g, '')) || 0;
    const duration = 500; // ms
    const steps = 30;
    const increment = (newPrice - currentPrice) / steps;
    const stepDuration = duration / steps;

    let current = currentPrice;
    let step = 0;

    const animate = () => {
      if (step < steps) {
        current += increment;
        this.totalPrice.textContent = `$${Math.round(current).toLocaleString()}`;
        step++;
        setTimeout(animate, stepDuration);
      } else {
        this.totalPrice.textContent = `$${newPrice.toLocaleString()}`;
      }
    };

    animate();
  }

  redirectToContact() {
    const pageCount = this.pageSlider.value;
    const selectedFeatures = [];

    this.checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const label = checkbox.parentElement.querySelector('span').textContent;
        selectedFeatures.push(label);
      }
    });

    const total = this.calculateTotal();

    // Build URL with query parameters
    const params = new URLSearchParams({
      pages: pageCount,
      features: selectedFeatures.join(', '),
      estimate: total
    });

    window.location.href = `contact.html?${params.toString()}`;
  }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PricingCalculator();
});
