import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    visualizer({
      open: false,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 500,
    assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.ktx2'],
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'vendor-three'
          if (id.includes('node_modules/@react-three')) return 'vendor-r3f'
          if (
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/gsap') ||
            id.includes('node_modules/animejs')
          )
            return 'vendor-animation'
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons'
          return undefined
        },
      },
    },
  },
})
