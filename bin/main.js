const { createServer } = require('vite')
const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const vue = require('@vitejs/plugin-vue')
const router = require('./router')

const myPlugin = ({
  root, // 项目目录的绝对地址
  app, // Koa app
  server, // raw http server instance
  watcher, // chokidar file watcher instance
  resolver
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
        console.log(chalk.green(`[JS] `) + ctx.url)
      }

    })
    
  watcher.on('change', file => {
    if (file.endsWith('.md')) {
      const path = resolver.fileToRequest(file)

      watcher.send({
        type: 'markdown-reload',
        file,
        path
      })

      console.log(chalk.green(`[MD] `) + path)
    }
  })
}

;(async () => {
  const app = express()
  const server = await createServer({
    // @ts-ignore
    plugins: [vue()],
    configFile: '',
    server: {
      middlewareMode: true,
    },
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  })

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())

  app.use(router)
  app.use(server.app)

  app.listen(3000)
})();
