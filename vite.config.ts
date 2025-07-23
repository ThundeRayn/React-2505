import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/public/2505Icon_512.png','/public/2505Icon_192.png'], // optional extra assets
      manifest: {
        name: '2505Forever',
        short_name: '2505',
        start_url: '/',
        display: 'standalone',
        description: 'This is our place',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/2505Icon_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/2505Icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/2505Icon_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
