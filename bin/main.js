const { createServer } = require('vite')
const Router = require('koa-router')
const MarkdownIt = require('markdown-it')
const Prism = require('prismjs')
const fs = require('fs/promises')
const path = require('path')
const mdVue = require('./vue')

let router = new Router()

router.get('/api/doc', async ctx => {
  let file = path.join(__dirname, `../doc/${ctx.request.query.file}`)
  let str = await fs.readFile(file, { encoding: 'utf-8'})
  let md = new MarkdownIt({
    html: true,
    highlight(str, lang) {
      if (lang) {
        try {
          let code = Prism.highlight(str, Prism.languages[lang], lang)

          return `<pre class="language-${lang}"><code>${code}</code></pre>`
        } catch (__) {}
      }

      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    }
  }).use(mdVue)
  let html = md.render(str)

  html = `<div class="markdown-it-mode">${html}</div>`
  
  ctx.type = 'json'
  ctx.body = { data: html }
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
        console.log('post processing:', ctx.url)
        // console.log(ctx.body) // can be string or Readable stream
      }
    })
}

createServer({
  // root: './example',
  // base: 'abcd',
  configureServer: [myPlugin],
  alias: {
    vue: 'vue/dist/vue.esm-bundler.js'
  }
}).listen(3000)