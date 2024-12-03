
import {defineConfig, loadEnv} from 'vite'
import * as process from 'node:process'
import createVitePlugins from './vite/plugins'
import path from 'node:path'

// Config Intellisense
/** @type {import('vite').UserConfig} */


export default defineConfig(
  ({mode, command}) => {
    const env = loadEnv(mode, process.cwd())
    const {VITE_APP_ENV} = env
    return {
      base: VITE_APP_ENV === 'production' ? '/admin' : '/',
      plugins: createVitePlugins(env, command === 'build',
      ),
      resolve: {
        alias: {
          '~': path.resolve(__dirname, './'),
          '@': path.resolve(__dirname, './src')
        },
        extensions: ['.mjs','.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
      server: {
        port: 80,
        host: true,
        open: true,
        porxy: {
          '/dev-api': {
            target: 'http://localhost:8000',
            changeOrigin: true,
            rewrite: p => p.replace(/^\/dev-api/, '')
          }
        }
      },
      css: {
        postcss: {
          plugins: [
            {
              postcssPlugin: 'internal: charset-removal',
              AtRule: {
                charset: (atRule) => {
                  if (atRule.name === 'charset') {
                    atRule.remove()
                  }
                }
              }
            }
          ]
        }
      }
    }
  }
)