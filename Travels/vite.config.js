import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import cloudflareTunnel from "vite-plugin-cloudflare-tunnel";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflareTunnel()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
