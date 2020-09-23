/* 以下代码自动生成于 Wed Sep 23 2020 10:32:51 GMT+0800 (中国标准时间) */

import vcButton from './components/button/index.vue'
import vcButtonGroup from './components/buttonGroup/index.vue'
import vcCollapseItem from './components/collapseItem/index.vue'
import vcCollapse from './components/collapse/index.vue'
import vcConfirm from './components/confirm/index.js'
import vcColorPicker from './components/colorPicker/index.vue'
import vcForm from './components/form/index.vue'
import vcFormItem from './components/formItem/index.vue'
import vcIcon from './components/icon/index.vue'
import vcLayer from './components/layer/index.vue'
import vcInput from './components/input/index.vue'
import vcMessage from './components/message/index.js'
import vcNotification from './components/notification/index.js'
import vcOperationList from './components/operationList/index.vue'
import vcPagination from './components/pagination/index.vue'
import vcRadio from './components/radio/index.vue'
import vcSelect from './components/select/index.vue'
import vcSwitch from './components/switch/index.vue'
import vcTabPane from './components/tabPane/index.vue'
import vcTable from './components/table/index.vue'
import vcTabs from './components/tabs/index.vue'

const components = [
  vcButton,
  vcButtonGroup,
  vcCollapseItem,
  vcCollapse,
  vcConfirm,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcLayer,
  vcInput,
  vcMessage,
  vcNotification,
  vcOperationList,
  vcPagination,
  vcRadio,
  vcSelect,
  vcSwitch,
  vcTabPane,
  vcTable,
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
  vcCollapseItem,
  vcCollapse,
  vcConfirm,
  vcColorPicker,
  vcForm,
  vcFormItem,
  vcIcon,
  vcLayer,
  vcInput,
  vcMessage,
  vcNotification,
  vcOperationList,
  vcPagination,
  vcRadio,
  vcSelect,
  vcSwitch,
  vcTabPane,
  vcTable,
  vcTabs
}
