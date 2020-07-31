<template>
  <button 
    :class="['vc-button', color, {plain, animate, round}]" 
    type="button"
    @click="clickEvt"
  >
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
    round: Boolean
  },
  data () {
    return {
      animate: false
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
