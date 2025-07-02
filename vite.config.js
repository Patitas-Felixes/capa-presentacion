import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: { //para el entorno de desarrollo
      '/backend': {
        target: 'http://contenedor_app:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, '')
      }
    },
    watch: {
      usePolling: true  // Importante para detectar cambios en Docker
    },
    host: '0.0.0.0',    // Permite acceso desde fuera del contenedor
    hmr: {
      clientPort: 5173  // Puerto expuesto al host
    }
  }
})
