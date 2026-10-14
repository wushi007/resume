import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径：产物既能放根目录，也能放 GitHub Pages 的子路径
  // （https://<user>.github.io/<repo>/）而不必再改 base。
  base: './',
  plugins: [react(), tailwindcss()],
})
