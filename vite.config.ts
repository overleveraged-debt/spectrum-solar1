import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022',
    cssTarget: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router') || id.includes('@remix-run')) {
              return 'vendor-router';
            }
            if (id.includes('react-dom')) {
              return 'vendor-dom';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('@sanity')) {
              return 'vendor-sanity';
            }
          }
        },
      },
    },
  },
});
