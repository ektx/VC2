
/**
 * 菜单格式默认为以下
 * interface menu {
 *   label: string,
 *   to?: string,
 *   children?: menu[]
 * }
 */
export const menu = [
  {
    label: '使用指南',
    children: [
      {
        label: '快速上手',
        to: '/welcome'
      }
    ]
  },
  {
    label: '基础',
    children: [
      {
        label: 'Icon 图标',
        to: '/icon'
      },
      {
        label: 'Button 按钮',
        to: '/button'
      }
    ]
  },
  {
    label: '数据',
    children: [
      {
        label: 'Pagination 分页',
        to: '/pagination'
      },
      {
        label: 'Table 表格',
        to: '/table'
      },
      {
        label: 'Tag 标签',
        to: '/tag'
      },
      {
        label: 'Progress 进度条',
        to: '/progress'
      }
      // {
      //   label: 'TimelineCalendar 时间线日历',
      //   to: '/timelineCalendar'
      // }
    ]
  },
  {
    label: '表单',
    children: [
      {
        label: 'Input 输入框',
        to: '/input'
      },
      {
        label: 'InputNumber 计数器',
        to: '/inputNumber'
      },
      {
        label: 'Radio 单选框',
        to: '/radio'
      },
      {
        label: 'Checkbox 多选框',
        to: '/checkbox'
      },
      {
        label: 'Switch 开关',
        to: '/switch'
      },
      {
        label: 'Select 选择器',
        to: '/select'
      },
      {
        label: 'ColorPicker 颜色选择器',
        to: '/colorPicker'
      },
      {
        label: 'TimePicker 时间选择器',
        to: '/timePicker'
      },
      {
        label: 'Form 表单',
        to: '/form'
      },
      {
        label: 'Upload 上传',
        to: '/upload'
      }
    ]
  },
  {
    label: '容器',
    children: [
      {
        label: 'Collapse 折叠面板',
        to: '/collapse'
      },
      {
        label: 'Tabs 标签页',
        to: '/tabs'
      },
      {
        label: 'Layer 弹层',
        to: '/layer'
      },
      {
        label: 'OperationList 操作列表',
        to: '/operationList'
      },
      {
        label: 'Popover 弹出框',
        to: '/popover'
      },
      {
        label: 'SplitPanel 分割面板',
        to: '/splitPanel'
      }
    ]
  },
  {
    label: '公告通知',
    children: [
      {
        label: 'Message 消息提示',
        to: '/message'
      },
      {
        label: 'Notification 通知',
        to: '/notification'
      },
      {
        label: 'Confirm 确认框',
        to: '/confirm'
      }
    ]
  },
  {
    label: '🧭 导航',
    children: [
      {
        label: 'Menu 菜单',
        to: '/menu'
      }
    ]
  },
  {
    label: '开发指南',
    children: [
      {
        label: '组件示例开发指南',
        to: '/help'
      }
    ]
  }
]
