<template>
  <button
    :class="[
      'vc-button',
      color,
      { plain, animate, round, 'only-icon': !_hasSlot, 'is-loading': loading }
    ]"
    type="button"
    :disabled="loading || disabled"
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
    color: {
      type: String,
      // @arguments: primary / success / warn / error
      default: 'default'
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
    classes: String
  },
  data() {
    return {
      animate: false
    }
  },
  computed: {
    _icon() {
      return this.loading ? 'vc-icon-loading' : this.icon
    },
    _hasSlot() {
      return this.$slots.default
    }
  },
  methods: {
    clickEvt() {
      this.animate = false

      setTimeout(() => {
        this.animate = true
      }, 10)
    }
  }
}
</script>
