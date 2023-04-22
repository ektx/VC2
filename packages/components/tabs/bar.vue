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
      let el = this.vcTabs.$el.querySelector('.is-active')

      if (!el) {
        this.barStyle = { window: 0, x: 0 }
        return
      }

      let box = this.vcTabs.$el.querySelector('.vc-tabs__scroll')
      let { width, paddingLeft } = window.getComputedStyle(el)
      let { width: boxWidth } = box.getBoundingClientRect()
      let { x = 0 } = this.$parent.navStyle
     
      let moveX = el.offsetLeft + parseInt(paddingLeft)
      
      // 左右 tab 溢出修正
      if (moveX < Math.abs(x)) {
        this.$parent.navStyle.x = - el.offsetLeft 
      }
      // 如果活动标签不可见时
      if (moveX + x + parseInt(width) > boxWidth) {
        this.$parent.navStyle.x = boxWidth - (moveX + parseInt(width) + parseInt(paddingLeft))
      }

      this.barStyle = {
        width,
        x: moveX
      }
    },

  }
}
</script>
