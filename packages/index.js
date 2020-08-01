/* 以下代码自动生成于 Sat Aug 01 2020 14:18:42 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcForm from './components/form/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcIcon from './components/icon/index.vue'
import vcSelect from './components/select/index.vue'
import vcNotification from './components/notification/index.js'
import vcMessage from './components/message/index.js'
import vcLayer from './components/layer/index.vue'

const components = [
  vcButton,
  vcFormItem,
  vcColorPicker,
  vcForm,
  vcButtonGroup,
  vcIcon,
  vcSelect,
  vcNotification,
  vcMessage,
  vcLayer
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
  vcFormItem,
  vcColorPicker,
  vcForm,
  vcButtonGroup,
  vcIcon,
  vcSelect,
  vcNotification,
  vcMessage,
  vcLayer
}
