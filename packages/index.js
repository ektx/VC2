/* 以下代码自动生成于 Tue Dec 08 2020 16:22:33 GMT+0800 (中国标准时间) */

import ButtonGroup from './components/buttonGroup/index.vue'
import CollapseItem from './components/collapseItem/index.vue'
import Button from './components/button/index.vue'
import Collapse from './components/collapse/index.vue'
import Confirm from './components/confirm/index.js'
import ColorPicker from './components/colorPicker/index.vue'
import Form from './components/form/index.vue'
import Icon from './components/icon/index.vue'
import FormItem from './components/formItem/index.vue'
import InputNumber from './components/inputNumber/index.vue'
import Input from './components/input/index.vue'
import Layer from './components/layer/index.vue'
import Message from './components/message/index.js'
import Notification from './components/notification/index.js'
import OperationList from './components/operationList/index.vue'
import Pagination from './components/pagination/index.vue'
import Popover from './components/popover/index.vue'
import Progress from './components/progress/index.vue'
import Radio from './components/radio/index.vue'
import RadioGroup from './components/radioGroup/index.vue'
import Select from './components/select/index.vue'
import Switch from './components/switch/index.vue'
import TabPane from './components/tabPane/index.vue'
import Table from './components/table/index.vue'
import Tabs from './components/tabs/index.vue'
import TimePicker from './components/timePicker/index.vue'
import Upload from './components/upload/index.vue'

const components = [
  ButtonGroup,
  CollapseItem,
  Button,
  Collapse,
  Confirm,
  ColorPicker,
  Form,
  Icon,
  FormItem,
  InputNumber,
  Input,
  Layer,
  Message,
  Notification,
  OperationList,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TabPane,
  Table,
  Tabs,
  TimePicker,
  Upload
]

const install = app => {
  components.forEach(item => {
    if (!item.function) {
      app.component(item.name, item)
    } else {
      app.provide(item.name, item.function)  
      // 绑定 ctx 上(不建议使用全局，后期将要移除)
      // 建议动态导入
      app.config.globalProperties[item.name] = item.function
    }
  })
}

export const vcButtonGroup = ButtonGroup
export const vcCollapseItem = CollapseItem
export const vcButton = Button
export const vcCollapse = Collapse
export const vcConfirm = Confirm.function
export const vcColorPicker = ColorPicker
export const vcForm = Form
export const vcIcon = Icon
export const vcFormItem = FormItem
export const vcInputNumber = InputNumber
export const vcInput = Input
export const vcLayer = Layer
export const vcMessage = Message.function
export const vcNotification = Notification.function
export const vcOperationList = OperationList
export const vcPagination = Pagination
export const vcPopover = Popover
export const vcProgress = Progress
export const vcRadio = Radio
export const vcRadioGroup = RadioGroup
export const vcSelect = Select
export const vcSwitch = Switch
export const vcTabPane = TabPane
export const vcTable = Table
export const vcTabs = Tabs
export const vcTimePicker = TimePicker
export const vcUpload = Upload

export default {
  version: "1.10.0",
  install,
  ButtonGroup,
  CollapseItem,
  Button,
  Collapse,
  Confirm,
  ColorPicker,
  Form,
  Icon,
  FormItem,
  InputNumber,
  Input,
  Layer,
  Message,
  Notification,
  OperationList,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TabPane,
  Table,
  Tabs,
  TimePicker,
  Upload
}
