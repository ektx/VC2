import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    return () => {
      const tabLabel = props.data.slots.label
        ? props.data.slots.label?.()
        : [props.data.label]

      return <span class="vc-tabs-item-label">{tabLabel}</span>
    }
  }
})
