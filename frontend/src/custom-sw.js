import { clientsClaim } from "workbox-core";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

// Deze array wordt automatisch gevuld door Vite tijdens build en bevat waardes zoals:
// [
//   { url: "/index.html", revision: "e17c..." },
//   { url: "/assets/index-abc123.js", revision: null },
//   { url: "/manifest.webmanifest", revision: "f02d..." },
// ]
// Die workbox dan cached met de functie precacheAndRoute()
precacheAndRoute(self.__WB_MANIFEST);

console.log("Service Worker gestart");
self.addEventListener("fetch", (event) => {
  console.log("Intercepted fetch:", event.request.url);
});

// Cache alle /api/increment/:id requests
registerRoute(
  // Match alle routes die /api/increment/ bevatten – ongeacht de origin
  ({ url }) => {
    console.log("[SW] Checking route:", url.href);
    return url.pathname.startsWith("/api/increment/");
  },

  new CacheFirst({
    cacheName: "api-increment-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 86400,
      }),
    ],
  })
);
