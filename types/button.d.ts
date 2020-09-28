
export type ButtonColor = 'primary' | 'success' | 'warn' | 'error'

export declare class VcButton {
  // 设置按钮效果
  color: ButtonColor
  // 镂空
  plain: boolean
  // 圆角
  round: boolean
  // 图标
  icon: string
  // 加载状态
  loading: boolean
  // 禁用状态
  disabled: boolean
}