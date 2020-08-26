<template>
  <div class="vc-tabs">
    <div class="vc-tabs__head">
      <div 
        v-if="isOver" 
        :class="[
          'vc-tabs__prev-btn', 
          {'is-disabled': isPrevDisable}
        ]" 
        @click="moveNav(-100)"
      >
        <i class="vc-icon-arrow-left"/>
      </div>
      <div 
        v-if="isOver" 
        :class="[
          'vc-tabs__next-btn',
          {'is-disabled': isNextDisable}
        ]" 
        @click="moveNav(100)"
      >
        <i class="vc-icon-arrow-right"></i>
      </div>

      <div :class="['vc-tabs__scroll', {'is-over': isOver }]">
        <Nav ref="nav" :list="list" :removeTab="removeTab"></Nav>
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
      if (!val) {
        this.$emit('update:value', '')
        return
      }

      val.active = true
      this.$emit('update:value', val.id)
    },
  },
  data() {
    return {
      list: [],
      activeTab: null,
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
        slots.forEach((vnode, index) => {
          if (vnode.type.name === 'vcTabPane') {
            const id = vnode.props.name || vnode.props.label
            const item = {
              icon: vnode.props.icon || '',
              label: vnode.props.label,
              id,
              active: id === this.value,
              disabled: Reflect.has(vnode.props, 'disabled'),
              closable: Reflect.has(vnode.props, 'closable'),
            }

            this.list.push(item)

            // 如果不存在默认值
            if (!this.value) {
              // 设置第一个tab为活动值
              if (index === 0) this.activeTab = item
            } else {
              if (id === this.value) this.activeTab = item
            }
          }
        })
      } else {
        this.list = []
      }
    },

    moveNav (step) {
      this.$refs.nav.moveNav(step)
    },

    removeTab (tab) {
      let index = this.list.findIndex(item => item.id === tab.id)
      this.list.splice(index, 1)
      // 更新当前标签
      if (this.activeTab && tab.id === this.activeTab.id) {
        this.activeTab = null
      } 

      this.$emit('tab-remove', tab, index)
      this.$emit('tabRemove', tab, index)
    }
  }
}
</script>
