/// <reference types="vite/client" />
import { defineConfig } from "vitepress"
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { fileURLToPath } from 'node:url'

export const BASE_PATH = '/zest-ui/'
export default defineConfig({
  srcDir: 'content',
  base: BASE_PATH,
  outDir: 'dist',
  cacheDir: 'cache',
  markdown: {
    config: (md) => {
      md.use(groupIconMdPlugin)
    }

  },
  vite: {
    configFile: fileURLToPath(import.meta.resolve('../vite.config.ts'))
  },
  themeConfig: {
    // theme-level options
  }
})