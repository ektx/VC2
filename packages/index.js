/* 以下代码自动生成于 Sat Jul 11 2020 23:03:21 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcMessage from './components/message/index.js'
import vcForm from './components/form/index.vue'
import vcSelect from './components/select/index.vue'
import vcNotification from './components/notification/index.js'

const components = [
  vcButton,
  vcButtonGroup,
  vcFormItem,
  vcIcon,
  vcMessage,
  vcForm,
  vcSelect,
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
  vcFormItem,
  vcIcon,
  vcMessage,
  vcForm,
  vcSelect,
  vcNotification
}
