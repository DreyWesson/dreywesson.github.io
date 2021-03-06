importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js"
);

workbox.googleAnalytics.initialize();

const staticCache = "static-site-v4.9";
const dynamicCache = "static-site-v4.9";

const cacheAssets = [
  "/",
  "index.html",
  "/app.js",
  "/script.js",
  "/styles.css",
  "manifest.json",
  "/img002.webp",
  "rocks.webp",
  "paper.webp",
  "scissors.webp",
  "card.webp",
  "paper.svg",
  "rocks.svg",
  "scissors.svg",
  "2.webp",
  "3.webp",
  "4.webp",
  "5.webp",
  "6.webp",
  "7.webp",
  "8.webp",
  "9.webp",
  "10.webp",
  "K.webp",
  "J.webp",
  "Q.webp",
  "A.webp",
  "aww.mp3",
  "cash.mp3",
  "swish.m4a",
  "poker-table-background.webp",
  "github-icon.webp",
  "card.png",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
  "https://fonts.googleapis.com/css?family=Tomorrow&display=swap",
  "https://fonts.googleapis.com/css?family=Dancing+Script&display=swap",
  "https://fonts.gstatic.com/s/tomorrow/v2/WBLmrETNbFtZCeGqgRXce2DiLsipsE4.woff2",
  "https://fonts.gstatic.com/s/tomorrow/v2/WBLmrETNbFtZCeGqgRXSe2DiLsip.woff2",
  "https://fonts.gstatic.com/s/dancingscript/v13/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Rep8hNP6pnxP.woff2",
  "https://fonts.gstatic.com/s/dancingscript/v13/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3ROp8hNP6pnxP.woff2",
  "https://fonts.gstatic.com/s/dancingscript/v13/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Sup8hNP6pg.woff2",
  "fallback.html",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//Install event: adds our cacheAssets to cache storage
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(staticCache)
      .then((cache) => {
        console.log(`Cashing Shell Assets...`);
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//Activate Event: filters and delete old caches
self.addEventListener("activate", (e) => {
  // console.log(`service worker has been activated`);
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//Fetch event: checks if cacheAssets match request
self.addEventListener("fetch", (evt) => {
  console.log("Fetch intercepted for:", evt.request.url);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cachedResponse) => {
        cachedResponse
          ? cachedResponse
          : fetch(evt.request).then((fetchResponse) => {
              return caches.open(dynamicCache).then((cache) => {
                cache.put(evt.request.url, fetchResponse.clone());
                limitCacheSize(dynamicCache, 20);
                return fetchResponse;
              });
            });
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1)
          return caches.match("fallback.html");
      })
  );
});

//Add a push listener
self.addEventListener("push", (e) => {
  const title = "Yay a message";
  const body = "We have received a push notification";
  const icon = "/notification.webp";
  const tag = "simple-push-example-tag";
  e.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  event.waitUntil(clients.openWindow("https://dreywesson.github.io"));
});

self.importScripts("/dreywesson.github.io/analytics-helper.js");

self.addEventListener("notificationclose", function (event) {
  event.waitUntil(sendAnalyticsEvent("close", "notification"));
});
// importScripts('dreywesson.github.io/node_modules/sw-offline-google-analytics/build/importScripts/sw-offline-google-analytics.dev.v0.0.25.js');
// goog.offlineGoogleAnalytics.initialize();
