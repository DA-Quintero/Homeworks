import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-d3-graph',
      'd3',
      'd3-drag',
      'd3-force',
      'd3-selection',
      'd3-shape',
      'd3-zoom'
    ],
  },
})
