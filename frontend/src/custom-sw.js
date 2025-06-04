import { clientsClaim } from "workbox-core";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

clientsClaim();
self.skipWaiting(); // ← direct actief maken

cleanupOutdatedCaches();

// Deze array wordt automatisch gevuld door Vite tijdens build en bevat waardes zoals:
// [
//   { url: "/index.html", revision: "e17c..." },
//   { url: "/assets/index-abc123.js", revision: null },
//   { url: "/manifest.webmanifest", revision: "f02d..." },
// ]
precacheAndRoute(self.__WB_MANIFEST);

console.log("Service Worker gestart");

registerRoute(
  ({ url }) => {
    const matched =
      url.origin === "http://localhost:8000" &&
      url.pathname.startsWith("/api/increment/");
    if (matched) console.log("[SW] Matched:", url.href);
    return matched;
  },
  new StaleWhileRevalidate({
    cacheName: "api-increment-cache",
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          const body = await response.clone().text();
          console.log("[SW] Caching response:", body.slice(0, 100));
          
          return response;

          // return response.ok ? response : null;
        },
      },
      new ExpirationPlugin({
        maxEntries: 2,
        maxAgeSeconds: 10,
      }),
    ],
  }),
  "GET"
);


// registerRoute(
//   // ({ url }) => {
//   //   console.log("[SW] Checking route:", url.href);
//   //   return url.pathname.startsWith("/api/increment/");
//   // },
//   ({ url }) => {
//     console.log("[SW] Checking route:", url.href);

//     return (
//       url.origin === "http://localhost:8000" &&
//       url.pathname.startsWith("/api/increment/")
//     );
//   },
//   new CacheFirst({
//     cacheName: "api-increment-cache",
//     plugins: [
//       {
//         cacheWillUpdate: async ({ request, response }) => {
//           console.log("[SW] Matched and caching:", request.url);
//           return response;
//         },
//       },
//       new ExpirationPlugin({ maxEntries: 3, maxAgeSeconds: 30 }),
//     ],
//   })
// );


// self.addEventListener("fetch", (event) => {
//   console.log("Intercepted fetch (other than /api/increment):" + event.request.url);
// });