import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      // Proxy for Schiphol API
      '/api/schiphol-flights': {
        target: 'https://api.schiphol.nl/public-flights/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/schiphol-flights/, ''),
      },

      // Proxy for your local backend (Node.js Express)
      '/api': {
        target: 'http://localhost:5000', // Your Node.js server
        changeOrigin: true,
      },
      // Proxy for SerpAPI or other third-party APIs
      '/api/serp': {
        target: 'https://serpapi.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/serp/, ''), // Adjust as needed
      },
    },
  },
});

