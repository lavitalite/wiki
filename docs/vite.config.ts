import { defineConfig, createLogger } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
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
    Components({
      dirs: [
        '.vitepress/theme/components',
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/,
      ],
      dts: "components.d.ts"
    }),
    AutoImport({
      imports: [
        "vue",
        // "@vueuse/core"
      ],
      dirs: [
        "./.vitepress/theme/composables",
        "./.vitepress/theme/components",
      ],
      vueTemplate: true,
      dts: "auto-imports.d.ts"
    }),
    groupIconVitePlugin({
      customIcon: {
        'docker': 'vscode-icons:file-type-docker2',
        'k8s': localIconLoader(import.meta.url, './icons/kubernetes.svg'),
        'dir': localIconLoader(import.meta.url, './icons/directory-line.svg'),
        'bnf': localIconLoader(import.meta.url, './icons/bnf.svg'),
      },
    }),

  ],
})

