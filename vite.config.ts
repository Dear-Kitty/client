import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [],
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2,json}'],
        maximumFileSizeToCacheInBytes: 9999999999,
      },
      srcDir: '.',
      filename: 'sw.ts',
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
});
