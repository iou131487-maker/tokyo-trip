
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 如果你的 GitHub Repository 名字是 tokyo-trip，這裡要改為 /tokyo-trip/
  base: './', 
})
