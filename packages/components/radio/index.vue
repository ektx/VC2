<template>
  <label
    :class="[
      'vc-radio',
      {
        'is-border': border, 
        'is-button': isButton,
        'is-checked': isChecked,
        'is-disabled': isDisabled
      }
    ]"
    :style="sizeStyle"
  >
    <span :class="['vc-radio__radio', {'is-min': isButton}]">
      <input
        type="radio"
        class="vc-radio__input"
        v-model="intValue"
        :value="label"
        :disabled="isDisabled"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </span>
    <span class="vc-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import {
  ref,
  computed,
  inject
} from 'vue'

export default {
  name: 'VcRadio',
  props: {
    // 标签
    label: [String, Number],
    // 绑定值
    modelValue: {
      type: [String, Number],
      default: ''
    },
    // 是否禁用
    disabled: Boolean,
    // 是否顯示边框
    border: Boolean,
    // 文字大小
    size: {
      type: Number,
      default: 14
    },
    // 背景色
    background: String,
    // 文字颜色
    color: String
  },
  setup(props, { emit }) {
    const vcFormItem = inject('vcFormItem', null)
    const vcRadioGroup = inject('vcRadioGroup', null)
    const isFocus = ref(false)
    const isUpdate = ref(false)

    const isButton = computed(() => {
      return vcRadioGroup ? vcRadioGroup.type === 'button' : false
    })
    const isChecked = computed(() => {
      return intValue.value === props.label
    })
    const isDisabled = computed(() => {
      return vcRadioGroup 
        ? vcRadioGroup.disabled ? true : props.disabled
        : props.disabled
    })

    const sizeStyle = computed(() => {
      let size = props.size
      let background = props.background || ''
      let color = props.color || ''
      let obj = {}

      if (vcRadioGroup) {
        size = vcRadioGroup.size
        background = vcRadioGroup.background
        color = vcRadioGroup.color
      }

      if (isChecked.value) {
        obj = {
          background,
          borderColor: background,
          color
        }
      } 
      obj.fontSize = size + 'px'

      return obj
    })

    const handleChange = evt => {
      vcFormItem && vcFormItem.checkValidate('change')

      if (isUpdate.value) {
        isUpdate.value = false
        return
      }

      if (vcRadioGroup) {
        vcRadioGroup.$emit('change', evt)
      } else {
        emit('change', evt)
      }
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

    const intValue = computed({
      get () {
        return vcRadioGroup ? vcRadioGroup.modelValue : props.modelValue
      },
      set(val) {
        isUpdate.value = true
        if (vcRadioGroup) vcRadioGroup.$emit('update:modelValue', val)
        else emit('update:modelValue', val)
      }
    })


    return {
      intValue,
      isDisabled,
      isChecked,
      isButton,
      sizeStyle,
      handleChange,
      handleFocus,
      handleBlur,
    }
  }
};
</script>
