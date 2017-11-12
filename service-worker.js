var cacheName = 'STARCON-2017-11-12-14-25';
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
  '/files/theme/external/api.js',
  '/files/theme/external/jquery.min.js',
  '/files/theme/external/main.js',
  '/files/theme/custom.js',
  '/files/theme/plugins.js',
  '/files/theme/external/regular.ttf',
  '/uploads/images/starcon.png',
  '/manifest.json'
];

var urlToCache = [
  '//fonts.googleapis.com/css?family=Quattrocento+Sans:400,700,400italic,700italic&subset=latin,latin-ext',
  '//fonts.googleapis.com/css?family=Quattrocento:400,700&subset=latin,latin-ext',
  '//fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic&subset=latin,latin-ext/',
  '//fonts.googleapis.com/css?family=Actor&subset=latin,latin-ext'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
      var request = new Request(urlToCache, {mode: 'no-cors'});
      return fetch(request).then(function(response) {
        var cachedCopy = response.clone();
        return cache.put(request, cachedCopy);
      });
    }).then(function() {
      self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(e) {
  var cacheWhitelist = [cacheName];
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(cacheName) {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          console.log('[ServiceWorker] Removing old cache', cacheName);
          return caches.delete(cacheName);
      }}))
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});