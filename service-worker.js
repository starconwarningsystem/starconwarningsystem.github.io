var cacheName="STARCON-2017-12-16-17-45",filesToCache="/ /index.html /index-old.html /about.html /colors.html /forum.html /messages.html /messages-old.html /rate-us.html /files/main_style.css /files/theme/external/font.css /files/theme/external/sites.css /files/theme/external/api.js /files/theme/external/jquery.min.js /files/theme/external/main.js /files/theme/custom.js /files/theme/plugins.js /files/theme/external/regular.ttf /uploads/images/starcon.png /manifest.json /ISPError.html".split(" "),
urlToCache=["//fonts.googleapis.com/css?family=Quattrocento+Sans:400,700,400italic,700italic&subset=latin,latin-ext","//fonts.googleapis.com/css?family=Quattrocento:400,700&subset=latin,latin-ext","//fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic&subset=latin,latin-ext/","//fonts.googleapis.com/css?family=Actor&subset=latin,latin-ext"];
self.addEventListener("install",function(a){console.log("[ServiceWorker] Install");a.waitUntil(caches.open(cacheName).then(function(a){console.log("[ServiceWorker] Caching app shell");return a.addAll(filesToCache)}).then(function(){self.skipWaiting()}))});
self.addEventListener("activate",function(a){var b=[cacheName];console.log("[ServiceWorker] Activate");a.waitUntil(caches.keys().then(function(a){return Promise.all(a.map(function(a){if(-1===b.indexOf(a))return console.log("[ServiceWorker] Removing old cache",a),caches["delete"](a)}))}))});self.addEventListener("fetch",function(a){console.log("[ServiceWorker] Fetch",a.request.url);a.respondWith(caches.match(a.request).then(function(b){return b||fetch(a.request)}))});