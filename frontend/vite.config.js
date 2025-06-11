import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  console.log(mode);

  return {
    plugins: [
      react(),
      VitePWA({
        devOptions: {
          enabled: false,
          type: 'module',
        },
        srcDir: 'src',
        filename: 'custom-sw.js',
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
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
          description: "Gebruik dit template als basis voor je PWA project",
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
    server: {
      allowedHosts: ['.ngrok-free.app'],
      watch: {
        usePolling: true,
      },
    },
    preview: {
      allowedHosts: ['.ngrok-free.app'],
      host: '0.0.0.0',
      port: 4173,
    },  
  };
});
