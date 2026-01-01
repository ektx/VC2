import type { ExtractPropTypes, PropType } from 'vue'

export type ButtonTheme =
  | 'primary'
  | 'success'
  | 'warn'
  | 'error'
  | ''
  | 'default'

export type ButtonSize = number | string

export const buttonProps = {
  /**
   * 按钮类型
   * @values 'primary', 'success', 'warn', 'error', ''
   */
  theme: {
    type: String as PropType<ButtonTheme>,
    default: ''
  },
  /**
   * 按钮尺寸
   */
  size: {
    type: [Number, String] as PropType<ButtonSize>,
    default: 14
  },
  /**
   * 自定义颜色
   */
  color: String,
  /**
   * 朴素按钮
   */
  plain: {
    type: Boolean,
    default: false
  },
  /**
   * 圆角按钮
   */
  round: {
    type: Boolean,
    default: false
  },
  /**
   * 图标类名
   */
  icon: String,
  /**
   * 文字按钮
   */
  text: {
    type: Boolean,
    default: false
  },
  /**
   * 加载状态
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 禁用状态
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 自定义类名
   */
  classes: String,
  /**
   * 背景色 (text模式下)
   */
  bg: String
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
