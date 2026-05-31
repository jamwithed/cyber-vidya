import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base: './'` makes all asset URLs relative, so the build works whether it is
// served from a domain root (Cloudflare Pages / custom domain) or a project
// sub-path (GitHub Pages, e.g. /cyber-vidya/). Hash routing is unaffected.
export default defineConfig({
  base: './',
  plugins: [react()],
})
