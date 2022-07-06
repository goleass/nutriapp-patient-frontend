import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss,
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        theme_color: "#FFFFFF",
        
      }
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: ((value: string) => { return value.replace(/^~/, "") }) as unknown as string
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
