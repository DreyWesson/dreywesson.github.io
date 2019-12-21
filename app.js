
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log(`service worker registered`, reg))
    .catch((err) => console.log(`service worker not registered: ${err}`));
}


// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('sw.js')
//     .then(registration => {
//       console.log('SW registered with scope:', registration);
//     })
//     .catch(err => {
//       console.error('Registration failed:', err);
//     });
//   });
// }

