import { cloneVNode, defineComponent, onMounted, getCurrentInstance } from 'vue'

export default defineComponent({
  props: {
    slots: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit, attrs }) {
    let ctx = getCurrentInstance()

    return () => {
      const defaultSlot = props.slots.reference?.(attrs)

      if (!defaultSlot) return null

      if (defaultSlot.length > 1) {
        console.warn('requires exact only one valid child.')
        return null
      }

      const firstNode = defaultSlot[0]

      if (!firstNode) {
        console.warn('no valid child node found')
        return null
      }

      return cloneVNode(defaultSlot[0], attrs)
    }
  }
})
