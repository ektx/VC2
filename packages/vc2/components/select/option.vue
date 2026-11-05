<template>
  <li
    :class="[
      'vc-select-option',
      {
        selected: value === item[valueAlias]
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
</script>
