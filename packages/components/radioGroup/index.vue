<template>
  <div class="vc-radio-group" role="radiogroup">
    <slot></slot>
  </div>
</template>

<script>
import { watch } from 'vue'

export default {
  name: 'VcRadioGroup',
  provide() {
    return {
      vcRadioGroup: this
    }
  },
  props: {
    modelValue: {
      type: [String, Number],
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
  }
}
</script>
