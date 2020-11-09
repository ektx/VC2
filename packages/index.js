/* 以下代码自动生成于 Mon Nov 09 2020 10:09:51 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcCollapse from './components/collapse/index.vue'
import vcCollapseItem from './components/collapseItem/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcForm from './components/form/index.vue'
import vcConfirm from './components/confirm/index.js'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcInput from './components/input/index.vue'
import vcInputNumber from './components/inputNumber/index.vue'
import vcLayer from './components/layer/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcOperationList from './components/operationList/index.vue'
import vcPagination from './components/pagination/index.vue'
import vcRadio from './components/radio/index.vue'
import vcRadioGroup from './components/radioGroup/index.vue'
import vcSelect from './components/select/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcTabPane from './components/tabPane/index.vue'
import vcTable from './components/table/index.vue'
import vcTabs from './components/tabs/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcCollapse,
  vcCollapseItem,
  vcColorPicker,
  vcForm,
  vcConfirm,
  vcFormItem,
  vcIcon,
  vcInput,
  vcInputNumber,
  vcLayer,
  vcMessage,
  vcNotification,
  vcOperationList,
  vcPagination,
  vcRadio,
  vcRadioGroup,
  vcSelect,
  vcSwitch,
  vcTabPane,
  vcTable,
  vcTabs
]

const install = app => {
  components.forEach(item => {
    if (!item.function) {
      app.component(item.name, item)
    } else {
      app.provide(item.name, item.function)  
      // 绑定 ctx 上
      app.config.globalProperties[item.name] = item.function
    }
  })
}

export default {
  version: "1.6.0",
  install,
  vcButton,
  vcButtonGroup,
  vcCollapse,
  vcCollapseItem,
  vcColorPicker,
  vcForm,
  vcConfirm,
  vcFormItem,
  vcIcon,
  vcInput,
  vcInputNumber,
  vcLayer,
  vcMessage,
  vcNotification,
  vcOperationList,
  vcPagination,
  vcRadio,
  vcRadioGroup,
  vcSelect,
  vcSwitch,
  vcTabPane,
  vcTable,
  vcTabs
}
