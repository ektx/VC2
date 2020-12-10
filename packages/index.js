/* 以下代码自动生成于 Thu Dec 10 2020 22:33:49 GMT+0800 (中国标准时间) */

import Collapse from './components/collapse/index.vue'
import Button from './components/button/index.vue'
import ButtonGroup from './components/buttonGroup/index.vue'
import CollapseItem from './components/collapseItem/index.vue'
import Form from './components/form/index.vue'
import Confirm from './components/confirm/index.js'
import ColorPicker from './components/colorPicker/index.vue'
import FormItem from './components/formItem/index.vue'
import Icon from './components/icon/index.vue'
import Input from './components/input/index.vue'
import InputNumber from './components/inputNumber/index.vue'
import Layer from './components/layer/index.vue'
import Message from './components/message/index.js'
import Notification from './components/notification/index.js'
import OperationList from './components/operationList/index.vue'
import Pagination from './components/pagination/index.vue'
import Radio from './components/radio/index.vue'
import Progress from './components/progress/index.vue'
import RadioGroup from './components/radioGroup/index.vue'
import Popover from './components/popover/index.vue'
import Select from './components/select/index.vue'
import Switch from './components/switch/index.vue'
import TabPane from './components/tabPane/index.vue'
import Table from './components/table/index.vue'
import TimePicker from './components/timePicker/index.vue'
import Tabs from './components/tabs/index.vue'
import Upload from './components/upload/index.vue'

const components = [
  Collapse,
  Button,
  ButtonGroup,
  CollapseItem,
  Form,
  Confirm,
  ColorPicker,
  FormItem,
  Icon,
  Input,
  InputNumber,
  Layer,
  Message,
  Notification,
  OperationList,
  Pagination,
  Radio,
  Progress,
  RadioGroup,
  Popover,
  Select,
  Switch,
  TabPane,
  Table,
  TimePicker,
  Tabs,
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

export const vcCollapse = Collapse
export const vcButton = Button
export const vcButtonGroup = ButtonGroup
export const vcCollapseItem = CollapseItem
export const vcForm = Form
export const vcConfirm = Confirm.function
export const vcColorPicker = ColorPicker
export const vcFormItem = FormItem
export const vcIcon = Icon
export const vcInput = Input
export const vcInputNumber = InputNumber
export const vcLayer = Layer
export const vcMessage = Message.function
export const vcNotification = Notification.function
export const vcOperationList = OperationList
export const vcPagination = Pagination
export const vcRadio = Radio
export const vcProgress = Progress
export const vcRadioGroup = RadioGroup
export const vcPopover = Popover
export const vcSelect = Select
export const vcSwitch = Switch
export const vcTabPane = TabPane
export const vcTable = Table
export const vcTimePicker = TimePicker
export const vcTabs = Tabs
export const vcUpload = Upload

export default {
  version: "1.10.0",
  install,
  Collapse,
  Button,
  ButtonGroup,
  CollapseItem,
  Form,
  Confirm,
  ColorPicker,
  FormItem,
  Icon,
  Input,
  InputNumber,
  Layer,
  Message,
  Notification,
  OperationList,
  Pagination,
  Radio,
  Progress,
  RadioGroup,
  Popover,
  Select,
  Switch,
  TabPane,
  Table,
  TimePicker,
  Tabs,
  Upload
}
