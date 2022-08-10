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
        'is-exact-active': isExactActive,
        'is-collapse': $$Menu.collapse
      }
    ]"
  >
    <div
      ref="header"
      class="vc-menu-item--header"
      @click="toggleChild"
      @mouseenter="onMouseEnterHeader"
      @mouseleave="onMouseLeaveHeader"
    >
      <div class="vc-menu-item--padding" :style="headerSapnStyle"></div>
      <div v-if="icon || $slots.icon" class="vc-menu-item--icon">
        <slot name="icon">
          <i :class="icon"></i>
        </slot>
      </div>
      <div class="vc-menu-item--hd-inner">
        <slot></slot>
      </div>
      <i
        v-if="$slots.children"
        class="vc-menu-item--more vc-icon-arrow-right"
      ></i>
    </div>

    <div
      ref="children"
      v-if="$slots.children"
      :class="['vc-menu-item--child', `is-${$$Menu.mode}`]"
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
    },
    // 图标（VC2 中图标）
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tooltip: null,
      timer: null
    }
  },
  computed: {
    level() {
      return Reflect.has(this.$parent, 'level') ? this.$parent.level + 1 : 0
    },
    headerSapnStyle() {
      let obj = {}

      if (this.level && this.$$Menu.mode === 'inline' && !this.$$Menu.collapse)
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
        return this.$$Menu.modelValue.slice(-1)[0] === this.value
      }
      return false
    },
    isOpen() {
      // console.log(this.level, this.value, this.$$Menu.myExpand)
      let { collapse, myExpand, mode } = this.$$Menu
      let { children } = this.$refs
      let result = myExpand[this.level] === this.value

      if (children) {
        children.style.display = result ? 'block' : 'none'
      }

      switch (mode) {
        case 'inline':
          if (collapse && children) {
            result && this.showTooltip()
          }
          return result

        case 'vertical':
          children && result && this.showTooltip()
          return result

        case 'horizontal':
          children && result && this.showTooltip()
          return result
      }
    }
  },
  methods: {
    // 点击时
    toggleChild() {
      if (this.disabled) return
      // 有子级时 我们只担任展开或收缩
      if (this.$refs.children) {
        // 如果是在折叠菜单时
        if (this.$$Menu.collapse) return
        this.$$Menu.myExpand[this.level] = this.isOpen ? '' : this.value
      } else {
        this.$parent.updateValue([this.value])
      }
    },

    onMouseEnterHeader() {
      this.$$Menu.clearTimer()

      if (this.disabled) return

      if (this.$$Menu.mode !== 'inline' || this.$$Menu.collapse) {
        this.$parent.updateExpand([this.value])
      }
    },

    onMouseLeaveHeader() {
      if (this.$$Menu.mode !== 'inline' || this.$$Menu.collapse)
        this.$$Menu.clearMyExpand()
    },

    // 展示浮层
    showTooltip() {
      const { header, children } = this.$refs

      let placement = 'right-start'

      if (this.$$Menu.mode === 'horizontal') {
        placement = this.level === 0 ? 'bottom-start' : 'right-start'
      }

      this.tooltip = autoUpdate(header, children, () => {
        computePosition(header, children, {
          placement,
          middleware: [flip(), offset(2)]
        }).then(({ x, y }) => {
          Object.assign(children.style, {
            left: x + 'px',
            top: y + 'px'
          })
        })
      })
    },

    updateValue(val) {
      if (this.$parent.updateValue) {
        this.$parent.updateValue([this.value, ...val])
      }
    },

    updateExpand(val) {
      if (this.$parent.updateExpand) {
        this.$parent.updateExpand([this.value, ...val])
      }
    }
  }
}
</script>
