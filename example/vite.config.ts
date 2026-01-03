import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import virtualRouter from '../server/virtualRouter.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/VC2/',
  server: {
    port: 3010
  },
  plugins: [vue(), vueJSX(), virtualRouter()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@src': resolve(__dirname, '.'),
      '@packages': resolve(__dirname, '../packages/vc2'),
      '@ektx/vc2': resolve(__dirname, '../packages/vc2/index.ts')
    }
  }
})
