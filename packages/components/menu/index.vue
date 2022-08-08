<template>
  <div :class="['vc-menu', mode + '-mode']">
    <slot />
  </div>
</template>

<script>
import { menuInjectionKey } from './key'

export default {
  name: 'VcMenu',
  provide() {
    return {
      [menuInjectionKey]: this
    }
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    /** 模式 */
    mode: {
      type: String,
      default: '',
      validator: val => {
        return ['inline', 'horizontal', 'vertical'].includes(val)
      }
    },
    expand: {
      type: Array,
      default: null
    }
  },
  computed: {
    myExpand: {
      get() {
        return this.expand || this.modelValue
      },
      set(val) {
        this.$emit('update:expand', val)
      }
    }
  },
  methods: {
    updateValue(val) {
      this.$emit('update:modelValue', val)
    }
    // updateExpand(val) {
    //   this.$emit('update:expand', val)
    // }
  }
}
</script>
