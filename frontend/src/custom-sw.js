import { clientsClaim } from "workbox-core";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

// De APP kan een message sturen zodat de SW de ‘wachtende’ status overslaat en meteen actief wordt
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.skipWaiting(); // ← direct actief maken
clientsClaim(); // ← Neem alle tabs over

console.log("Service Worker gestart");

// Maak oude caches leeg
cleanupOutdatedCaches();

// Deze array wordt automatisch gevuld door Vite tijdens build en bevat waardes zoals:
// [
//   { url: "/index.html", revision: "e17c..." },
//   { url: "/assets/index-abc123.js", revision: null },
//   { url: "/manifest.webmanifest", revision: "f02d..." },
// ]
precacheAndRoute(self.__WB_MANIFEST);

// Let op! Werkt alleen voor GET routes
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
          
          return response.ok ? response : null;
        },
      },
      new ExpirationPlugin({
        maxEntries: 2,
        maxAgeSeconds: 4,
      }),
    ],
  }),
);

self.addEventListener("fetch", (event) => {
  console.log("Intercepted fetches that have not been caught by Workbox:" + event.request.url);
});