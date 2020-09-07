/* 以下代码自动生成于 Mon Sep 07 2020 11:04:36 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcLayer from './components/layer/index.vue'
import vcInput from './components/input/index.vue'
import vcNotification from './components/notification/index.js'
import vcMessage from './components/message/index.js'
import vcRadio from './components/radio/index.vue'
import vcSelect from './components/select/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcTabPane from './components/tabPane/index.vue'
import vcTabs from './components/tabs/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcLayer,
  vcInput,
  vcNotification,
  vcMessage,
  vcRadio,
  vcSelect,
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
  vcButtonGroup,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcLayer,
  vcInput,
  vcNotification,
  vcMessage,
  vcRadio,
  vcSelect,
  vcSwitch,
  vcTabPane,
  vcTabs
}
