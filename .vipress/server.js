const vuePlugin = require('@vitejs/plugin-vue')
const vueJSX = require('@vitejs/plugin-vue-jsx')

module.exports = {
  title: 'VC2', // 标题
  lang: 'zh-CN', // 网页语言
  icon: '/favicon.ico', // icon
  template: 'vue3',
  homeRoute: '/doc/welcome', // 首页路由地址
  build: {
    // 打包设置
    base: '/', // 公共基础路径
    outDir: 'dist' // 指定输出目录，默认 dist
  },
  plugins: [vuePlugin(), vueJSX()] // 使用的模板信息
}
