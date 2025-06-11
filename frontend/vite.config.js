import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "custom-sw.js",
      injectManifest: {
        swSrc: "src/custom-sw.js",
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,png,svg,ico,webmanifest}"],
        modifyURLPrefix: {
          "assets/": "/assets/",
        },
      },
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "pwa-icon.png",
      ],
      manifest: {
        name: "Technova PWA-basis",
        short_name: "PWA-basis",
        description: "Gebruik dit tempalte als basis voor je PWA project",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        offline_enabled: true,
        icons: [
          {
            src: "pwa-icon.png",
            sizes: "200x200",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
