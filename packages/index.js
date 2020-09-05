/* 以下代码自动生成于 Sat Sep 05 2020 22:22:59 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcConfirm from './components/confirm/index.js'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcForm from './components/form/index.vue'
import vcIcon from './components/icon/index.vue'
import vcInput from './components/input/index.vue'
import vcMessage from './components/message/index.js'
import vcFormItem from './components/formItem/index.vue'
import vcRadio from './components/radio/index.vue'
import vcSelect from './components/select/index.vue'
import vcNotification from './components/notification/index.js'
import vcLayer from './components/layer/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcTabPane from './components/tabPane/index.vue'
import vcTabs from './components/tabs/index.vue'

const components = [
  vcButton,
  vcColorPicker,
  vcConfirm,
  vcButtonGroup,
  vcForm,
  vcIcon,
  vcInput,
  vcMessage,
  vcFormItem,
  vcRadio,
  vcSelect,
  vcNotification,
  vcLayer,
  vcSwitch,
  vcTabPane,
  vcTabs
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
  vcConfirm,
  vcButtonGroup,
  vcForm,
  vcIcon,
  vcInput,
  vcMessage,
  vcFormItem,
  vcRadio,
  vcSelect,
  vcNotification,
  vcLayer,
  vcSwitch,
  vcTabPane,
  vcTabs
}
