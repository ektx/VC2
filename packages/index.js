/* 以下代码自动生成于 Fri Jul 10 2020 16:23:33 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'

const components = [
  vcButton,
  vcButtonGroup,
  vcForm,
  vcFormItem,
  vcIcon,
  vcMessage,
  vcNotification
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
  vcButtonGroup,
  vcForm,
  vcFormItem,
  vcIcon,
  vcMessage,
  vcNotification
}
