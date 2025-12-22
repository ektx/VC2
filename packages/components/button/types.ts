import type { ExtractPropTypes, PropType, VNode } from 'vue'

// Button 类型
export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'default'

// Button 尺寸
export type ButtonSize = 'large' | 'medium' | 'small'

// Button 属性定义
export const buttonProps = {
  /** 按钮类型 */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否为圆角按钮 */
  round: {
    type: Boolean,
    default: false
  },
  /** 是否为加载状态 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 自定义图标（插槽） */
  icon: {
    type: [String, Object] as PropType<VNode | string>,
    default: ''
  }
} as const

// 提取 Props 类型（供组件内部使用）
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

// Button 事件类型
export interface ButtonEmits {
  click: (e: MouseEvent) => void
}
