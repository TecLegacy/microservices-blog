import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // deploy to docker container
  // base: '/',
  server: {
    host: true,
    strictPort: true,
    port: 9002,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //   },
    // },
  },
});
