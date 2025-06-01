const CACHE_NAME = 'namazban-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/tailwind.css',
  '/src/input.css',
  '/assets/logo.png',
  '/assets/namaz.jpg',
  '/ghaza/index.html',
  '/rakatshomar/index.html',
  '/taghvim/index.html',
  '/zekr/index.html',
  'https://cdn.jsdelivr.net/gh/Daradege/prayban@main/node_modules/moment/min/moment.min.js',
  'https://cdn.jsdelivr.net/gh/Daradege/prayban@main/node_modules/moment-jalaali/build/moment-jalaali.js',
  'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
