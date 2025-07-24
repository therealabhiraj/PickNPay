import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 server: {
    proxy: {
      '/api': { // This tells Vite to proxy requests starting with /api
        target: 'http://localhost:5000', // Your backend server address
        changeOrigin: true, // Needed for virtual hosted sites
        // The rewrite rule below ensures that /api is kept in the path
        // when forwarded to the backend, matching your /api/common routes.
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  // --- END OF 'server' BLOCK ---
 logLevel: 'info', // Ensure info logs are shown
  customLogger: {
    warn: (msg) => console.log('Vite config warning:', msg),
    info: (msg) => console.log('Vite config info:', msg),
    error: (msg) => console.log('Vite config error:', msg),
  },
  // Or simply:
  // A more direct log within the defineConfig call itself:
  // console.log('Vite config file is being processed!'); // This might show up in the terminal
});

console.log('Vite config file loaded at top level!'); 

