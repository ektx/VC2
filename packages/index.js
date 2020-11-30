/* 以下代码自动生成于 Mon Nov 30 2020 15:55:05 GMT+0800 (中国标准时间) */

import ButtonGroup from './components/buttonGroup/index.vue'
import CollapseItem from './components/collapseItem/index.vue'
import Button from './components/button/index.vue'
import ColorPicker from './components/colorPicker/index.vue'
import FormItem from './components/formItem/index.vue'
import Icon from './components/icon/index.vue'
import Input from './components/input/index.vue'
import Confirm from './components/confirm/index.js'
import Collapse from './components/collapse/index.vue'
import InputNumber from './components/inputNumber/index.vue'
import Form from './components/form/index.vue'
import Notification from './components/notification/index.js'
import Message from './components/message/index.js'
import OperationList from './components/operationList/index.vue'
import Pagination from './components/pagination/index.vue'
import Popover from './components/popover/index.vue'
import Layer from './components/layer/index.vue'
import Progress from './components/progress/index.vue'
import Radio from './components/radio/index.vue'
import RadioGroup from './components/radioGroup/index.vue'
import Switch from './components/switch/index.vue'
import TabPane from './components/tabPane/index.vue'
import Select from './components/select/index.vue'
import Table from './components/table/index.vue'
import Tabs from './components/tabs/index.vue'
import TimePicker from './components/timePicker/index.vue'

const components = [
  ButtonGroup,
  CollapseItem,
  Button,
  ColorPicker,
  FormItem,
  Icon,
  Input,
  Confirm,
  Collapse,
  InputNumber,
  Form,
  Notification,
  Message,
  OperationList,
  Pagination,
  Popover,
  Layer,
  Progress,
  Radio,
  RadioGroup,
  Switch,
  TabPane,
  Select,
  Table,
  Tabs,
  TimePicker
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
export const vcColorPicker = ColorPicker
export const vcFormItem = FormItem
export const vcIcon = Icon
export const vcInput = Input
export const vcConfirm = Confirm.function
export const vcCollapse = Collapse
export const vcInputNumber = InputNumber
export const vcForm = Form
export const vcNotification = Notification.function
export const vcMessage = Message.function
export const vcOperationList = OperationList
export const vcPagination = Pagination
export const vcPopover = Popover
export const vcLayer = Layer
export const vcProgress = Progress
export const vcRadio = Radio
export const vcRadioGroup = RadioGroup
export const vcSwitch = Switch
export const vcTabPane = TabPane
export const vcSelect = Select
export const vcTable = Table
export const vcTabs = Tabs
export const vcTimePicker = TimePicker

export default {
  version: "1.8.3",
  install,
  ButtonGroup,
  CollapseItem,
  Button,
  ColorPicker,
  FormItem,
  Icon,
  Input,
  Confirm,
  Collapse,
  InputNumber,
  Form,
  Notification,
  Message,
  OperationList,
  Pagination,
  Popover,
  Layer,
  Progress,
  Radio,
  RadioGroup,
  Switch,
  TabPane,
  Select,
  Table,
  Tabs,
  TimePicker
}
