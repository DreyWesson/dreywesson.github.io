importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//custom adjustments
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}


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
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.github.com/users/*'),
  workbox.strategies.networkFirst({
    networkTimetoutSeconds: 5,
    cacheName: 'github',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts',
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