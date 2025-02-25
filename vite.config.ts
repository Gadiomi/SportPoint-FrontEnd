import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      components: '/src/components',
      theme: '/src/theme',
      hooks: '/src/hooks',
      pages: '/src/pages',
    },
  },
  build: {
    outDir: './dist',
    assetsDir: './dist/assets',
  },
});
