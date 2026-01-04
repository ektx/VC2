import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJSX(),
    dts({
      entryRoot: '.',
      outDir: ['lib/es', 'lib/cjs'],
      afterBuild: () => {
        const targetDir = resolve(__dirname, 'lib')
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true })
        }
        copyFileSync(
          resolve(__dirname, 'package.json'),
          resolve(targetDir, 'package.json')
        )
        copyFileSync(
          resolve(__dirname, 'global.d.ts'),
          resolve(targetDir, 'global.d.ts')
        )
      }
    })
  ],
  build: {
    outDir: resolve(__dirname, 'lib'),
    emptyOutDir: true,
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      cssFileName: 'index'
    },
    rollupOptions: {
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
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          exports: 'named',
          dir: resolve(__dirname, 'lib/es')
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          preserveModules: true,
          exports: 'named',
          dir: resolve(__dirname, 'lib/cjs')
        }
      ]
    }
  }
})
