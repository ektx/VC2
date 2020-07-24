/* 以下代码自动生成于 Fri Jul 24 2020 16:27:25 GMT+0800 (中国标准时间) */

import vcButtonGroup from './components/buttonGroup/index.vue'
import vcButton from './components/button/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcSelect from './components/select/index.vue'

const components = [
  vcButtonGroup,
  vcButton,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcMessage,
  vcNotification,
  vcSelect
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
  vcButtonGroup,
  vcButton,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcMessage,
  vcNotification,
  vcSelect
}
