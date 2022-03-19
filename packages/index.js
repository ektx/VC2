import Button from './components/button/index.vue'
import Notification from './components/notification/main.js'

export * from './components/index.js'

const components = [Button, Notification]

const install = app => {
  components.forEach(item => {
    if (!item.function) {
      app.component(item.name, item)
    } else {
      app.provide(item.name, item.function)
      // 绑定 ctx 上(不建议使用全局，后期将要移除)
      // 建议动态导入
      app.config.globalProperties[item.name] = item.function
    }
  })
}

export default {
  version: '0.0.0-rc.1',
  install
}
