<template>
  <div
    :class="['vc-menu', mode + '-mode', { 'is-collapse': collapse }]"
    :style="style"
  >
    <slot></slot>
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
    /** 默认值 */
    modelValue: {
      type: [String, Number],
      default: ''
    },
    /** 模式 */
    mode: {
      type: String,
      default: 'inline',
      validator: val => {
        return ['inline', 'horizontal', 'vertical'].includes(val)
      }
    },
    // 默认扩展（只在inline模式下生效）
    expand: {
      type: Array,
      default: null
    },
    // 只在点击展开图标时展开
    expandOnClickIcon: {
      type: Boolean,
      default: false
    },
    // 关闭弹层延迟(ms)
    closeDelay: {
      type: Number,
      default: 100
    },
    // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    collapse: {
      type: Boolean,
      default: false
    },
    /** 默认宽度 */
    width: {
      type: [Number, String],
      default: 200
    },
    /** 最少宽度 */
    minWidth: {
      type: [Number, String],
      default: 40
    },
    /** 单个菜单高度 */
    itemHeight: {
      type: [Number, String],
      default: 40
    },
    // 更多图标位置
    moreIconPosition: {
      type: String,
      default: 'right',
      validator: val => ['left', 'right'].includes(val)
    }
  },
  watch: {
    expand: {
      handler(val) {
        if (this.mode === 'inline') {
          if (!this.collapse) this.myExpand = val ? val : []
        }
      },
      immediate: true
    },
    collapse: {
      handler(val) {
        this.updateCollapseSize()

        if (val) this.myExpand = []
      },
      immediate: true
    }
  },
  data() {
    return {
      activePath: [],
      myExpand: [],
      timer: null,
      style: {}
    }
  },
  methods: {
    updateValue(val, item) {
      this.$emit('update:modelValue', val.slice(-1)[0])

      this.$emit('change', {
        key: this.modelValue,
        path: val,
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
      let w = this.collapse ? this.minWidth : this.width

      Object.assign(this.style, {
        '--w': typeof w === 'string' ? w : w + 'px',
        '--itemH':
          typeof this.itemHeight === 'string'
            ? this.itemHeight
            : this.itemHeight + 'px'
      })
    }
  }
}
</script>
