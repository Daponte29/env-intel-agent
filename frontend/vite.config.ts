import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,        // listen on 0.0.0.0 so Docker can expose the port
    watch: {
      usePolling: true, // required for hot reload inside Docker on Windows
    },
  },
})
