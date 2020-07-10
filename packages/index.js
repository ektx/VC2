/* 以下代码自动生成于 Fri Jul 10 2020 14:18:44 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcIcon from './components/icon/index.vue'

const components = [
  vcButton,
  vcForm,
  vcFormItem,
  vcMessage,
  vcNotification,
  vcIcon
]

const install = app => {
  components.forEach(item => {
    if (item.__file) {
      app.component(item.name, item)
    } else {
      app.provide(item.name, item.function)  
    }
  })
}

export default {
  install,
  vcButton,
  vcForm,
  vcFormItem,
  vcMessage,
  vcNotification,
  vcIcon
}
