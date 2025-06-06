import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/components',
      hooks: '/src/hooks',
      common: '/src/common',
      pages: '/src/pages',
      contexts: '/src/contexts',
      firestore: '/src/firestore',
      mocks: '/mocks',
    },
  },
});
