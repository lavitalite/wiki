import { defineConfig, createLogger } from 'vite'
import path, { resolve } from 'path'
import { fileURLToPath } from 'node:url'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import { groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const logger = createLogger();

export default defineConfig({
  optimizeDeps: {
    exclude: [
      'vitepress',
    ],
  },
  logLevel: 'info',
  clearScreen: false,
  resolve: {
    alias: {
      "@utils": resolve(__dirname, "./utils"),
      "@": resolve(__dirname, "./content"),
      "@oss": resolve(__dirname, "./oss"),
    }
  },
  plugins: [
    {
      name: 'vite:debug-alias',
      configResolved(config) {
        debugger
        logger.info(`Alias config: ${JSON.stringify(config.resolve.alias)}`);
      },
      resolveId(id) {
        if (id.startsWith('@utils')) {
          logger.info(`Resolving @utils path: ${id}`);
        }
      },
    },
    Inspect({
      build: true,
      dev: true,
      outputDir: '.vite-inspect',
    }),
    Components({
      dirs: [
        "components",
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/,
      ],
      dts: "components.d.ts"
    }),
    AutoImport({
      imports: [
        "vue",
        //  "@vueuse/core"
      ],
      dirs: ["composables"],
      vueTemplate: true,
      dts: "auto-imports.d.ts"
    }),
    groupIconVitePlugin({
      customIcon: {
        'docker': 'vscode-icons:file-type-docker2',
        'k8s': localIconLoader(import.meta.url, './assets/devicon--kubernetes.svg'),
        'dir': localIconLoader(import.meta.url, './assets/mingcute--directory-line.svg'),
        'bnf': localIconLoader(import.meta.url, './assets/file-icons--bnf.svg'),
      },
    }),

  ],
})

