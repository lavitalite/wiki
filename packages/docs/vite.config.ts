import { defineConfig, createLogger } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import { groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'


// import { fileURLToPath } from 'node:url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)


const cwd = path.dirname(fileURLToPath(import.meta.url))
const logger = createLogger();

export default defineConfig({
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @use "./.vitepress/theme/styles/settings/_colors.scss";
  //       `
  //     }
  //   }
  // },
  optimizeDeps: {
    exclude: [
      'vitepress',
    ],
  },
  logLevel: 'info',
  clearScreen: false,
  resolve: {
    alias: {
      "@utils": path.resolve(cwd, "./utils"),
      "@components": path.resolve(cwd, "./.vitepress/theme/components"),
      "@oss": path.resolve(cwd, "oss"),
    }
  },
  plugins: [
    {
      name: 'vite:debug-alias',
      configResolved(config) {
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
        'k8s': localIconLoader(import.meta.url, './assets/kubernetes.svg'),
        'dir': localIconLoader(import.meta.url, './assets/directory-line.svg'),
        'bnf': localIconLoader(import.meta.url, './assets/bnf.svg'),
      },
    }),

  ],
})

