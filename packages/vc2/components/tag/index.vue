<template>
  <div :class="['vc-tag', typeStr, `vc-tag--${theme}`]" :style="style">
    <span class="vc-tag--content">
      <slot />
    </span>
    <i v-if="closable" class="vc-tag--close vc-icon-close" @click="onClose"></i>
  </div>
</template>

<script>
export default {
  name: 'VcTag',
  props: {
    /** 类型 用于快速设置颜色 */
    type: {
      type: String,
      default: '',
      validator(val) {
        return ['success', 'info', 'warning', 'danger', ''].includes(val)
      }
    },
    /** 设置颜色 */
    color: {
      type: String,
      default: ''
    },
    /** 设置 padding */
    padding: {
      type: String,
      default: ''
    },
    /** 设置圆角 */
    radius: {
      type: [String, Number],
      default: '3px'
    },
    /** 设置边框粗细 */
    border: {
      type: [String, Number],
      default: '1px'
    },
    /** 是否可关闭 */
    closable: Boolean,
    /** 设置按钮大小 */
    size: {
      type: [String, Number],
      default: '14px'
    },
    /** 设置主题 */
    theme: {
      type: String,
      default: 'light',
      validator(val) {
        return ['light', 'dark', 'plain'].includes(val)
      }
    }
  },
  computed: {
    typeStr() {
      if (this.type) return 'vc-tag--' + this.type
      return ''
    },
    style() {
      let result = {
        borderRadius:
          typeof this.radius === 'number' ? this.radius + 'px' : this.radius,
        '--border':
          typeof this.border === 'number' ? this.border + 'px' : this.border,
        '--size': typeof this.size === 'number' ? this.size + 'px' : this.size
      }

      if (this.color) result.color = this.color

      if (typeof this.size === 'number' && this.size < 12) {
        result['--size'] = 12 + 'px'
        result.transform = `scale(${this.size / 12})`
      }

      if (this.padding) result['padding'] = this.padding

      return result
    }
  },
  methods: {
    onClose(event) {
      this.$emit('close', event)
    }
  }
}
</script>
