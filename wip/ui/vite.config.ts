
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import SimpleGit from 'simple-git'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import {resolve} from 'node:path'

// const git = SimpleGit({
//   baseDir: resolve(process.cwd(), '../../') 
// })

//   const SHA = await git.revparse(['HEAD'])
//   const LASTEST_TAG = (await git.raw(['describe', '--tags', '--abbrev=0'])).trim()
//   const LASTEST_TAG_SHA = await git.revparse([LASTEST_TAG])
  



// with type safety config
export default defineConfig(({mode})=>(
  {

    base: '/play/',
    resolve: {
      // alias,
    },
    clearScreen: false,
    // define: {
    //   __SHA__: JSON.stringify(SHA),
    //   __LASTEST_TAG__: JSON.stringify(LASTEST_TAG),
    //   __LASTEST_TAG_SHA__: JSON.stringify(LASTEST_TAG_SHA),
    // },
    plugins: [
      mode === 'react' ? react(): vue(),
      Components({
        dirs: [
          'src/components',
          // '../packages/inspector/client/components',
        ],
        dts: 'src/components.d.ts',
      }),
      AutoImport({
        imports: [
          // 'vue',
          // '@vueuse/core',
          'react',
          'react-router-dom',
        ],
        dirs: [
          // 'src/composables',
          'src/hooks'
        ],
        vueTemplate: true,
        dts: 'src/auto-imports.d.ts',
      }),
    ],
    optimizeDeps: {
      exclude: []
    },
    build: {
      outDir: '../docs/dist/play',
      emptyOutDir: true,
    },
  }
))