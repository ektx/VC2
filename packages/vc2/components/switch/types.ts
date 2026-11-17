import type { ExtractPropTypes, PropType } from 'vue'

export type SwitchValue = string | number | boolean

export const switchProps = {
  /** 绑定值，配合 `v-model` 使用 */
  modelValue: {
    type: [String, Number, Boolean] as PropType<SwitchValue>
  },
  /**
   * 绑定值，配合 `v-model:value` 使用
   * @deprecated 请改用 `modelValue` + `v-model`，该属性将在未来版本移除
   */
  value: {
    type: [String, Number, Boolean] as PropType<SwitchValue>,
    default: false
  },
  /** switch开关的长度 */
  width: {
    type: Number,
    default: 0
  },
  /** switch 打开时的背景色 */
  activeColor: {
    type: String,
    default: ''
  },
  /** switch 关闭时的背景色 */
  inactiveColor: {
    type: String,
    default: ''
  },
  /** switch 打开时的值 */
  activeValue: {
    type: [Boolean, String, Number] as PropType<SwitchValue>,
    default: true
  },
  /** switch 关闭时的值 */
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<SwitchValue>,
    default: false
  },
  /** switch 打开时所显示图标的类名 */
  activeIcon: {
    type: String,
    default: ''
  },
  /** 关闭时所显示图标的类名 */
  inactiveIcon: {
    type: String,
    default: ''
  },
  /** 内部图标文字 */
  inset: {
    type: Boolean,
    default: false
  },
  /** switch 打开时的文字描述 */
  activeText: String,
  /** switch 关闭时的文字描述 */
  inactiveText: String,
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 圓圈半徑 */
  r: {
    type: Number,
    default: 16
  },
  /** 加载状态，添加后，禁用不可点击 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 按钮文字 */
  btnText: String
} as const

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  change: (value: SwitchValue) => true,
  /** `v-model` 更新事件 */
  'update:modelValue': (value: SwitchValue) => true,
  /**
   * `v-model:value` 更新事件
   * @deprecated 请改用 `update:modelValue`，该事件将在未来版本移除
   */
  'update:value': (value: SwitchValue) => true
}

export type SwitchEmits = typeof switchEmits

export const switchInsetProps = {
  type: String,
  icon: String,
  text: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  }
} as const

export type SwitchInsetProps = ExtractPropTypes<typeof switchInsetProps>
