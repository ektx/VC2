<template>
  <ul class="vc-tabs__nav" :style="comNavStyle">
    <li class="vc-tabs__active-bar" :style="comBarStyle"></li>
    <li 
      v-for="tab in list" 
      :key="tab.label"
      :class="[
        'vc-tabs__item', 
        {
          'is-active': tab.active,
          'is-disabled': tab.disabled
        }
      ]" 
      @click="clickEvt(tab)"
    >
      <span :id="`tab-nav__${tab.id}`" class="vc-tabs__item-label">
        <i v-if="tab.icon" :class="tab.icon"></i>
        {{ tab.label }}
      </span>
      <i v-if="tab.closable" class="vc-icon-close" @click="evt => closeEvt(evt, tab)"></i>
    </li>
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
    removeTab: {
      type: Function,
    }
  },
  inject: ['vcTabs'],
  data() {
    return {
      navStyle: {},
      barStyle: {}
    }
  },
  computed: {
    comNavStyle () {
      let { x = 0 } = this.navStyle

      this.vcTabs.isNextDisable = x === 0

      if (this.$el) {
        let { scrollWidth } = this.$el
        let { width } = this.$el.parentNode.getBoundingClientRect()

        this.vcTabs.isPrevDisable = width - x >= scrollWidth
      }

      return {
        transform: `translateX(${x}px)`
      }
    },

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
    update() {
      this.$nextTick(() => {
        let { width } = this.$el.getBoundingClientRect()
        let { width: _w } = this.$el.parentNode.getBoundingClientRect()
        let activeEl = this.$el.querySelector('.is-active')
        
        if (activeEl) {
          this.updateBar()
        }

        this.vcTabs.isOver = width > _w
      })
    },

    closeEvt(evt, tab) {
      evt.stopPropagation()

      if (tab.disabled) return

      let { width } = evt.target.parentNode.getBoundingClientRect()

      this.navStyle.x += width

      if (this.navStyle.x > 0) this.navStyle.x = 0
      if (tab.active) this.barStyle.width = 0

      this.removeTab(tab)
    },

    updateBar() {
      let el = this.$el.querySelector('.is-active')

      if (!el) return

      let { width, paddingLeft } = window.getComputedStyle(el)
      let { width: elWidth } = this.$el.parentNode.getBoundingClientRect()
      let { x = 0 } = this.navStyle

      let moveX = el.offsetLeft + parseInt(paddingLeft)
      
      // 左右 tab 溢出修正
      if (moveX < Math.abs(x)) {
        this.navStyle.x = - el.offsetLeft 
      }

      if (moveX + x + parseInt(width) > elWidth) {
        this.navStyle.x = elWidth - (moveX + parseInt(width) + parseInt(paddingLeft))
      }

      this.barStyle = {
        width,
        x: moveX
      }
    },

    clickEvt (tab) {
      this.vcTabs.activeTab = tab
      this.$nextTick(this.updateBar)
    },

    moveNav(step = 0) {
      let { x = 0 } = this.navStyle
      let { scrollWidth } = this.$el
      let { width } = this.$el.parentNode.getBoundingClientRect()

      x += step

      if (width - x >= scrollWidth) {
        x = width - scrollWidth
      }

      if (x > 0) x = 0

      this.navStyle.x = x
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
