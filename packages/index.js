/* 以下代码自动生成于 Fri Jul 24 2020 23:10:04 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcForm from './components/form/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcIcon from './components/icon/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcLayer from './components/layer/index.vue'
import vcNotification from './components/notification/index.js'
import vcSelect from './components/select/index.vue'
import vcMessage from './components/message/index.js'

const components = [
  vcButton,
  vcForm,
  vcColorPicker,
  vcButtonGroup,
  vcIcon,
  vcFormItem,
  vcLayer,
  vcNotification,
  vcSelect,
  vcMessage
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
  vcColorPicker,
  vcButtonGroup,
  vcIcon,
  vcFormItem,
  vcLayer,
  vcNotification,
  vcSelect,
  vcMessage
}
