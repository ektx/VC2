import {
  parse,
  rewriteDefault,
  compileScript,
  compileTemplate,
  compileStyle
} from '@vue/compiler-sfc'
import fs from 'fs'
import createVue3 from './markdown/createVue3'

const temSaveDir = 'node_modules/._server_'

export default function (options) {
  return {
    name: 'vite-plugin-markdown',
    enforce: 'pre',

    buildStart() {
      if (!fs.existsSync(temSaveDir)) {
        fs.mkdirSync(temSaveDir)
      }
    },
    async transform(code, id) {
      console.log('transform', id)
      if (!id.endsWith('.md')) return

      // 解析 SFC
      //   const { descriptor } = parse(`
      //   <template>
      //     <div>{{ msg }}</div>
      //   </template>
      //   <script setup>
      //     const msg = 'Hello'
      //   </script>
      //  <style></style>
      //   `)

      // 读取 .vue 文件
      const filename = 'Current.vue'
      const content = fs.readFileSync(id, 'utf-8')

      const vueSFC = await createVue3(id, filename)
      fs.writeFileSync(`${temSaveDir}/${filename}`, vueSFC)

      // 解析 SFC
      const { descriptor } = parse(vueSFC)

      // 编译 <script> 部分
      const script = compileScript(descriptor, {
        id: filename // 唯一 ID
      })

      // 编译 <template> 部分
      const template = compileTemplate({
        source: descriptor.template.content,
        id: filename,
        scoped: true,
        compilerOptions: {
          bindingMetadata: script.bindings
        }
      })

      // 编译 <style> 部分
      const styles = descriptor.styles.map((style, index) =>
        compileStyle({
          source: style.content,
          id: filename,
          filename,
          scoped: style.scoped
        })
      )

      // 输出结果
      const output = `
${rewriteDefault(script.content, '__sfc__')}
${template.code}
${styles.map(style => style.code).join('\n')}

__sfc__.render = render
__sfc__.__file = "src/App.vue"
export default __sfc__
`
      return {
        code: output,
        map: null // 如果可行，请提供 source map
      }
    }
  }
}
