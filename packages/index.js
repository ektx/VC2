/* 以下代码自动生成于 Fri Mar 18 2022 10:41:51 GMT+0800 (中国标准时间) */

import Button from './components/button/index.vue'
import ColorPicker from './components/colorPicker/index.vue'
import ButtonGroup from './components/buttonGroup/index.vue'
import Confirm from './components/confirm/index.js'
import CollapseItem from './components/collapseItem/index.vue'
import Icon from './components/icon/index.vue'
import Input from './components/input/index.vue'
import Collapse from './components/collapse/index.vue'
import Layer from './components/layer/index.vue'
import FormItem from './components/formItem/index.vue'
import Form from './components/form/index.vue'
import Message from './components/message/index.js'
import Pagination from './components/pagination/index.vue'
import Notification from './components/notification/index.js'
import Popover from './components/popover/index.vue'
import Radio from './components/radio/index.vue'
import Progress from './components/progress/index.vue'
import InputNumber from './components/inputNumber/index.vue'
import RadioGroup from './components/radioGroup/index.vue'
import OperationList from './components/operationList/index.vue'
import Switch from './components/switch/index.vue'
import TabPane from './components/tabPane/index.vue'
import Table from './components/table/index.vue'
import Tabs from './components/tabs/index.vue'
import Select from './components/select/index.vue'
import TimePicker from './components/timePicker/index.vue'
import Upload from './components/upload/index.vue'

const components = [
  Button,
  ColorPicker,
  ButtonGroup,
  Confirm,
  CollapseItem,
  Icon,
  Input,
  Collapse,
  Layer,
  FormItem,
  Form,
  Message,
  Pagination,
  Notification,
  Popover,
  Radio,
  Progress,
  InputNumber,
  RadioGroup,
  OperationList,
  Switch,
  TabPane,
  Table,
  Tabs,
  Select,
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
export const vcColorPicker = ColorPicker
export const vcButtonGroup = ButtonGroup
export const vcConfirm = Confirm.function
export const vcCollapseItem = CollapseItem
export const vcIcon = Icon
export const vcInput = Input
export const vcCollapse = Collapse
export const vcLayer = Layer
export const vcFormItem = FormItem
export const vcForm = Form
export const vcMessage = Message.function
export const vcPagination = Pagination
export const vcNotification = Notification.function
export const vcPopover = Popover
export const vcRadio = Radio
export const vcProgress = Progress
export const vcInputNumber = InputNumber
export const vcRadioGroup = RadioGroup
export const vcOperationList = OperationList
export const vcSwitch = Switch
export const vcTabPane = TabPane
export const vcTable = Table
export const vcTabs = Tabs
export const vcSelect = Select
export const vcTimePicker = TimePicker
export const vcUpload = Upload

export default {
  version: "0.0.0-rc.1",
  install,
  Button,
  ColorPicker,
  ButtonGroup,
  Confirm,
  CollapseItem,
  Icon,
  Input,
  Collapse,
  Layer,
  FormItem,
  Form,
  Message,
  Pagination,
  Notification,
  Popover,
  Radio,
  Progress,
  InputNumber,
  RadioGroup,
  OperationList,
  Switch,
  TabPane,
  Table,
  Tabs,
  Select,
  TimePicker,
  Upload
}
