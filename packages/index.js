/* 以下代码自动生成于 Fri Sep 04 2020 22:57:23 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcForm from './components/form/index.vue'
import vcIcon from './components/icon/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcLayer from './components/layer/index.vue'
import vcInput from './components/input/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcRadio from './components/radio/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcTabs from './components/tabs/index.vue'
import vcTabPane from './components/tabPane/index.vue'
import vcSelect from './components/select/index.vue'

const components = [
  vcButton,
  vcColorPicker,
  vcButtonGroup,
  vcForm,
  vcIcon,
  vcFormItem,
  vcLayer,
  vcInput,
  vcMessage,
  vcNotification,
  vcRadio,
  vcSwitch,
  vcTabs,
  vcTabPane,
  vcSelect
]

const install = app => {
  components.forEach(item => {
    if (item.__file) {
      app.component(item.name, item)
    } else {
      app.provide(item.name, item.function)  
      // 绑定 ctx 上
      app.config.globalProperties[item.name] = item.function
    }
  })
}

export default {
  install,
  vcButton,
  vcColorPicker,
  vcButtonGroup,
  vcForm,
  vcIcon,
  vcFormItem,
  vcLayer,
  vcInput,
  vcMessage,
  vcNotification,
  vcRadio,
  vcSwitch,
  vcTabs,
  vcTabPane,
  vcSelect
}
