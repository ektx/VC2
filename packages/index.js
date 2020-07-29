/* 以下代码自动生成于 Wed Jul 29 2020 09:53:30 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcSelect from './components/select/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcNotification from './components/notification/index.js'
import vcMessage from './components/message/index.js'
import vcLayer from './components/layer/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcForm,
  vcFormItem,
  vcIcon,
  vcColorPicker,
  vcSelect,
  vcSwitch,
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
  vcButtonGroup,
  vcForm,
  vcFormItem,
  vcIcon,
  vcColorPicker,
  vcSelect,
  vcSwitch,
  vcNotification,
  vcMessage,
  vcLayer
}
