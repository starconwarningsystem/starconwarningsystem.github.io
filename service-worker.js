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
  '/uploads/images/defcon-5.jpg'
];

var urlToCache = [
  '//fonts.googleapis.com/css?family=Quattrocento+Sans:400,700,400italic,700italic&subset=latin,latin-ext',
  '//fonts.googleapis.com/css?family=Quattrocento:400,700&subset=latin,latin-ext',
  '//fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic&subset=latin,latin-ext/',
  '//fonts.googleapis.com/css?family=Actor&subset=latin,latin-ext',
  '//www.powr.io/plugins/comments/cached_view?load=sync&index=0&unique_label=&powr_token=weebly_683304140623557845&user_label=weebly_683304140623557845_6c35bc94-d03a-4120-bbf5-a1b157607839&demo_mode=false&external_type=weebly-integrated&template_powr_token=&color=rgb(62%2C%2062%2C%2062)&backgroundColor=rgb(255%2C%20255%2C%20255)&fontFamily=%22Quattrocento%20Sans%22%2C%20sans-serif'
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