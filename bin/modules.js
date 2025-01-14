const path = require('node:path')
const fs = require('fs')
const { rollup } = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const esbuild = require('rollup-plugin-esbuild')
const postcss = require('rollup-plugin-postcss')

exports.buildModules = async () => {
  const input = [
    // path.resolve(__dirname, '../packages/components/button/index.vue')
    // path.resolve(__dirname, '../packages/components/buttonGroup/index.vue')
    path.resolve(__dirname, '../packages/components/tabs/tabNav.jsx')
  ]
  const target = 'es2018'

  const bundle = await rollup({
    input,
    plugins: [
      // postcss({
      //   extract: true//  path.resolve(__dirname, '../dist/es/button/index.css')

      // }),
      vue({
        isProduction: true
      }),
      vueJsx(),
      nodeResolve(),
      esbuild.default({
        target,
        sourceMap: true
      })
    ],
    treeshake: false,
    external: ['vue']
  })

  console.log(bundle.generate)

  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: path.resolve(__dirname, '../dist/es'),
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: path.resolve(__dirname, '../packages/components'),
      entryFileNames: '[name].js'
    })

    // bundle.write({
    //   file: path.resolve(__dirname, '../dist/es/a001.js'),
    //   format: 'esm',
    //   name: 'test',
    //   sourcemap: false
    // })

    // fs.writeFileSync(
    //   path.resolve(__dirname, '../dist/es/abc.js'),
    //   JSON.stringify(bundle, null, '  ')
    // )

    // bundle.write({
    //   format: 'cjs',
    //   dir: path.resolve(__dirname, '../dist/lib'),
    //   exports: 'named',
    //   preserveModules: true,
    //   preserveModulesRoot: path.resolve(__dirname, '../packages/components'),
    //   entryFileNames: '[name].js'
    // })
  ])
}
