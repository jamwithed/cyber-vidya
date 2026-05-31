import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Cloudflare (served at the domain root) is the canonical host, so assets use an
// absolute base. This makes the SPA fallback render correctly for ANY path,
// including unknown nested paths served index.html by Workers static assets.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
