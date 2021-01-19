const exporss = require('express')
const path = require('path')
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const iterator = require('markdown-it-for-inline')
const Prism = require('prismjs')
const mdVue = require('./vue')

// @ts-ignore
require('prismjs/components/prism-diff')
// @ts-ignore
require('prismjs/components/prism-bash')
// @ts-ignore
require('prismjs/components/prism-less')
// @ts-ignore
require('prismjs/plugins/autolinker/prism-autolinker')

const router = exporss.Router()

// 获取 doc 中的 markdown 文件
router.get('/doc/:file', async (req, res) => {

  let file = path.join(__dirname, `../doc/${req.params.file}.md`)
  let str = await fs.promises.readFile(file, { encoding: 'utf-8'})

  let md = new MarkdownIt({
    html: true,
    highlight(str, lang) {
      if (Prism.languages[lang]) {
        let grammar = Prism.languages[lang]
        // https://github.com/PrismJS/prism/issues/1171#issuecomment-631702602
        // 解决 autolink 无法正常工作问题
        Prism.hooks.run('before-highlight', { grammar })
        let code = Prism.highlight(str, grammar, lang)

        return `<pre class="language-${lang}"><code>${code}</code></pre>`
      }

      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    }
  }).use(mdVue)
    .use(iterator, 'url_new_win', 'link_open', function(tokens, idx) {
      let aIndex = tokens[idx].attrIndex('target')

      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank'])
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
      }
    })

  let html = md.render(str)
  html = `<div class="markdown-it-mode">${html}</div>`
  
  res.send({ data: html })
})

// 获取 icon json
router.get('/api/icons', async (req, res) => {
  let file = path.join(__dirname, '../example/data/iconfont.json')
  let readStream = fs.createReadStream(file, {encoding: 'utf8'})

  readStream.on('open', () => {
    readStream.pipe(res)
  })

  readStream.on('error', err => {
    res.end(err)
  })
})

module.exports = router