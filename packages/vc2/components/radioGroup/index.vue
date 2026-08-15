<template>
  <div
    class="vc-radio-group"
    :disabled="disabled || undefined"
    role="radiogroup"
    :style="style"
  >
    <div class="vc-radio-group--selected"></div>
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
  },
  computed: {
    style() {
      console.log(this.size)
      return {
        '--size': `${this.size}px`,
        '--bg': this.background,
        '--color': this.color
      }
    }
  }
}
</script>
