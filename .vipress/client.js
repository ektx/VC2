/**
 * 菜单格式默认为以下
 * interface menu {
 *   label: string,
 *   to?: string,
 *   children?: menu[]
 * }
 */
 export const menu =[
  {
    label: "使用指南",
    children: [
      {
        label: "快速上手",
        to: "/doc/welcome"
      }
    ]
  },
  {
    label: "基础",
    children: [
      {
        label: "Icon 图标",
        to: "/doc/icon"
      },
      {
        label: "Button 按钮",
        to: "/doc/button"
      }
    ]
  },
  {
    label: "数据",
    children: [
      {
        label: "Pagination 分页",
        to: "/doc/pagination"
      },
      {
        label: "Table 表格",
        to: "/doc/table"
      },
      {
        label: "Progress 进度条",
        to: "/doc/progress"
      }
    ]
  },
  {
    label: "表单",
    children: [
      {
        label: "Input 输入框",
        to: "/doc/input"
      },
      {
        label: "InputNumber 计数器",
        to: "/doc/inputNumber"
      },
      {
        label: "Radio 单选框",
        to: "/doc/radio"
      },
      {
        label: "Switch 开关",
        to: "/doc/switch"
      },
      {
        label: "Select 选择器",
        to: "/doc/select"
      },
      {
        label: "ColorPicker 颜色选择器",
        to: "/doc/colorPicker"
      },
      {
        label: "TimePicker 时间选择器",
        to: "/doc/timePicker"
      },
      {
        label: "Form 表单",
        to: "/doc/form"
      },
      {
        label: "Upload 上传",
        to: "/doc/upload"
      }
    ]
  },
  {
    label: "容器",
    children: [
      {
        label: "Collapse 折叠面板",
        to: "/doc/collapse"
      },
      {
        label: "Tabs 标签页",
        to: "/doc/tabs"
      },
      {
        label: "Layer 弹层",
        to: "/doc/layer"
      },
      {
        label: "OperationList 操作列表",
        to: "/doc/operationList"
      },
      {
        label: "Popover 弹出框",
        to: "/doc/popover"
      }
    ]
  },
  {
    label: "公告通知",
    children: [
      {
        label: "Message 消息提示",
        to: "/doc/message"
      },
      {
        label: "Notification 通知",
        to: "/doc/notification"
      },
      {
        label: "Confirm 确认框",
        to: "/doc/confirm"
      }
    ]
  },
  {
    label: "开发指南",
    children: [
      {
        label: "组件示例开发指南",
        to: "/doc/help"
      }
    ]
  }
]