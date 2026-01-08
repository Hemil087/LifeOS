import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // allows PWA testing in dev
      },
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Finance Tracker",
        short_name: "Finance",
        description: "Track goals and expenses easily",
        theme_color: "#6366f1",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
