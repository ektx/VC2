<template>
  <div class="vc-tabs">
    <div class="vc-tabs__head">
      <div 
        v-if="isOver" 
        :class="[
          'vc-tabs__prev-btn', 
          {'is-disabled': isPrevDisable}
        ]" 
        @click="moveNav(1)"
      >
        <i class="vc-icon-arrow-left"/>
      </div>
      <div 
        v-if="isOver" 
        :class="[
          'vc-tabs__next-btn',
          {'is-disabled': isNextDisable}
        ]" 
        @click="moveNav(0)"
      >
        <i class="vc-icon-arrow-right"></i>
      </div>

      <div :class="['vc-tabs__scroll', {'is-over': isOver }]">
        <Nav ref="nav" :list="list"/>
      </div>
    </div>
    <div class="vc-tabs__body">
      <slot/>
    </div>
  </div>
</template>

<script>
import Nav from './tabNav.vue'

export default {
  name: 'VcTabs',
  components: { Nav },
  props: {
    // 选中对象
    value: {
      type: [String, Number],
      default: ''
    },
  },
  provide() {
    return { vcTabs: this }
  },
  watch: {
    value (val) {
      this.list.forEach(item => {
        if (item.id === val) this.activeTab = item
      })
    },

    activeTab (val, old) {
      if (old) old.active = false
      val.active = true
      this.$emit('update:value', val.id)

      this.$nextTick(() => {
        let el = this.$el.querySelector('.is-active')
        let { width, padding, paddingLeft } = window.getComputedStyle(el)
        let { x } = this.$refs.nav.navStyle
        let { width: elWidth } = this.$refs.nav.$el.getBoundingClientRect()

        let moveX = el.offsetLeft + parseInt(paddingLeft)
        
        // 左右 tab 溢出修正
        if (moveX < Math.abs(x)) {
          this.$refs.nav.navStyle.x = - el.offsetLeft 
        }

        if (moveX + x + parseInt(width) > elWidth) {
          this.$refs.nav.navStyle.x = elWidth - (moveX + parseInt(width) + parseInt(paddingLeft))
        }

        this.barStyle = {
          width,
          x: moveX
        }
      })
    }
  },
  data() {
    return {
      list: [],
      activeTab: null,
      barStyle: {},
      isOver: false,
      isPrevDisable: false,
      isNextDisable: false,
    }
  },
  methods: {
    updatePanel () {
      let slots = this.$slots.default()
      if (slots) {
        let paneSlots = []
        this.list = []

        // 对于动态生成的 pane
        if (typeof slots[0].type === 'symbol') {
          slots = slots[0].children
        }
        slots.forEach((vnode) => {
          if (vnode.type.name === 'vcTabPane') {
            const id = vnode.props.name || vnode.props.label
            const item = {
              icon: vnode.props.icon || '',
              label: vnode.props.label,
              id,
              active: id === this.value,
              disabled: Reflect.has(vnode.props, 'disabled'),
              closable: Reflect.has(vnode.props, 'closable')
            }

            this.list.push(item)
            if (id === this.value) this.activeTab = item
          }
        })
      } else {
        this.list = []
      }

      this.$refs.nav.update()
    },

    moveNav (toLeft = 0) {
      if (toLeft) {
        this.$refs.nav.navStyle.x += 100
      } else {
        this.$refs.nav.navStyle.x -= 100
      }
    }
  }
}
</script>
