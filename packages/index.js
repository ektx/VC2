/* 以下代码自动生成于 Thu Jul 30 2020 11:08:51 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcForm from './components/form/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcSelect from './components/select/index.vue'
import vcTest from './components/test/index.vue'
import vcMessage from './components/message/index.js'
import vcLayer from './components/layer/index.vue'
import vcNotification from './components/notification/index.js'

const components = [
  vcButton,
  vcColorPicker,
  vcForm,
  vcButtonGroup,
  vcFormItem,
  vcIcon,
  vcSelect,
  vcTest,
  vcMessage,
  vcLayer,
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
  vcColorPicker,
  vcForm,
  vcButtonGroup,
  vcFormItem,
  vcIcon,
  vcSelect,
  vcTest,
  vcMessage,
  vcLayer,
  vcNotification
}
