import type { ExtractPropTypes, PropType } from 'vue'

export type InputType = 'text' | 'textarea' | 'password' | 'number' | 'email' | 'url' | 'tel' | 'search' | 'date'
export type InputAutosize = boolean | { minRows?: number; maxRows?: number }

export const inputProps = {
  suffixIcon: String,
  prefixIcon: String,
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  autosize: {
    type: [Boolean, Object] as PropType<InputAutosize>,
    default: false
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string | number) => true,
  change: (value: string | number) => true,
  clear: () => true,
  enter: (e: KeyboardEvent) => true,
  focus: (e: FocusEvent) => true,
  blur: (e: FocusEvent) => true
}
export type InputEmits = typeof inputEmits
