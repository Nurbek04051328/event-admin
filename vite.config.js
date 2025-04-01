import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4140,
    proxy: {
      '/api': {
        target: 'https://backend.eventum.uz',
        changeOrigin: true,
        secure: true, // Certbot sertifikati borligi uchun true qilamiz
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'https://backend.eventum.uz',
        ws: true,
        changeOrigin: true,
        secure: true // WebSocket ham HTTPS orqali ishlaydi
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
