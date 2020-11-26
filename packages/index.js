/* 以下代码自动生成于 Thu Nov 26 2020 13:53:00 GMT+0800 (中国标准时间) */

import Button from './components/button/index.vue'
import Collapse from './components/collapse/index.vue'
import ButtonGroup from './components/buttonGroup/index.vue'
import CollapseItem from './components/collapseItem/index.vue'
import ColorPicker from './components/colorPicker/index.vue'
import Form from './components/form/index.vue'
import Confirm from './components/confirm/index.js'
import FormItem from './components/formItem/index.vue'
import Icon from './components/icon/index.vue'
import Input from './components/input/index.vue'
import InputNumber from './components/inputNumber/index.vue'
import Layer from './components/layer/index.vue'
import Message from './components/message/index.js'
import Notification from './components/notification/index.js'
import OperationList from './components/operationList/index.vue'
import Pagination from './components/pagination/index.vue'
import Popover from './components/popover/index.vue'
import RadioGroup from './components/radioGroup/index.vue'
import Select from './components/select/index.vue'
import Radio from './components/radio/index.vue'
import Switch from './components/switch/index.vue'
import TabPane from './components/tabPane/index.vue'
import Table from './components/table/index.vue'
import Tabs from './components/tabs/index.vue'
import TimePicker from './components/timePicker/index.vue'

const components = [
  Button,
  Collapse,
  ButtonGroup,
  CollapseItem,
  ColorPicker,
  Form,
  Confirm,
  FormItem,
  Icon,
  Input,
  InputNumber,
  Layer,
  Message,
  Notification,
  OperationList,
  Pagination,
  Popover,
  RadioGroup,
  Select,
  Radio,
  Switch,
  TabPane,
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

export const vcButton = Button
export const vcCollapse = Collapse
export const vcButtonGroup = ButtonGroup
export const vcCollapseItem = CollapseItem
export const vcColorPicker = ColorPicker
export const vcForm = Form
export const vcConfirm = Confirm.function
export const vcFormItem = FormItem
export const vcIcon = Icon
export const vcInput = Input
export const vcInputNumber = InputNumber
export const vcLayer = Layer
export const vcMessage = Message.function
export const vcNotification = Notification.function
export const vcOperationList = OperationList
export const vcPagination = Pagination
export const vcPopover = Popover
export const vcRadioGroup = RadioGroup
export const vcSelect = Select
export const vcRadio = Radio
export const vcSwitch = Switch
export const vcTabPane = TabPane
export const vcTable = Table
export const vcTabs = Tabs
export const vcTimePicker = TimePicker

export default {
  version: "1.8.3",
  install,
  Button,
  Collapse,
  ButtonGroup,
  CollapseItem,
  ColorPicker,
  Form,
  Confirm,
  FormItem,
  Icon,
  Input,
  InputNumber,
  Layer,
  Message,
  Notification,
  OperationList,
  Pagination,
  Popover,
  RadioGroup,
  Select,
  Radio,
  Switch,
  TabPane,
  Table,
  Tabs,
  TimePicker
}
