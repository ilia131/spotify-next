const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = ["/", "/offline"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match("/offline"))
  );
});






// const CACHE_NAME_STATIC = "pwa-static-v1";
// const CACHE_NAME_IMAGES = "pwa-images-v1";

// const STATIC_ASSETS = ["/", "/offline", "/favicon.ico"];

// // -------------------- Install --------------------
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME_STATIC).then((cache) => {
//       return cache.addAll(STATIC_ASSETS);
//     })
//   );
//   self.skipWaiting();
// });

// // -------------------- Activate --------------------
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((keys) =>
//       Promise.all(
//         keys.map((key) => {
//           if (![CACHE_NAME_STATIC, CACHE_NAME_IMAGES].includes(key)) {
//             return caches.delete(key);
//           }
//         })
//       )
//     )
//   );
//   self.clients.claim();
// });

// // -------------------- Fetch --------------------
// self.addEventListener("fetch", (event) => {
//   const url = new URL(event.request.url);

//   // ---------- عکس‌های داینامیک ----------
//   if (url.pathname.startsWith("/artists/") || url.pathname.includes("/uploads/")) {
//     event.respondWith(
//       caches.open(CACHE_NAME_IMAGES).then((cache) =>
//         fetch(event.request)
//           .then((response) => {
//             // Response جدید را cache کن
//             cache.put(event.request, response.clone());
//             return response;
//           })
//           .catch(() =>
//             // اگر شبکه قطع بود، cache قبلی رو بده
//             caches.match(event.request)
//           )
//       )
//     );
//     return;
//   }

//   // ---------- سایر درخواست‌ها (صفحات و js/css) ----------
//   event.respondWith(
//     fetch(event.request)
//       .then((response) => {
//         // صفحات و فایل‌های js/css را cache کن
//         if (
//           event.request.method === "GET" &&
//           STATIC_ASSETS.includes(url.pathname)
//         ) {
//           caches.open(CACHE_NAME_STATIC).then((cache) => {
//             cache.put(event.request, response.clone());
//           });
//         }
//         return response;
//       })
//       .catch(() => caches.match("/offline"))
//   );
// });

