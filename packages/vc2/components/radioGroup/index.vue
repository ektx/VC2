<template>
  <div
    class="vc-radio-group"
    :disabled="disabled || undefined"
    role="radiogroup"
    :type="type"
    :style="style"
  >
    <div class="vc-radio-group--selected"></div>
    <!-- <slot></slot> -->
    <Slots
      :slots="mySlots"
      :emits="emit"
      :modelValue="modelValue"
      v-bind="$props"
    >
    </Slots>
  </div>
</template>

<script setup>
import { computed, watch, provide, useSlots } from 'vue'
import Slots from './slots.vue'

defineOptions({
  name: 'VcRadioGroup'
})
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 显示效果
  // @arguments radio/button
  type: {
    type: String,
    default: 'radio'
  },
  size: {
    type: Number,
    default: 14
  },
  background: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const style = computed(() => {
  let size = typeof props.size === 'number' ? props.size + 'px' : props.size
  return {
    '--size': size,
    '--bg': props.background,
    '--color': props.color
  }
})

provide('vcRadioGroup', {
  // modelValue: props.modelValue,
  // type: props.type
  ...props,
  $emit: emit
})

const mySlots = useSlots()
</script>
