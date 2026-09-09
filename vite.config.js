import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      ignored: ['**/src/assets/images/News Page BG Image.png'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor'
            }

            if (
              id.includes('swiper') ||
              id.includes('react-toastify') ||
              id.includes('axios') ||
              id.includes('zod')
            ) {
              return 'ui-vendor'
            }

            return 'vendor'
          }

          if (id.includes('/src/pages/')) {
            return 'pages'
          }

          if (id.includes('/src/components/')) {
            return 'components'
          }

          if (id.includes('/src/services/')) {
            return 'services'
          }

          if (id.includes('/src/context/')) {
            return 'context'
          }

          if (id.includes('/src/hooks/')) {
            return 'hooks'
          }

          if (id.includes('/src/utils/')) {
            return 'utils'
          }
        },
      },
    },
  },
})
