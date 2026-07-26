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
  },
})
