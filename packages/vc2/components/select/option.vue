<template>
  <li
    :class="['vc-select-option', { selected }]"
    :disabled="item.disabled"
    @click="e => vcSelect.selectedEvt(e, item)"
  >
    <slot v-bind="item"></slot>
  </li>
</template>

<script setup>
import { inject, computed } from 'vue'
import { selectKey } from './types'

defineOptions({ name: 'VcSelectOption' })
const {
  item = {},
  value,
  valueAlias
} = defineProps({
  item: Object,
  value: [String, Number, Array],
  valueAlias: String
})
const vcSelect = inject(selectKey)
const selected = computed(() => {
  if (Array.isArray(value)) {
    return value.includes(item[valueAlias])
  } else {
    return item[valueAlias] === value
  }
})
</script>
