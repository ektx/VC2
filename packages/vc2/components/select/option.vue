<template>
  <li
    :class="[
      'vc-select-option',
      {
        selected: isActive
      }
    ]"
    :disabled="item.disabled"
    @click="evt => vcSelect.selectedEvt(evt, item)"
  >
    <slot v-bind="item" />
  </li>
</template>

<script>
import { inject } from 'vue'
import { selectKey } from './types'

export default {
  name: 'VcSelectOption',
  setup() {
    const vcSelect = inject(selectKey) //inject('vcSelect')
    return { vcSelect }
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isActive() {
      let { props } = this.vcSelect
      let { modelValue, multiple, valueAlias, labelAlias } = props
      this.item.selected = [].concat(modelValue).includes(this.item[valueAlias])

      this.vcSelect.updateSelectedItem(this.item, this.item.selected)

      return this.item.selected
    }
  }
}
</script>
