<template>
  <label
    :class="['vc-checkbox', { 'is-disabled': _disabled, indeterminate }]"
    :style="_style"
  >
    <span class="vc-checkbox--int">
      <input
        type="checkbox"
        v-model="currentVal"
        :disabled="_disabled"
        @change.stop
      />
      <span class="vc-checkbox--icon"></span>
    </span>
    <span class="vc-checkbox--label"> <slot></slot></span>
  </label>
</template>

<script setup>
import { computed, inject } from 'vue'

defineOptions({
  name: 'VcCheckbox'
})

const props = defineProps({
  /**
   * @zh 绑定值
   * @en Value
   */
  value: [String, Number, Boolean, Object],
  /**
   * @zh 动态绑定值
   */
  modelValue: {
    type: [String, Boolean, Number]
  },
  /**
   * @zh 是否为中间状态
   * @en Whether it is an indeterminate state
   */
  indeterminate: Boolean,
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled: Boolean,
  size: String
})
const emits = defineEmits(['update:modelValue', 'change'])

const vcFormItem = inject('vcFormItem', null)
const checkboxGroup = inject('VcCheckboxGroup', null)

const currentVal = computed({
  get() {
    if (checkboxGroup) {
      return checkboxGroup.modelValue.includes(props.value)
    }

    if (typeof props.modelValue === 'boolean') {
      return props.modelValue
    }

    return true
  },
  set(val) {
    if (checkboxGroup) {
      let r = []

      if (val) {
        r = [...checkboxGroup.modelValue, props.value]
      } else {
        r = checkboxGroup.modelValue.filter(v => v !== props.value)
      }
      console.log(r)
      checkboxGroup.$emit('update:modelValue', r)
      checkboxGroup.$emit('change', r)
    } else {
      emits('update:modelValue', val)
      emits('change', val)
    }
  }
})

const _disabled = computed(() => {
  if (checkboxGroup) {
    if (currentVal.value) {
      if (
        checkboxGroup.min &&
        checkboxGroup.modelValue.length <= checkboxGroup.min
      ) {
        return true
      }
    } else {
      if (
        checkboxGroup.max &&
        checkboxGroup.modelValue.length >= checkboxGroup.max
      ) {
        return true
      }
    }
    return checkboxGroup.disabled
  }

  return props.disabled
})

const _style = computed(() => {
  if (props.size) {
    return {
      '--size': props.size
    }
  }
  return {}
})
</script>
