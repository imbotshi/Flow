import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Écoute sur toutes les interfaces réseau
    proxy: {
      '/api': {
        target: 'http://192.168.1.216:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/auth': {
        target: 'http://192.168.1.216:5000',
        changeOrigin: true,
        secure: false
      },
      '/user': {
        target: 'http://192.168.1.216:5000',
        changeOrigin: true,
        secure: false
      },
      '/upload': {
        target: 'http://192.168.1.216:5000',
        changeOrigin: true,
        secure: false
      },
      '/static': {
        target: 'http://192.168.1.216:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
