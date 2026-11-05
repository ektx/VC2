import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue'

export type SelectValue = string | number | (string | number)[]

export interface SelectOption {
  label?: string
  value?: string | number
  disabled?: boolean
  children?: SelectOption[]
  [key: string]: any
}

export interface SelectContext {
  props: SelectProps
  query: Ref<string>
  selectedItem: Ref<Record<string, SelectOption>>
  selectedEvt: (evt: Event, item: SelectOption) => void
  $refs: {
    inputArea: Ref<HTMLElement | null>
  }
}

export const selectKey: InjectionKey<SelectContext> = Symbol('vcSelect')

export const selectProps = {
  // 值
  modelValue: {
    type: [String, Number, Array] as PropType<SelectValue>,
    default: ''
  },
  // 选项列表
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },
  // [TODO]弹层是否追加到body
  popperAppendToBody: {
    type: Boolean,
    default: true
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false
  },
  // [TODO]多选时是否将选中值按文字的形式展示
  collapseTags: {
    type: Boolean,
    default: false
  },
  // 多选时最多显示多少个 tag
  maxTagCount: {
    type: Number,
    default: 1
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请选择'
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: false
  },
  // 是否可搜索
  filterable: {
    type: Boolean,
    default: false
  },
  // 自定义搜索方法
  filterMethod: {
    type: Function as PropType<
      (query: string, options: SelectOption[]) => SelectOption[]
    >,
    default: null
  },
  // 是否允许用户创建新条目
  createTags: {
    type: Boolean,
    default: false
  },
  // 自定义远程搜索功能
  remoteMethod: {
    type: Function as PropType<(query: string) => void>,
    default: null
  },
  // loading
  loading: {
    type: Boolean,
    default: false
  },
  // 值别名
  valueAlias: {
    type: String,
    default: 'value'
  },
  // 标签别名
  labelAlias: {
    type: String,
    default: 'label'
  },
  // 子选项别名
  childrenAlias: {
    type: String,
    default: 'children'
  },
  // 清空选项的值
  valueOnClear: {
    type: [String, Number, Boolean, Function] as PropType<
      string | number | boolean | (() => any)
    >,
    default: ''
  }
} as const

export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectEmits = {
  'update:modelValue': (value: SelectValue) => true,
  change: (value: SelectValue, item?: SelectOption | SelectOption[]) => true,
  onClear: (value: SelectValue) => true,
  blur: () => true,
  focus: (e: FocusEvent) => true,
  closed: () => true
}
export type SelectEmits = typeof selectEmits
