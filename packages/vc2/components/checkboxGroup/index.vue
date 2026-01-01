<template>
  <div class="vc-checkbox-group" :style="_style">
    <slot>
      <Checkbox
        v-for="item in list"
        :key="item.value"
        :value="item.value"
        :size="item.size ?? size"
        :disabled="item.disabled ?? disabled"
        >{{ item.label }}</Checkbox
      >
    </slot>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, provide } from 'vue'
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
  },
  size: String,
  gap: String
})

defineOptions({
  name: 'VcCheckboxGroup'
})

const _style = computed(() => {
  if (props.gap) {
    return {
      '--gap': props.gap
    }
  }
  return {}
})

provide('VcCheckboxGroup', instance.proxy)
</script>
