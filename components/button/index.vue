<template>
  <button 
    :class="['vc-btn-com', color, {plain, animate}]" 
    type="button"
    v-bind="$attrs" 
    @click="clickEvt"
  >
    <span><slot/></span>
  </button>
</template>

<script>
export default {
  name: 'VcButton',
  props: {
    // - primary 主要的
    // - warn 警告
    // - error 错误
    color: {
      type: String,
      default: 'default'
    },
    // 镂空
    plain: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      animate: false
    }
  },
  methods: {
    clickEvt () {
      this.animate = false
      this.$emit('click')
      setTimeout(() => {
        this.animate = true
      }, 20)
    }
  }
}
</script>
