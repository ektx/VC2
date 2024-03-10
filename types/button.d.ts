import { PropType } from 'vue'

export declare const VcButton: import('vue').DefineComponent<{
  size: {
    type: NumberConstructor
    default: number
  }
  theme: {
    type: StringConstructor
    default: string
    validator(val: unknown): boolean
  }
  /** 设置颜色 */
  color: {
    type: StringConstructor
    default: string
  }
  plain: BooleanConstructor
  round: BooleanConstructor
  icon: {
    type: StringConstructor
    default: string
  }
  loading: BooleanConstructor
  disabled: BooleanConstructor
  classes: StringConstructor
  bg: {
    type: (StringConstructor | BooleanConstructor)[]
    default: boolean
  }
}>
