<template>
  {{ myExpand }}
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
    // 默认扩展（只在inline模式下生效）
    expand: {
      type: Array,
      default: null
    },
    // 关闭弹层延迟
    closeDelay: {
      type: Number,
      default: 100
    }
  },
  watch: {
    expand: {
      handler(val) {
        if (this.mode === 'horizontal') this.myExpand = []
        else this.myExpand = val ? this.expand : this.modelValue.slice()
      },
      immediate: true
    }
  },
  data() {
    return {
      myExpand: '',
      timer: null
    }
  },
  methods: {
    updateValue(val) {
      this.$emit('update:modelValue', val)
    },
    // 更新扩展
    updateExpand(val) {
      this.myExpand = val
    },
    clearMyExpand() {
      this.clearTimer()

      this.timer = setTimeout(() => {
        this.myExpand = []
      }, this.closeDelay)
    },
    clearTimer() {
      if (this.timer) clearTimeout(this.timer)
    }
  }
}
</script>
