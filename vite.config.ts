import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/public/Adobe_2505_192px.png'], // optional extra assets
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
            src: '/Adobe_2505_192px.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon2505_512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon2505_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
