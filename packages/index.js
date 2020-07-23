/* 以下代码自动生成于 Thu Jul 23 2020 16:48:38 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcForm from './components/form/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcIcon from './components/icon/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcRadio from './components/radio/index.vue'
import vcSelect from './components/select/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcFormItem,
  vcForm,
  vcColorPicker,
  vcIcon,
  vcMessage,
  vcNotification,
  vcRadio,
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
  vcFormItem,
  vcForm,
  vcColorPicker,
  vcIcon,
  vcMessage,
  vcNotification,
  vcRadio,
  vcSelect
}
