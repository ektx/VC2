<template>
  <div :class="['vc-menu', mode + '-mode', { 'is-collapse': collapse }]">
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
  emits: ['update:modelValue', 'change'],
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
    },
    // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    collapse: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    expand: {
      handler(val) {
        if (this.mode === 'inline') {
          if (this.collapse) this.myExpand = []
          else this.myExpand = val ? val : this.modelValue.slice()
        } else this.myExpand = []
      },
      immediate: true
    },
    collapse: {
      handler(val) {
        this.updateCollapseSize()
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
    updateValue(val, item) {
      this.$emit('update:modelValue', val)
      this.$emit('change', {
        key: this.modelValue.slice(-1)[0],
        path: this.modelValue,
        item
      })
      this.updateCollapseSize()
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
    },
    updateCollapseSize() {
      if (!this.collapse) return
      this.$nextTick(() => {
        let findIconEl = this.$el.querySelector('.vc-menu-item--icon')
        let width = null

        if (findIconEl) {
          let { paddingLeft, paddingRight } = getComputedStyle(
            findIconEl.parentElement
          )
          ;({ width } = findIconEl.getBoundingClientRect())
          width += parseInt(paddingLeft) + parseInt(paddingRight)
        }

        this.$el.style.width = width + 'px'
      })
    }
  }
}
</script>
