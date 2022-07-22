import Button from './components/button/index.vue'
import ButtonGroup from './components/buttonGroup/index.vue'
import Collapse from './components/collapse/index.vue'
import CollapseItem from './components/collapseItem/index.vue'
import ColorPicker from './components/colorPicker/index.vue'
import Form from './components/form/index.vue'
import FormItem from './components/formItem/index.vue'
import Icon from './components/icon/index.vue'
import Input from './components/input/index.vue'
import InputNumber from './components/inputNumber/index.vue'
import Layer from './components/layer/index.vue'
import OperationList from './components/operationList/index.vue'
import Pagination from './components/pagination/index.vue'
import Popover from './components/popover/index.vue'
import Progress from './components/progress/index.vue'
import Radio from './components/radio/index.vue'
import RadioGroup from './components/radioGroup/index.vue'
import Select from './components/select/index.vue'
import SplitPanel from './components/splitPanel/index.vue'
import Switch from './components/switch/index.vue'
import Table from './components/table/index.vue'
import Tabs from './components/tabs/index.vue'
import TabPane from './components/tabPane/index.vue'
import Tag from './components/tag/index.vue'
import TagGroup from './components/tagGroup/index.vue'
// import TimelineCalendar from './components/timelineCalendar/index.vue'
import TimePicker from './components/timePicker/index.vue'
import Upload from './components/upload/index.vue'

import Confirm from './components/confirm/main.js'
import Message from './components/message/main.js'
import Notification from './components/notification/main.js'

export * from './components/index.js'

const components = [
  Button,
  ButtonGroup,
  Collapse,
  CollapseItem,
  ColorPicker,
  Form,
  FormItem,
  Icon,
  Input,
  InputNumber,
  Layer,
  OperationList,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Select,
  SplitPanel,
  Switch,
  Table,
  Tabs,
  TabPane,
  Tag,
  TagGroup,
  // TimelineCalendar,
  TimePicker,
  Upload,
  Confirm,
  Message,
  Notification
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

export default {
  version: '0.0.0-rc.1',
  install
}
