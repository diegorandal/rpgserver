import { defineConfig } from '@rpgjs/server'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8000
  },
  vite: {
    server: {
      host: '0.0.0.0',
      port: 3001,
      https: false
    }
  }
})
