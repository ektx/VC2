const { createServer } = require('vite')
const Router = require('koa-router')
const MarkdownIt = require('markdown-it')
const Prism = require('prismjs')
const fs = require('fs')
const path = require('path')
const mdVue = require('./vue')

require('prismjs/components/prism-diff')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-less')
require('prismjs/plugins/autolinker/prism-autolinker')

let router = new Router()

// 获取 doc 中的 markdown 文件
router.get('/api/doc', async ctx => {
  let file = path.join(__dirname, `../doc/${ctx.request.query.file}`)
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
  let html = md.render(str)

  html = `<div class="markdown-it-mode">${html}</div>`
  
  ctx.type = 'json'
  ctx.body = { data: html }
})

// 获取 icon json
router.get('/api/icons', async ctx => {
  let file = path.join(__dirname, '../example/data/iconfont.json')
  ctx.body= fs.createReadStream(file, {encoding: 'utf8'})
})

const myPlugin = ({
  root, // 项目目录的绝对地址
  app, // Koa app
  server, // raw http server instance
  watcher, // chokidar file watcher instance
}) => {
  app
    .use(router.routes())
    .use(async (ctx, next) => {

      // ...wait for vite to do built-in transforms
      await next()

      // Post processing before the content is served. Note this includes parts
      // compiled from `*.vue` files, where <template> and <script> are served as
      // `application/javascript` and <style> are served as `text/css`.
      if (ctx.response.is('js')) {
        console.log(ctx.url)
      }
    })
}

createServer({
  configureServer: [myPlugin],
  alias: {
    // vue: 'vue/dist/vue.esm-bundler.js'
  }
}).listen(3000, () => {
  console.log('App Running at: http://localhost:3000/')
})