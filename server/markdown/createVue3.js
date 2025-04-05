import fs from 'fs-extra'
import { dirname, basename, join } from 'path'
import parse from './parse.js'

/**
 * 创建组件
 * @param {string} mdFile md文档绝对路径
 * @param {string} savePath 保存路径
 */
export default async function (mdFile, savePath) {
  let saveDir = dirname(savePath)
  let name = basename(mdFile, '.md')
  let { html, children } = await parse(mdFile, saveDir)
  let importChildStr = ''
  let componentsStr = ''

  children.forEach(({ base, name, path, data, include }) => {
    componentsStr += `${base}, `

    // 对于引用文件 #[vue](./xxx.vue)
    if (include) {
      importChildStr += `import ${base} from '${path}'\n`
    } else {
      // 将内嵌的 vue 组件写入到 node_modules/._server_ 目录下
      importChildStr += `import ${base} from './${name}'\n`
      // 输出子组件  vue文件
      console.log('create child vue file111', savePath)

      try {
        fs.outputFileSync(join(saveDir, name), data, {
          encoding: 'utf8'
        })
      } catch (error) {
        console.log('create child vue file error', error)
      }
    }
  })

  const vueIndex = `
<template>
  <article class="vipress-article">
    ${html}
  </article>
</template>

<script>
import { TOCData } from '@src/store'

${importChildStr}
export default {
  name: '${name}-auto-view',
  components: { ${componentsStr} },
  mounted() {
    this.setTOCData()
  },
  updated() {
    this.setTOCData()
  },
  methods: {
    setTOCData() {
      let result = []
      let heades = this.$el.querySelectorAll(':scope > .vipress-heading')
  
      heades.forEach((h) => result.push(h))
      TOCData.value = result
    }
  }
}
</script>
  `

  await fs.outputFile(savePath, vueIndex, { encoding: 'utf8' })

  return Promise.resolve(vueIndex)
}
