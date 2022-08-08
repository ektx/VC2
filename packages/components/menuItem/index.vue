<template>
  <div
    :class="[
      'vc-menu-item',
      $$Menu.mode + '-mode',
      'level-' + level,
      {
        'is-disabled': disabled,
        'is-open': isOpen,
        'is-active': isActive,
        'is-exact-active': isExactActive
      }
    ]"
    @mouseleave="onLeaveItem"
  >
    <div
      ref="header"
      class="vc-menu-item--header"
      @click="toggleChild"
      @mouseenter="onMouseEnterHeader"
    >
      <span :style="headerSapnStyle"><slot /></span>
      <i v-if="$slots.children" class="vc-icon-arrow-right"></i>
    </div>

    <div
      ref="children"
      v-if="$slots.children"
      :class="['vc-menu-child', `is-${$$Menu.mode}`]"
      @mouseleave="onLeaveLayer"
    >
      <slot name="children" />
    </div>
  </div>
</template>

<script>
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom'
import { menuInjectionKey } from '../menu/key'

export default {
  name: 'VcMenuItem',
  inject: {
    $$Menu: { from: menuInjectionKey }
  },
  props: {
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 绑定的值 */
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // isOpen: false,
      tooltip: null
    }
  },
  computed: {
    level() {
      return Reflect.has(this.$parent, 'level') ? this.$parent.level + 1 : 0
    },
    headerSapnStyle() {
      let obj = {}

      if (this.level && this.$$Menu.mode === 'inline')
        obj.paddingLeft = `calc(${this.level} * 1em)`
      return obj
    },
    // 是否为激活菜单或子菜单有激活
    isActive() {
      if (this.$$Menu.modelValue && this.value) {
        return this.$$Menu.modelValue[this.level] === this.value
      }
      return false
    },
    // 是否为精确激活菜单
    isExactActive() {
      if (this.isActive) {
        return this.$$Menu.modelValue.length === this.level + 1
      }
      return false
    },
    isOpen() {
      console.log(this.level, this.value, this.$$Menu.myExpand)
      return this.$$Menu.myExpand[this.level] === this.value
    }
  },
  // watch: {
  //   isOpen(val) {
  //     if (this.$refs.children)
  //       this.$refs.children.style.display = val ? 'block' : 'none'
  //   }
  // },
  mounted() {
    this.updateOpen()
  },
  methods: {
    toggleChild() {
      let { children } = this.$refs

      if (this.$parent.updateValue && !children) {
        this.$parent.updateValue([this.value])
      }

      if (children) {
        if (this.isOpen) {
          this.isOpen = false
        } else {
          this.isOpen = true
          this.showTooltip()
        }
      }
    },

    onMouseEnterHeader() {
      console.log('onMouseEnterHeader')

      let { children } = this.$refs

      if (children) {
        if (this.isOpen) {
          this.isOpen = false
        } else {
          this.isOpen = true
          this.showTooltip()
        }
      }
    },

    showTooltip() {
      const { header, children } = this.$refs

      if (this.$$Menu.mode === 'inline') {
        Object.assign(children.style, {})
      } else {
        let placement = 'right-start'

        if (this.$$Menu.mode !== 'vertical') {
          placement = this.level === 0 ? 'bottom-start' : 'right-start'
        }

        this.tooltip = autoUpdate(header, children, () => {
          computePosition(header, children, {
            placement,
            middleware: [flip(), offset(5)]
          }).then(({ x, y }) => {
            Object.assign(children.style, {
              left: x + 'px',
              top: y + 'px'
            })
          })
        })
      }
    },

    updateValue(val) {
      if (this.$parent.updateValue) {
        this.$parent.updateValue([this.value, ...val])
      }
    },

    updateOpen() {
      this.isOpen =
        this.$$Menu.mode === 'inline' && this.isActive && this.$refs.children
    },

    onLeaveLayer() {
      console.log('leave...')
    },

    onLeaveItem() {
      console.log('leave item')
    }
  }
}
</script>
