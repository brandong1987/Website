// ============================================
// SCHEMA MARKUP - Structured Data for SEO
// ============================================

const LocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "studioMaker",
  "image": "https://studiomaker.io/favicon.svg",
  "@id": "https://studiomaker.io",
  "url": "https://studiomaker.io",
  "telephone": "+1-555-123-4567",
  "email": "hello@studiomaker.io",
  "priceRange": "$800 - $1800",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Web Design Street",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://twitter.com/studiomaker",
    "https://linkedin.com/company/studiomaker",
    "https://instagram.com/studiomaker",
    "https://github.com/studiomaker"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "750"
  }
};

const OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "studioMaker",
  "alternateName": "Studio Maker Web Design",
  "url": "https://studiomaker.io",
  "logo": "https://studiomaker.io/favicon.svg",
  "description": "We build fast, beautiful websites that turn visitors into customers. Simple pricing, quick turnaround, no hassle.",
  "foundingDate": "2018",
  "numberOfEmployees": "10",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "email": "hello@studiomaker.io",
    "availableLanguage": ["en"],
    "areaServed": "US"
  },
  "sameAs": [
    "https://twitter.com/studiomaker",
    "https://linkedin.com/company/studiomaker",
    "https://instagram.com/studiomaker",
    "https://github.com/studiomaker"
  ]
};

const ServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Design & Development",
  "provider": {
    "@type": "Organization",
    "name": "studioMaker",
    "url": "https://studiomaker.io"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Website",
          "description": "Professional websites for contractors, salons, law firms, and service businesses"
        },
        "price": "800",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Restaurant Website",
          "description": "Websites with menus, hours, reservations, and online ordering for restaurants and cafes"
        },
        "price": "1200",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-Commerce Store",
          "description": "Full e-commerce websites with shopping cart, payment processing, and inventory management"
        },
        "price": "2500",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Landing Page",
          "description": "High-converting landing pages for campaigns, promotions, or service offerings"
        },
        "price": "800",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Portfolio Website",
          "description": "Showcase websites for photographers, designers, artists, and creative professionals"
        },
        "price": "1200",
        "priceCurrency": "USD"
      }
    ]
  }
};

const WebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "studioMaker - Professional Websites for Local Businesses",
  "description": "We build fast, beautiful websites that turn visitors into customers. Simple pricing, quick turnaround, no hassle.",
  "url": "https://studiomaker.io",
  "publisher": {
    "@type": "Organization",
    "name": "studioMaker",
    "logo": {
      "@type": "ImageObject",
      "url": "https://studiomaker.io/favicon.svg"
    }
  }
};

const FAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's included in the base price?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every package includes professional design, mobile responsiveness, contact forms, basic SEO, and post-launch support. You also get domain setup assistance and training on how to update your site. No hidden fees or surprise charges."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most projects are completed incredibly fast! Starter packages typically take 24-48 hours, Professional takes 2-3 days, and Premium takes 3-5 days from start to launch."
      }
    },
    {
      "@type": "Question",
      "name": "Can I update the website myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! We build sites that are easy to update. We'll provide training and documentation so you can make basic changes yourself. For more complex updates, we're always here to help with our maintenance plans."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle hosting and domain setup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We'll guide you through purchasing a domain and setting up hosting (typically $10-20/month through providers like Netlify, Vercel, or traditional hosting). We can handle the technical setup for you at no extra charge."
      }
    }
  ]
};

// Inject schema markup into page head
function injectSchema(schemas) {
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// Initialize schema markup based on current page
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  // Always include Organization schema on all pages
  injectSchema([OrganizationSchema, WebPageSchema]);

  // Add page-specific schemas
  if (page === 'index.html' || page === '' || page === '/') {
    // Homepage gets LocalBusiness schema
    injectSchema([LocalBusinessSchema]);
  } else if (page === 'services.html') {
    // Services page gets Service schema
    injectSchema([ServiceSchema]);
  } else if (page === 'pricing.html') {
    // Pricing page gets FAQ schema
    injectSchema([FAQSchema, ServiceSchema]);
  } else if (page === 'about.html') {
    // About page - organization schema already included
  } else if (page === 'contact.html') {
    // Contact page gets LocalBusiness for contact info
    injectSchema([LocalBusinessSchema]);
  }
});
