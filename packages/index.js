/* 以下代码自动生成于 Thu Nov 19 2020 14:25:28 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcCollapseItem from './components/collapseItem/index.vue'
import vcCollapse from './components/collapse/index.vue'
import vcColorPicker from './components/colorPicker/index.vue'
import vcConfirm from './components/confirm/index.js'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcInput from './components/input/index.vue'
import vcLayer from './components/layer/index.vue'
import vcInputNumber from './components/inputNumber/index.vue'
import vcNotification from './components/notification/index.js'
import vcMessage from './components/message/index.js'
import vcOperationList from './components/operationList/index.vue'
import vcPagination from './components/pagination/index.vue'
import vcPopover from './components/popover/index.vue'
import vcRadio from './components/radio/index.vue'
import vcRadioGroup from './components/radioGroup/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcTabPane from './components/tabPane/index.vue'
import vcTable from './components/table/index.vue'
import vcTabs from './components/tabs/index.vue'
import vcSelect from './components/select/index.vue'
import vcTimePicker from './components/timePicker/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcCollapseItem,
  vcCollapse,
  vcColorPicker,
  vcConfirm,
  vcForm,
  vcFormItem,
  vcIcon,
  vcInput,
  vcLayer,
  vcInputNumber,
  vcNotification,
  vcMessage,
  vcOperationList,
  vcPagination,
  vcPopover,
  vcRadio,
  vcRadioGroup,
  vcSwitch,
  vcTabPane,
  vcTable,
  vcTabs,
  vcSelect,
  vcTimePicker
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
  version: "1.8.0",
  install,
  vcButton,
  vcButtonGroup,
  vcCollapseItem,
  vcCollapse,
  vcColorPicker,
  vcConfirm,
  vcForm,
  vcFormItem,
  vcIcon,
  vcInput,
  vcLayer,
  vcInputNumber,
  vcNotification,
  vcMessage,
  vcOperationList,
  vcPagination,
  vcPopover,
  vcRadio,
  vcRadioGroup,
  vcSwitch,
  vcTabPane,
  vcTable,
  vcTabs,
  vcSelect,
  vcTimePicker
}
