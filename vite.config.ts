import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径：产物既能放根目录，也能放 GitHub Pages / Cloudflare Pages
  // 的子路径而不必再改 base。
  base: './',

  server: {
    // 开发时通过 Cloudflare 临时隧道（*.trycloudflare.com）在手机上预览需要放行该域名。
    // 隧道域名每次随机，故用前导点匹配子域。只影响 dev server，不影响构建产物。
    allowedHosts: ['.trycloudflare.com'],
  },

  plugins: [react(), tailwindcss()],
})
