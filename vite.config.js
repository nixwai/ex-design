import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: path.resolve(__dirname, 'packages')
      }
    ]
  }
})