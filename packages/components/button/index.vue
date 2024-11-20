<template>
  <button
    :class="[
      'vc-button',
      theme,
      {
        plain,
        round,
        text,
        'is-loading': loading
      }
    ]"
    type="button"
    :disabled="disabled"
    :style="_style"
  >
    <Transition name="vc-button--loading">
      <span v-if="_icon" class="vc-button--icon">
        <i :class="_icon"></i>
      </span>
    </Transition>
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'VcButton',
  props: {
    size: {
      type: Number,
      default: 14
    },
    // 设置按钮效果
    theme: {
      type: String,
      default: '',
      validator(val) {
        return ['primary', 'success', 'warn', 'error', ''].includes(val)
      }
    },
    /** 设置颜色 */
    color: String,
    // 镂空
    plain: Boolean,
    // 圆角
    round: Boolean,
    // 图标
    icon: String,
    text: Boolean,
    // 加载状态
    loading: Boolean,
    // 禁用状态
    disabled: Boolean,
    classes: String,
    // text 时，用于显示背景色
    bg: String
  },
  computed: {
    _icon() {
      return this.loading ? 'vc-icon-loading' : this.icon
    },

    _style() {
      return {
        '--size': this.size,
        '--color': this.color,
        '--bg': typeof this.bg === 'string' ? this.bg : ''
      }
    }
  }
}
</script>
