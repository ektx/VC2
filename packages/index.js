/* 以下代码自动生成于 Wed Jul 29 2020 22:02:24 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcLayer from './components/layer/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcSelect from './components/select/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcLayer,
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
  vcButton,
  vcButtonGroup,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcLayer,
  vcMessage,
  vcNotification,
  vcSelect
}
