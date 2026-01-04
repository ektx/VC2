import { cloneVNode, defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'PopoverInner',
  inheritAttrs: false,
  props: {
    slots: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup(props, { attrs }) {
    return () => {
      const referenceSlot = props.slots.reference?.(attrs)

      if (!referenceSlot) return null

      if (referenceSlot.length > 1) {
        console.warn('requires exact only one valid child.')
        return null
      }

      const firstNode = referenceSlot[0]

      if (!firstNode) {
        console.warn('no valid child node found')
        return null
      }

      return cloneVNode(firstNode, attrs)
    }
  }
})
