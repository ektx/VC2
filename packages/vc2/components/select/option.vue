<template>
  <li
    :class="[
      'vc-select-option',
      {
        selected: isSelected
      }
    ]"
    :disabled="item.disabled"
    @click="evt => vcSelect.selectedEvt(evt, item)"
  >
    <slot v-bind="item"></slot>
  </li>
</template>

<script setup>
import { inject, computed } from 'vue'
import { selectKey } from './types'

defineOptions({ name: 'VcSelectOption' })
const { item = {} } = defineProps({
  item: Object
})
const vcSelect = inject(selectKey)

const isSelected = computed(() => {
  const { modelValue, multiple, valueAlias, labelAlias } = vcSelect.props
  item.selected = [].concat(modelValue).includes(item[valueAlias])

  vcSelect.updateSelectedItem(item, item.selected)

  return item.selected
})

// isActive() {
//   let { props } = this.vcSelect
//   let { modelValue, multiple, valueAlias, labelAlias } = props
//   this.item.selected = [].concat(modelValue).includes(this.item[valueAlias])

//   this.vcSelect.updateSelectedItem(this.item, this.item.selected)

//   return this.item.selected
// }
</script>
