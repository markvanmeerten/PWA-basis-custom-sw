import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      srcDir: "src",
      filename: "custom-sw.js",
      strategies: "injectManifest",
      injectManifest: {
        swSrc: "src/custom-sw.js",
      },
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "My Counter",
        short_name: "Counter",
        description: "Increase by one..",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        offline_enabled: true,
        icons: [
          {
            src: "logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    proxy:
      mode === "development"
        ? {
            "/api": {
              target: "http://laravel-backend:8000",
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
    },
  },
}));
