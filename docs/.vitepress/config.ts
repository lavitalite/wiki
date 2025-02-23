/// <reference types="vite/client" />
import { defineConfig } from "vitepress"
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { fileURLToPath } from 'node:url'
import { themeConfig } from './config/theme'
import { head } from './config/head'
import { markdown } from './config/markdown'
// const __dirname = dirname(fileURLToPath(import.meta.url));

// export const BASE_PATH = '/wiki/';

export default defineConfig({
  // base: BASE_PATH,
  outDir: '.vitepress/dist',
  cacheDir: '.vitepress/cache',
  lastUpdated: true,
  markdown,
  vite: {
    configFile: fileURLToPath(import.meta.resolve('../vite.config.ts'))
  },
  head,
  themeConfig,
})