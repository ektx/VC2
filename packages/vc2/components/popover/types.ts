import type { ExtractPropTypes, PropType } from 'vue'

export type PopoverTrigger =
  | 'hover'
  | 'click'
  | 'focus'
  | 'manual'
  | 'contextmenu'

export const popoverProps = {
  visible: {
    type: Boolean,
    default: false
  },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click'
  },
  defaultClass: {
    type: String,
    default: ''
  },
  referenceClass: {
    type: String,
    default: ''
  },
  /**
   * 定位
   * top | top center | top span-left | top span-right | top left | top right |
   * bottom(default) | bottom center | bottom span-left | bottom span-right | bottom left | bottom right |
   * left | left center | left span-top | left span-bottom |
   * right | right center | right span-top | right span-bottom |
   *
   */
  area: {
    type: String,
    default: 'bottom span-right'
  },
  speed: {
    type: String,
    default: '0.3s'
  },
  title: {
    type: String,
    default: 'Title'
  },
  content: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  }
} as const

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

export interface PopoverInstance {
  show: () => void
  hide: () => void
}
