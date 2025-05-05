import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'VcPopover',
  props: {
    slots: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit, slots }) {
    debugger
    return () => {
      // const tabLabel = props.slots.default ? props.slots.default?.() : []

      // onMounted(() => {
      //   debugger
      // })

      return 111
    }
  }
})
