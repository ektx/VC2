<template>
  <ul :class="['vc-tabs__nav']" :style="comNavStyle">
    <li class="vc-tabs__active-bar" :style="barStyle"></li>
    <li 
      v-for="tab in list" 
      :key="tab.label"
      :class="['vc-tabs__item', {'is-active': tab.active}]" 
      @click="vcTabs.activeTab = tab"
    >{{ tab.label }}</li>
  </ul>
</template>

<script>
import { addResizeListener, removeResizeListener } from '../../utils/resize-event'

export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
  },
  inject: ['vcTabs'],
  data() {
    return {
      navStyle: {
        x: 0
      },
    }
  },
  computed: {
    comNavStyle () {
      let { x } = this.navStyle
      let { x: barX } = this.vcTabs.barStyle
      let width = 0
      let scrollWidth = 0

      if (this.$el) {
        width = this.$el.getBoundingClientRect().width
        scrollWidth = this.$el.scrollWidth
      }

      if (x > 0) {
        this.navStyle.x = 0
        x = 0
        this.vcTabs.isPrevDisable = true
      } else {
        this.vcTabs.isPrevDisable = false
      }

      if (width && scrollWidth) {
        if (scrollWidth <= width - x) {
          x = width - scrollWidth
          this.navStyle.x = x
          this.vcTabs.isNextDisable = true
        } else {
          this.vcTabs.isNextDisable = false
        }
      }
    
      return {
        transform: `translateX(${x}px)`
      }
    },

    barStyle () {
      let { x, width } = this.vcTabs.barStyle

      x = x ? x : 0
      width= width ? width : 0

      return {
        width,
        transform: `translateX(${x}px)`
      }
    }
  },
  methods: {
    update() {
      this.$nextTick(() => {
        let { width } = this.$el.getBoundingClientRect()
        let { scrollWidth } = this.$el
  
        if (scrollWidth > width) {
          this.vcTabs.isOver = true
          this.navStyle.x = width - scrollWidth
        } else {
          this.vcTabs.isOver = false
        }
      })
    }
  },
  mounted() {
    addResizeListener(this.$el, this.update)
  },
  unmounted() {
    removeResizeListener(this.$el, this.update)
  }
}
</script>
