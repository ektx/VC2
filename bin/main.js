const { createServer } = require('vite')
const express = require('express')
const bodyParser = require('body-parser')
const vue = require('@vitejs/plugin-vue')
const router = require('./router')

;(async () => {
  const app = express()
  const server = await createServer({
    // @ts-ignore
    plugins: [vue()],
    configFile: '',
    server: {
      middlewareMode: true,
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js'
      }
    }
  })

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())

  app.use(router)
  app.use(server.middlewares)

  app.listen(3000)
})();
