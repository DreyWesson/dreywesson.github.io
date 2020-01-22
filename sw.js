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

workbox.precaching.precacheAndRoute([
  {
    "url": "10.webp",
    "revision": "7665d428a5c490ced137372aa5434e19"
  },
  {
    "url": "2.webp",
    "revision": "196376a74deaa8f006ff0af0441d3bd2"
  },
  {
    "url": "3.webp",
    "revision": "c2f5bd6b63abcf1e35283949ec0b5165"
  },
  {
    "url": "4.webp",
    "revision": "8d4b647809edc5cb621e588a18de0ffa"
  },
  {
    "url": "5.webp",
    "revision": "5010f23e5357ed649e0530e3dc441f4e"
  },
  {
    "url": "6.webp",
    "revision": "a569e12c84b089516b1ad64f8ba40e53"
  },
  {
    "url": "7.webp",
    "revision": "e1c0c2bd07a5aad2e9ca5c43b4b0a079"
  },
  {
    "url": "8.webp",
    "revision": "6e9cd97a8c57e387bad22201ba879bdf"
  },
  {
    "url": "9.webp",
    "revision": "b83f804815beeb6a0ed00d95cd06d808"
  },
  {
    "url": "A.webp",
    "revision": "c19821d2b5ac434359f8e0d3d37ab371"
  },
  {
    "url": "analytics-helper.js",
    "revision": "c41504b7239466b330156e7b0ce6ebae"
  },
  {
    "url": "android-chrome-192x192.png",
    "revision": "d9c1cc2c1f8acd69f979613e3c0d775d"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "afc94310021721e0ea807176f0c18dad"
  },
  {
    "url": "app.js",
    "revision": "98c2a5cc325e03c75ac75c879a66505e"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "709e3b86057ca5810dc19838f068bb24"
  },
  {
    "url": "aww.mp3",
    "revision": "e894bb4f5ddea603f6684f247fe0d215"
  },
  {
    "url": "card.png",
    "revision": "0bafab52e3b3c2d2666bba5214421e6d"
  },
  {
    "url": "card.svg",
    "revision": "5ea2061a40b316aece7163ee01e1868e"
  },
  {
    "url": "card.webp",
    "revision": "b4fa4d1c15d9ffc2d5af6ad3912ae9b6"
  },
  {
    "url": "cash.mp3",
    "revision": "915cfb823daeba22f1acc03c3da13bfe"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "446b0e37c667348502a648c8c7820c4e"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "23298b1c7b53354e513314bcb3046d11"
  },
  {
    "url": "favicon.ico",
    "revision": "936e2d334064b9681106bdd3765d8e1d"
  },
  {
    "url": "github-icon.webp",
    "revision": "98570b769fe3233fb40bdc1a8da85c89"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "c9dbafc509c5cc03cef9b76bb04ea3ea"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "55b98f58601d498268f38d32cab57d80"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "c695309fdd00a3b2a8e6d12f36370026"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "e12f3b8d45ab83cc6b2db2267ec0b747"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "de059475cf0b136049a946eeefb09db5"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "bb8c052aef5f36355473e3f96061405c"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "964968a90c9f1a0c00138f5b5b60b168"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "bd9048b359829b36cbf3a827b8540cc7"
  },
  {
    "url": "img002.webp",
    "revision": "9cf157bea495c6e4ac0ad791bd4c5621"
  },
  {
    "url": "index.html",
    "revision": "ee7cd14dbb9fb9856bfded4275ce663c"
  },
  {
    "url": "J.webp",
    "revision": "8a2966d1843ba4a883fc80df7dc0775a"
  },
  {
    "url": "K.webp",
    "revision": "328515f1af0d162c9e5f49fa615e7e96"
  },
  {
    "url": "manifest.json",
    "revision": "04bdb543dc62556e39b431232a2015d7"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "1feb18e453699f8a40259512b020694c"
  },
  {
    "url": "notification.webp",
    "revision": "e56e818d34e62bd8e06e091daeb9ff62"
  },
  {
    "url": "package-lock.json",
    "revision": "53603f23aaa61351e1fedf1a99db897f"
  },
  {
    "url": "package.json",
    "revision": "6b1a2940edcf059bb142153e3843c112"
  },
  {
    "url": "paper.svg",
    "revision": "7e4d965c79ec7770288b880dca5f0bdc"
  },
  {
    "url": "paper.webp",
    "revision": "44f2b532e4641db9f532b81e5eeda3a2"
  },
  {
    "url": "poker-table-background.webp",
    "revision": "69b42edd66ac3e1af9a931489e421dda"
  },
  {
    "url": "Q.webp",
    "revision": "5bd044717ea1b3e3431daebf0fe9c48d"
  },
  {
    "url": "rocks.svg",
    "revision": "8a1b3b41c9ff2c25ac21244052837bf3"
  },
  {
    "url": "rocks.webp",
    "revision": "286712be16d5108645236744edfb81fd"
  },
  {
    "url": "safari-pinned-tab.svg",
    "revision": "25cabf09e95a84880eb298f558dc1117"
  },
  {
    "url": "scissors.svg",
    "revision": "6fce6ab3ea5f9c8a3165e77b3f467074"
  },
  {
    "url": "scissors.webp",
    "revision": "0cb76ff0d683c5cc0900e4ac328851f7"
  },
  {
    "url": "script.js",
    "revision": "95c170a4e49a52dc815fd7a6611e7ca6"
  },
  {
    "url": "service_worker.js",
    "revision": "a6e3f0c8a63c7c30a80415f195d0fdf9"
  },
  {
    "url": "src-sw.js",
    "revision": "9077f24afc5033bffadec9dfde27baa5"
  },
  {
    "url": "styles.css",
    "revision": "8f254db8a49a93ea27760ad98ea2ae56"
  },
  {
    "url": "swish.m4a",
    "revision": "af479ba9668b893cbf56fc2d39eeeb5a"
  },
  {
    "url": "workbox-config.js",
    "revision": "dab151155360ac52342e85a1ac3cda8e"
  }
]);