import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import  {resolve} from 'node:path' 

console.log(resolve(__dirname, './src')); // Debug path
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 5174
  }
})
