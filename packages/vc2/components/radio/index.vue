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
    <span :class="['vc-radio__radio']">
      <input
        type="radio"
        class="vc-radio__input"
        :checked="isChecked"
        :value="label"
        :disabled="disabled"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        @click="emit('update:modelValue', label)"
      />
    </span>
    <span class="vc-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

defineOptions({
  name: 'VcRadio',
  inheritAttrs: false
})

const {
  label,
  modelValue = '',
  size,
  disabled = false,
  border,
  background,
  color
} = defineProps({
  // 标签
  label: [String, Number, Boolean, Object],
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
const emit = defineEmits(['update:modelValue'])

const vcFormItem = inject('vcFormItem', null)
const vcRadioGroup = inject('vcRadioGroup', null)
const isFocus = ref(false)
const isUpdate = ref(false)

// const isButton = computed(() => {
//   console.log(type)
//   return vcRadioGroup ? vcRadioGroup.type === 'button' : false
// })
const isChecked = computed(() => {
  return modelValue === label
})

const sizeStyle = computed(() => {
  let _size = typeof size === 'number' ? size + 'px' : size
  return {
    '--size': _size ?? undefined
  }
})

const handleChange = evt => {
  debugger
  vcFormItem && vcFormItem.checkValidate('change')

  // if (isUpdate.value) {
  //   isUpdate.value = false
  //   return
  // }

  // if (vcRadioGroup) {
  //   vcRadioGroup.$emit('change', evt)
  // } else {
  //   emit('change', evt)
  // }
}

const handleBlur = evt => {
  if (vcRadioGroup) {
    vcRadioGroup.$emit('blur', evt)
  } else {
    emit('blur', evt)
  }

  vcFormItem && vcFormItem.checkValidate('blur')
}

const handleFocus = evt => {
  if (vcRadioGroup) {
    vcRadioGroup.$emit('focus', evt)
  } else {
    emit('focus', evt)
  }
}
</script>
