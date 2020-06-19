const { createServer } = require('vite')
const Router = require('koa-router')
const MarkdownIt = require('markdown-it')
const fs = require('fs/promises')
const path = require('path')
const mdVue = require('./vue')

let router = new Router()

router.get('/api/doc/:file', async ctx => {
  let file = path.join(__dirname, `../doc/${ctx.params.file}`)
  let str = await fs.readFile(file, { encoding: 'utf-8'})
  let md = new MarkdownIt()
    .use(mdVue)
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
      console.log('post processing: 9', ctx.url)
      // console.log(ctx.body) // can be string or Readable stream
    }
  })
}

createServer({
  configureServer: [myPlugin],
  alias: {
    vue: 'vue/dist/vue.esm-bundler.js'
  }
}).listen(3000)