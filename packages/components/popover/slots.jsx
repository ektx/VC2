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

      console.log(attrs)

      return cloneVNode(referenceSlot[0], attrs)
    }
  }
})
