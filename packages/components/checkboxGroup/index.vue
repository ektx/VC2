<template>
  <div class="vc-checkbox-group">
    <slot>
      <Checkbox v-for="item in list" :key="item.value" :value="item.value">{{
        item.label
      }}</Checkbox>
    </slot>
  </div>
</template>

<script setup>
import { getCurrentInstance, provide } from 'vue'
import Checkbox from '../checkbox/index.vue'

const instance = getCurrentInstance()
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  list: {
    type: Array,
    default: () => []
  },
  max: {
    type: [Number, String],
    default: Infinity
  },
  min: {
    type: [Number, String],
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineOptions({
  name: 'VcCheckboxGroup'
})

provide('VcCheckboxGroup', instance.proxy)
</script>
