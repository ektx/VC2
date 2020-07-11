<template>
  <button 
    :class="[
      'vc-button', 
      color, 
      {plain, animate, round}
    ]" 
    type="button"
    :disabled="loading || disabled"
    @click="clickEvt"
  >
    <i v-if="_icon" :class="_icon"></i>
    <span><slot/></span>
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
    disabled: Boolean,
  },
  data () {
    return {
      animate: false
    }
  },
  computed: {
    _icon () {
      return this.loading ? 'vc-icon-loading' : this.icon
    }
  },
  methods: {
    clickEvt () {
      this.animate = false
      setTimeout(() => {
        this.animate = true
      }, 20)
    }
  }
}
</script>
