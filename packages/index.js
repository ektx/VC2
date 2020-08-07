/* 以下代码自动生成于 Fri Aug 07 2020 08:22:37 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcIcon from './components/icon/index.vue'
import vcLayer from './components/layer/index.vue'
import vcMessage from './components/message/index.js'
import vcSelect from './components/select/index.vue'
import vcNotification from './components/notification/index.js'
import vcTabPane from './components/tabPane/index.vue'
import vcTabs from './components/tabs/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcForm,
  vcFormItem,
  vcColorPicker,
  vcIcon,
  vcLayer,
  vcMessage,
  vcSelect,
  vcNotification,
  vcTabPane,
  vcTabs
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
  vcColorPicker,
  vcIcon,
  vcLayer,
  vcMessage,
  vcSelect,
  vcNotification,
  vcTabPane,
  vcTabs
}
