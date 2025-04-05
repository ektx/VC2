import fs from 'fs/promises'
import MarkdownIt from 'markdown-it'
import markdownItForInline from 'markdown-it-for-inline'
import { codePlugin } from './codePlugin.js'
import { containerPlugin } from './containerPlugin.js'
import { headingPlugin } from './headingPlugin.js'
// import { includePlugin } from './includePlugin'
// import { linkPlugin } from './linkPlugin'

/**
 * 解析 markdown 为 vue 组件
 * @param {string} path markdown 文件绝对地址
 * @param {string} componentPath vue 组件保存位置
 * @example
 * import mdParse from './mdParse'
 * let { html } = await mdParse('文件绝对地址')
 */
export default function (path, componentPath) {
  return new Promise(async resolve => {
    let str = await fs.readFile(path, { encoding: 'utf8' })

    let md = new MarkdownIt({
      html: true,
      // 文字地址自动转换成连接
      linkify: false,

      // 以下自定义内容

      // 扩展子级内容
      children: [],
      // md 文件位置
      path,
      // 组件保存位置
      componentPath
    })

    md.use(codePlugin)
    md.use(containerPlugin)
    md.use(headingPlugin)
    // md.use(includePlugin)
    // md.use(linkPlugin)

    resolve({
      html: md.render(str),
      children: md.options.children
    })
  })
}
