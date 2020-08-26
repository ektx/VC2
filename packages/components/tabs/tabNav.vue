<template>
  <ul class="vc-tabs__nav" :style="comNavStyle">
    <Bar ref="bar"/>
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
      @click="evt => clickEvt(evt, tab)"
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
import Bar from './bar.vue'

export default {
  components: { Bar },
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
      isStep: false
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
  },
  methods: {
    update() {
      let { width } = this.$el.getBoundingClientRect()
      let { width: _w } = this.$el.parentNode.getBoundingClientRect()
      
      this.vcTabs.isOver = width > _w
      this.$refs.bar.updateBar()
    },

    closeEvt(evt, tab) {
      evt.stopPropagation()

      if (tab.disabled) return

      let { width } = evt.target.parentNode.getBoundingClientRect()

      this.navStyle.x += width

      if (this.navStyle.x > 0) this.navStyle.x = 0

      this.removeTab(tab)
    },

    clickEvt (evt, tab) {
      this.vcTabs.activeTab = tab
      this.vcTabs.$emit('tab-click', tab, evt)
      this.vcTabs.$emit('tabClick', tab, evt)
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
      this.isStep = true
    }
  },
  updated() {
    if (this.isStep) this.isStep = false
    else this.update()
  },
  mounted() {
    addResizeListener(this.$el.parentNode, this.update)
  },
  unmounted() {
    removeResizeListener(this.$el.parentNode, this.update)
  }
}
</script>
