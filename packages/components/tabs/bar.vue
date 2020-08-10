<template>
  <li class="vc-tabs__active-bar" :style="comBarStyle"></li>
</template>

<script>
export default {
  data() {
    return {
      barStyle: {}
    }
  },
  inject: ['vcTabs'],
  computed: {
    comBarStyle () {
      let { x, width } = this.barStyle

      x = x ? x : 0
      width= width ? width : 0

      return {
        width,
        transform: `translateX(${x}px)`
      }
    }
  },
  methods: {
    updateBar() {
      console.log('1111')
      let el = this.vcTabs.$el.querySelector('.is-active')

      if (!el) return

      let { width, paddingLeft } = window.getComputedStyle(el)
      let { width: elWidth } = this.$el.parentNode.getBoundingClientRect()
      let { x = 0 } = this.$parent.navStyle
      // console.log(x)
      let moveX = el.offsetLeft + parseInt(paddingLeft)
      
      // 左右 tab 溢出修正
      if (moveX < Math.abs(x)) {
        this.$parent.navStyle.x = - el.offsetLeft 
      }

      if (moveX + x + parseInt(width) > elWidth) {
        this.$parent.navStyle.x = elWidth - (moveX + parseInt(width) + parseInt(paddingLeft))
      }
// this.$parent.navStyle.x = 100
      this.barStyle = {
        width,
        x: moveX
      }
    },

  }
}
</script>

<style>

</style>