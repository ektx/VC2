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
    padding: {
      type: String,
      default: ''
    },
    radius: {
      type: [String, Number],
      default: '3px'
    },
    border: {
      type: [String, Number],
      default: '1px'
    },
    closable: Boolean,
    size: {
      type: [String, Number],
      default: '14px'
    },
    theme: {
      type: String,
      values: ['light', 'dark', 'plain'],
      default: 'light'
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
