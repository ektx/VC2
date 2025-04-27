import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import virtualRouter from './server/virtualRouter'

const libConfig = {
  plugins: [
    vue(),
    vueJSX(),
    dts({
      entryRoot: './packages',
      outDir: [`./lib/es`, `./lib/cjs`]
    })
  ],
  build: {
    outDir: resolve(__dirname, 'lib'),
    emptyOutDir: true,
    copyPublicDir: false,

    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'packages/index.js'),
      cssFileName: 'index'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'vue-router',
        '@floating-ui/dom',
        'async-validator',
        'dayjs',
        'resize-observer-polyfill',
        /node_modules/
      ],
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
  }
}

const devConfig = {
  root: resolve(__dirname, 'example'),
  server: {
    port: 3010
  },
  plugins: [vue(), vueJSX(), virtualRouter()],

  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@src': resolve(__dirname, 'example'),
      '@packages': resolve(__dirname, 'packages')
    }
  }
}

export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  if (command === 'build') {
    return mode === 'lib' ? libConfig : {}
  }

  return devConfig
})
