import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'

const languageNameMap = {
  vue: 'markup',
  sh: 'shell'
}

export function codePlugin(md) {
  // override default fence renderer
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    let lang = languageNameMap[info] || info
    let result = token.content

    loadLanguages(lang)

    if (Prism.languages[lang]) {
      result = Prism.highlight(result, Prism.languages[lang], lang)
    }

    // 替换 {{ 标记 防止页面渲染时解析
    result = result
      .trim()
      .replace(/(?<!\{)\{{2}(?!\{)/g, '<span>&#123;&#123;</span>')

    return `<pre class="language-${info}"><code>${result}</code></pre>`
  }
}
