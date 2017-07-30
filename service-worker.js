var cacheName = 'starcon-step-6-1';
var filesToCache = [
  '/',
  '/index.html',
  '/index-old.html',
  '/about.html',
  '/colors.html',
  '/forum.html',
  '/messages.html',
  '/messages-old.html',
  '/rate-us.html',
  '/files/main_style.css',
  '/files/theme/external/font.css',
  '/files/theme/external/sites.css',
  '/files/theme/external/analytics.js',
  '/files/theme/external/api.js',
  '/files/theme/external/jquery.min.js',
  '/files/theme/external/main.js',
  '/files/theme/custom.js',
  '/files/theme/plugins.js',
  '/activateserviceworker.js',
  '/files/theme/external/regular.ttf',
  '/uploads/images/defcon-5.jpg',
  '//fonts.googleapis.com/css?family=Quattrocento+Sans:400,700,400italic,700italic&subset=latin,latin-ext',
  '//fonts.googleapis.com/css?family=Quattrocento:400,700&subset=latin,latin-ext',
  '//fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic&subset=latin,latin-ext/',
  '//fonts.googleapis.com/css?family=Actor&subset=latin,latin-ext',
  '//fonts.googleapis.com/css?family=Actor&subset=latin,latin-ext'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});