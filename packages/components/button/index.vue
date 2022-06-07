<template>
  <button
    :class="[
      'vc-button',
      _theme,
      _bgClassName,
      {
        plain,
        round,
        'only-icon': !_hasSlot,
        'is-loading': loading,
        'customize-color': color || _theme
      }
    ]"
    type="button"
    :disabled="loading || disabled"
    :style="_style"
    @click="clickEvt"
  >
    <Transition name="vc-button--loading">
      <div v-if="_icon" class="vc-button--icon">
        <i :class="_icon"></i>
      </div>
    </Transition>
    <span v-if="_hasSlot"><slot /></span>
  </button>
</template>

<script>
export default {
  name: 'VcButton',
  props: {
    // 设置按钮效果
    theme: {
      type: String,
      default: '',
      validator(val) {
        return ['primary', 'success', 'warn', 'error', ''].includes(val)
      }
    },
    /** 设置颜色 */
    color: {
      type: String,
      default: ''
    },
    // 镂空
    plain: Boolean,
    // 圆角
    round: Boolean,
    // 图标
    icon: {
      type: String,
      default: ''
    },
    // 加载状态
    loading: Boolean,
    // 禁用状态
    disabled: Boolean,
    classes: String,
    // text 时，用于显示背景色
    bg: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    _icon() {
      return this.loading ? 'vc-icon-loading' : this.icon
    },
    _hasSlot() {
      return this.$slots.default
    },
    _theme() {
      return this.theme ? `vc-button--theme-${this.theme}` : ''
    },
    _style() {
      let obj = {}

      if (this.color) {
        obj.color = this.color
      }
      if (this.bg && typeof this.bg !== 'boolean') {
        obj['--bg'] = this.bg
      }

      return obj
    },
    _bgClassName() {
      return typeof this.bg !== 'boolean' ? 'customize-bg' : 'has-bg'
    }
  }
}
</script>
