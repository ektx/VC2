import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import virtualRouter from './server/virtualRouter'

export default defineConfig({
  root: resolve(__dirname, 'example'),
  server: {
    port: 3010
  },
  plugins: [vue(), virtualRouter()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'packages/index.js'),
      name: 'vc2',
      // the proper extensions will be added
      fileName: 'vc'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@src': resolve(__dirname, 'example'),
      '@packages': resolve(__dirname, 'packages')
    }
  }
})
