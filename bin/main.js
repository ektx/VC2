const { createServer } = require('vite')
const Router = require('koa-router')
const MarkdownIt = require('markdown-it')
const fs = require('fs/promises')
const path = require('path')

let router = new Router()

router.get('/api/doc/:file', async ctx => {
  let file = path.join(__dirname, `../doc/${ctx.params.file}`)
  let str = await fs.readFile(file, { encoding: 'utf-8'})
  let md = new MarkdownIt()
  let html = md.render(str)

  html = `<div class="markdown-it-mode">${html}</div>`

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
    // You can do pre-processing here - this will be the raw incoming requests
    // before vite touches it.
    // console.log('path:', ctx.path)
    // console.log('response:', ctx.path)
    if (ctx.path.endsWith('.md')) {
      // Note vue <style lang="xxx"> are supported by
      // default as long as the corresponding pre-processor is installed, so this
      // only applies to <link ref="stylesheet" href="*.scss"> or js imports like
      // `import '*.scss'`.
      console.log('pre processing: ', ctx.url)
      ctx.type = 'json'
      // ctx.body = 'body { border: 1px solid red }'
      // let md = new MarkdownIt()
      // console.log(md.render('# hello'))
      // ctx.body = { data: md.render('# hello world') }
    }

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