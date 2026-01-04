import { cloneVNode, defineComponent, type PropType, type Slots } from 'vue'

export default defineComponent({
  name: 'PopoverInner',
  props: {
    slots: {
      type: Object as PropType<Slots>,
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
