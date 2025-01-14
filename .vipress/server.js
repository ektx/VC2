export default {
  title: 'VC2', // 标题
  template: 'vue3',
  docDir: 'doc', // 文档路由
  homePage: 'welcome.md', // 首页路由地址
  build: {
    // 打包设置
    doc: {
      base: '/VC2' // 公共基础路径
    },
    lib: {
      outDir: 'lib'
    }
  }
}
