importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//custom adjustments
workbox.routing.registerRoute(
  new RegExp('https:.*min\.(css|js)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'bootstrap',
  })
)

workbox.routing.registerRoute(
  new RegExp('https://source.unsplash.com/400x400/*'),
  new workbox.strategies.NetworkFirst({
    networkTimetoutSeconds: 5,
    cacheName: 'unsplash',
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.github.com/users/*'),
  workbox.strategies.networkFirst({
    networkTimetoutSeconds: 5,
    cacheName: 'github',
  })
)

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
); 
workbox.routing.registerRoute(
  /https:\/\/fonts\.googleapis\.com\/css\?family=*/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
); 

workbox.precaching.precacheAndRoute([]);