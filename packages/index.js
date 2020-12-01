/* 以下代码自动生成于 Tue Dec 01 2020 15:44:11 GMT+0800 (中国标准时间) */

import Button from './components/button/index.vue'
import Collapse from './components/collapse/index.vue'
import ButtonGroup from './components/buttonGroup/index.vue'
import CollapseItem from './components/collapseItem/index.vue'
import ColorPicker from './components/colorPicker/index.vue'
import Confirm from './components/confirm/index.js'
import Form from './components/form/index.vue'
import FormItem from './components/formItem/index.vue'
import Icon from './components/icon/index.vue'
import InputNumber from './components/inputNumber/index.vue'
import Input from './components/input/index.vue'
import Layer from './components/layer/index.vue'
import Notification from './components/notification/index.js'
import Message from './components/message/index.js'
import OperationList from './components/operationList/index.vue'
import Pagination from './components/pagination/index.vue'
import Progress from './components/progress/index.vue'
import Popover from './components/popover/index.vue'
import RadioGroup from './components/radioGroup/index.vue'
import Switch from './components/switch/index.vue'
import Select from './components/select/index.vue'
import Radio from './components/radio/index.vue'
import TabPane from './components/tabPane/index.vue'
import Table from './components/table/index.vue'
import Tabs from './components/tabs/index.vue'
import TimePicker from './components/timePicker/index.vue'
import Upload from './components/upload/index.vue'

const components = [
  Button,
  Collapse,
  ButtonGroup,
  CollapseItem,
  ColorPicker,
  Confirm,
  Form,
  FormItem,
  Icon,
  InputNumber,
  Input,
  Layer,
  Notification,
  Message,
  OperationList,
  Pagination,
  Progress,
  Popover,
  RadioGroup,
  Switch,
  Select,
  Radio,
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

export const vcButton = Button
export const vcCollapse = Collapse
export const vcButtonGroup = ButtonGroup
export const vcCollapseItem = CollapseItem
export const vcColorPicker = ColorPicker
export const vcConfirm = Confirm.function
export const vcForm = Form
export const vcFormItem = FormItem
export const vcIcon = Icon
export const vcInputNumber = InputNumber
export const vcInput = Input
export const vcLayer = Layer
export const vcNotification = Notification.function
export const vcMessage = Message.function
export const vcOperationList = OperationList
export const vcPagination = Pagination
export const vcProgress = Progress
export const vcPopover = Popover
export const vcRadioGroup = RadioGroup
export const vcSwitch = Switch
export const vcSelect = Select
export const vcRadio = Radio
export const vcTabPane = TabPane
export const vcTable = Table
export const vcTabs = Tabs
export const vcTimePicker = TimePicker
export const vcUpload = Upload

export default {
  version: "1.9.0",
  install,
  Button,
  Collapse,
  ButtonGroup,
  CollapseItem,
  ColorPicker,
  Confirm,
  Form,
  FormItem,
  Icon,
  InputNumber,
  Input,
  Layer,
  Notification,
  Message,
  OperationList,
  Pagination,
  Progress,
  Popover,
  RadioGroup,
  Switch,
  Select,
  Radio,
  TabPane,
  Table,
  Tabs,
  TimePicker,
  Upload
}
