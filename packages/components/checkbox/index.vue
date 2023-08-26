<template>
  <label :class="['vc-checkbox', { 'is-disabled': disabled }]">
    <span class="vc-checkbox--int">
      <input
        type="checkbox"
        v-model="currentVal"
        :value="label"
        :disabled="disabled"
      />
      <span class="vc-checkbox--icon"></span>
    </span>
    <span class="vc-checkbox--label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'VcCheckbox'
})

const props = defineProps({
  label: [String, Number, Boolean, Object],
  modelValue: {
    type: [String, Boolean, Number]
  },
  disabled: Boolean
})
const emits = defineEmits(['update:modelValue'])

const currentVal = computed({
  get() {
    if (typeof props.modelValue === 'boolean') {
      return props.modelValue
    }

    return true
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>
