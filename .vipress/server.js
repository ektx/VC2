export default {
  title: 'VC2', // 标题
  template: 'vue3',
  homePage: 'welcome.md', // 首页路由地址
  docDir: 'doc', // 文档路由
  build: {
    // 打包设置
    doc: {
      base: '/', // 公共基础路径
      outDir: 'dist' // 指定输出目录，默认 dist
    },
    lib: {
      outDir: 'lib'
    }
  }
}
