/* 以下代码自动生成于 Mon Aug 10 2020 09:13:54 GMT+0800 (GMT+08:00) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcInput from './components/input/index.vue'
import vcLayer from './components/layer/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcRadio from './components/radio/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcSelect from './components/select/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcInput,
  vcLayer,
  vcMessage,
  vcNotification,
  vcRadio,
  vcSwitch,
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
  vcInput,
  vcLayer,
  vcMessage,
  vcNotification,
  vcRadio,
  vcSwitch,
  vcSelect
}
