<template>
  <label
    :class="[
      'vc-radio',
      {
        'is-border': border,
        'is-checked': isChecked
      }
    ]"
    :disabled="disabled || undefined"
    :style="sizeStyle"
  >
    <span class="vc-radio__radio">
      <input
        type="radio"
        class="vc-radio__input"
        :checked="isChecked"
        :value="value || label"
        :disabled="disabled"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        @click="emit('update:modelValue', value || label)"
      />
    </span>
    <span class="vc-radio__label">
      <slot>{{ value || label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'

defineOptions({
  name: 'VcRadio',
  inheritAttrs: false
})

const {
  label,
  value,
  modelValue = '',
  size,
  disabled = false,
  border,
  background,
  color
} = defineProps({
  // 标签
  label: [String, Number, Boolean, Object],
  // 值
  value: [String, Number, Boolean, Object],
  // 绑定值
  modelValue: [String, Number, Boolean, Object],
  // 是否禁用
  disabled: Boolean,
  // 是否顯示边框
  border: Boolean,
  // 文字大小
  size: {
    type: Number
  },
  // 背景色
  background: String,
  // 文字颜色
  color: String
})
const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'change'])

const vcFormItem = inject('vcFormItem', null)
const isFocus = ref(false)

const isChecked = computed(() => {
  return modelValue === value || label
})

const sizeStyle = computed(() => {
  let _size = typeof size === 'number' ? size + 'px' : size
  return {
    '--size': _size ?? undefined
  }
})

const handleChange = evt => {
  vcFormItem && vcFormItem.checkValidate('change')

  emit('change', evt)
}

const handleBlur = evt => {
  emit('blur', evt)

  vcFormItem && vcFormItem.checkValidate('blur')
}

const handleFocus = e => {
  emit('focus', e)
}

onMounted(() => {
  if (label) {
    console.warn('[VcRadio] label is deprecated, please use value')
  }
})
</script>
