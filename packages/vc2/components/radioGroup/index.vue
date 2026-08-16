<template>
  <div
    class="vc-radio-group"
    :disabled="disabled || undefined"
    :plain="plain || undefined"
    role="radiogroup"
    :type="type"
    :style="style"
  >
    <div class="vc-radio-group--selected"></div>
    <!-- <slot></slot> -->
    <Slots
      :slots="mySlots"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
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
    default: undefined
  },
  background: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  // type 为 segmented 时有效
  // 是否朴素按钮
  plain: {
    type: Boolean,
    default: false
  },
  barColor: {
    type: String,
    default: undefined
  },
  txtColor: {
    type: String,
    default: undefined
  }
})
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change'])

const style = computed(() => {
  let size = typeof props.size === 'number' ? props.size + 'px' : props.size
  return {
    '--size': size,
    '--bg': props.background,
    '--color': props.color,
    '--def-color': props.txtColor,
    '--bar-color': props.barColor
  }
})

provide('vcRadioGroup', {
  ...props,
  $emit: emit
})

const mySlots = useSlots()
</script>
