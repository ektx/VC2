<template>
  <label
    :class="[
      'vc-radio',
      {
        'is-border': border, 
        'is-button': isButton,
        'is-checked': isChecked,
        'is-disabled': isDisabled
      },
      labelFocus ? 'is-label-focus' : ''
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
  onMounted,
  watch,
  computed,
  inject
} from 'vue'

export default {
  name: 'VcRadio',
  props: {
    label: [String, Number],
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
    background: String,
    color: String
  },
  setup(props, { emit }) {
    let radioGroup = ref("");
    let labelFocus = ref(false)
    const vcFormItem = inject("vcFormItem", null)
    const vcRadioGroup = inject("vcRadioGroup", null)
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
    const hasBorder = computed(() => {
      return props.border
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

    const handleBlur = event => {
      
    };

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
      hasBorder,
      sizeStyle,
      handleChange,
      isButton,
      handleFocus,
      handleBlur,
      labelFocus
    };
  }
};
</script>

<style lang="less">
.vc-radio {
  display: inline-block;
  margin: 0 15px 0 0;
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  user-select: none;
  outline: none;
  cursor: pointer;

  &__input {
    appearance: none;
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 100%;
    transition: box-shadow .35s;
    box-shadow: inset 0 0 0 0 #409eff;
    outline: none;
    will-change: box-shadow;

    &:checked {
      border-color: #409eff;
      box-shadow: inset 0 0 0 .25em #409eff;
    }
  }

  &__radio {
    display: inline-block;
    width: 1em;
    height: 1em;
    border-radius: 100%;
    transition: box-shadow .35s;
    will-change: box-shadow;
    vertical-align: middle;

    &:focus-within {
      box-shadow: 0 0 0 2px rgba(64, 158, 255, .3);
    }

    &.is-min {
      width: 0;
      height: 0;
      overflow: hidden;
    }
  }

  &__label {
    margin: 0 5px;
  }

  &.is-button {
    position: relative;
    margin: 0 -1px 0 0px;
    padding: .4em .7em;
    border-radius: 0;
    border: 1px solid #ddd;
    z-index: 0;
    transition: background-color .3s, border .3s;

    &.is-checked {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      z-index: 1;
    }
  }

  &.is-border {
    padding: .4em .7em;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  &.is-disabled {
    opacity: .5;
    filter: grayscale(1);
    cursor: not-allowed;
  }
}
</style>
