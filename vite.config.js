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
      fileName: 'vc',
      cssFileName: 'index'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          dir: `./lib/es`
        },
        {
          //打包格式
          format: 'cjs',
          //打包后文件名
          entryFileNames: '[name].cjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: `./lib/cjs`
        }
      ]
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
