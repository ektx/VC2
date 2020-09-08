/* 以下代码自动生成于 Tue Sep 08 2020 09:58:16 GMT+0800 (中国标准时间) */

import vcButtonGroup from './components/buttonGroup/index.vue'
import vcButton from './components/button/index.vue'
import vcCollapse from './components/collapse/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcCollapseItem from './components/collapseItem/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcInput from './components/input/index.vue'
import vcLayer from './components/layer/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcRadio from './components/radio/index.vue'
import vcSelect from './components/select/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcTabPane from './components/tabPane/index.vue'
import vcTabs from './components/tabs/index.vue'

const components = [
  vcButtonGroup,
  vcButton,
  vcCollapse,
  vcColorPicker,
  vcCollapseItem,
  vcForm,
  vcFormItem,
  vcIcon,
  vcInput,
  vcLayer,
  vcMessage,
  vcNotification,
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
  vcButtonGroup,
  vcButton,
  vcCollapse,
  vcColorPicker,
  vcCollapseItem,
  vcForm,
  vcFormItem,
  vcIcon,
  vcInput,
  vcLayer,
  vcMessage,
  vcNotification,
  vcRadio,
  vcSelect,
  vcSwitch,
  vcTabPane,
  vcTabs
}
