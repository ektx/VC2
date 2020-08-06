/* 以下代码自动生成于 Thu Aug 06 2020 16:50:00 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcForm from './components/form/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcInput from './components/input/index.vue'
import vcIcon from './components/icon/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcLayer from './components/layer/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcSelect from './components/select/index.vue'
import vcRadio from './components/radio/index.vue'
import vcSwitch from './components/switch/index.vue'

const components = [
  vcButton,
  vcForm,
  vcButtonGroup,
  vcColorPicker,
  vcInput,
  vcIcon,
  vcFormItem,
  vcLayer,
  vcMessage,
  vcNotification,
  vcSelect,
  vcRadio,
  vcSwitch
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
  vcButtonGroup,
  vcColorPicker,
  vcInput,
  vcIcon,
  vcFormItem,
  vcLayer,
  vcMessage,
  vcNotification,
  vcSelect,
  vcRadio,
  vcSwitch
}
