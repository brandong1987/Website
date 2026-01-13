// ============================================
// SERVICE WORKER - PWA Offline Support
// ============================================

const CACHE_NAME = 'studiomaker-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/portfolio.html',
  '/pricing.html',
  '/contact.html',
  '/blog.html',
  '/css/base.css',
  '/css/components.css',
  '/css/layout.css',
  '/css/animations.css',
  '/css/pages/home.css',
  '/css/pages/blog.css',
  '/js/schema.js',
  '/js/theme-toggle.js',
  '/js/components.js',
  '/js/navigation.js',
  '/js/animations.js',
  '/js/testimonials.js',
  '/js/blog-data.js',
  '/js/blog.js',
  '/js/pricing-calculator.js',
  '/js/contact-form.js',
  '/favicon.svg'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('Service Worker: Installed and cached all files');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache the new response for future use
            if (networkResponse && networkResponse.status === 200) {
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
            }
            return networkResponse;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error);

            // Return offline page if available
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync (optional - for offline form submissions)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    console.log('Service Worker: Syncing forms');
    event.waitUntil(syncForms());
  }
});

// Push notifications (optional - for future updates)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-72x72.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification('studioMaker', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Helper function to sync forms
async function syncForms() {
  // Implement form sync logic here if needed
  console.log('Service Worker: Forms synced');
}
