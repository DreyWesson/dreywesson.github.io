const staticCache = 'static-site-v3.1';
// const dynamicCache = 'dynamic-site-v1.6';

const assetsToCache = [
  '/', 'index.html', '/app.js', '/script.js', '/styles.css', 'manifest.json',
  '/img002.webp', 'rocks.webp', 'paper.webp', 'scissors.webp', 'card.webp',
  '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp', '9.webp', 
  '10.webp', 'K.webp', 'J.webp', 'Q.webp', 'A.webp', 'aww.mp3', 'cash.mp3',
  'swish.m4a', 'poker-table-background.jpg', 'github-icon.webp', 'card.png',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css?family=Tomorrow&display=swap',
  'https://fonts.googleapis.com/css?family=Dancing+Script&display=swap',
  'https://fonts.gstatic.com/s/tomorrow/v2/WBLmrETNbFtZCeGqgRXce2DiLsipsE4.woff2',
  'https://fonts.gstatic.com/s/tomorrow/v2/WBLmrETNbFtZCeGqgRXSe2DiLsip.woff2',
  'https://fonts.gstatic.com/s/dancingscript/v13/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Rep8hNP6pnxP.woff2',
  'https://fonts.gstatic.com/s/dancingscript/v13/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3ROp8hNP6pnxP.woff2',
  'https://fonts.gstatic.com/s/dancingscript/v13/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Sup8hNP6pg.woff2',
  '/firestore.html'
];

// Cache size limit function
// const limitCacheSize = (name, size) => {
//   caches.open(name).then(cache => {
//     cache.keys().then(keys => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(limitCacheSize(name,size));
//       }
//     })
//   })
// }


//adds our assetsToCache to cache storage
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(staticCache).then(cache => {
      console.log(`Cashing Shell Assets: ${cache.addAll(assetsToCache)}...`);
      cache.addAll(assetsToCache);
    })
  );
})

//filters and delete old caches
self.addEventListener('activate', e => {
  console.log(`service worker has been activated`);
  e.waitUntil(
    caches.keys().then(keys => {
      console.log(keys)
      return Promise.all(keys
        .filter(key => key !== staticCache)
        .map(key => caches.delete(key))
      )
    })
  )
})

//checks if assetsToCache match request
self.addEventListener('fetch', e => {
  console.log(`Assets are being fetched...`, e);

  e.respondWith(
    caches.match(e.request).then(cacheResponse => {
      //return the cached || create a new cache for the new request
      return cacheResponse || fetch(e.request);
    })
  )
})