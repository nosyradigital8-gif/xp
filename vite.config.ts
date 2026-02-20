// FILE PATH: vite.config.ts  (project root)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Force Vite to always use ONE copy of these packages.
    // Without this, lucide-react (and previously react-paystack) each
    // bundle their own React, causing the useContext null crash.
    dedupe: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'lucide-react',
    ],
  },
  optimizeDeps: {
    // Also tell esbuild pre-bundler to deduplicate React
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'lucide-react',
    ],
  },
  build: {
    rollupOptions: {
      // Ensure Rollup also uses a single React instance in the final bundle
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/react-router/')) {
            return 'router-vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'lucide-vendor';
          }
        },
      },
    },
  },
});
