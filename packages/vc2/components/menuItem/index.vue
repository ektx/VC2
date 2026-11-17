<template>
  <div
    :class="[
      'vc-menu-item',
      $$Menu.mode + '-mode',
      'level-' + level,
      {
        'is-disabled': disabled,
        'is-active': isActive,
        'is-exact-active': isExactActive,
        'is-collapse': $$Menu.collapse
      }
    ]"
  >
    <div
      ref="header"
      :class="['vc-menu-item--header', { 'is-open': isOpen }]"
      @click="toggleChild('node')"
      @mouseenter="onMouseEnterHeader"
      @mouseleave="onMouseLeaveHeader"
    >
      <div class="vc-menu-item--padding" :style="headerSapnStyle"></div>
      <div
        :class="['vc-menu-item--more ', `in-${$$Menu.moreIconPosition}`]"
        v-if="$$Menu.moreIconPosition === 'left'"
        @click.stop="toggleChild('icon')"
      >
        <slot name="more" :status="isOpen">
          <i
            :class="[`${$slots.children ? 'vc-icon-arrow-right' : 'empty'}`]"
          ></i>
        </slot>
      </div>
      <div v-if="icon || $slots.icon" class="vc-menu-item--icon">
        <slot name="icon">
          <i :class="icon"></i>
        </slot>
      </div>
      <div class="vc-menu-item--hd-inner">
        <slot></slot>
      </div>
      <div
        :class="['vc-menu-item--more ', `in-${$$Menu.moreIconPosition}`]"
        v-if="$slots.children && $$Menu.moreIconPosition === 'right'"
        @click.stop="toggleChild('icon')"
      >
        <slot name="more" :status="isOpen">
          <i class="vc-icon-arrow-right"></i>
        </slot>
      </div>
    </div>

    <teleport
      to="body"
      :disabled="$$Menu.mode === 'inline' && !$$Menu.collapse"
    >
      <div
        ref="children"
        v-if="$slots.children"
        :class="[
          'vc-menu-item--child',
          `is-${$$Menu.mode}`,
          { 'is-open': isOpen, 'is-fixed': isFixed }
        ]"
      >
        <div class="vc-menu-item--child-inner">
          <slot name="children"></slot>
        </div>
      </div>
    </teleport>
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
        obj.paddingLeft = `calc(${this.level} * 1.5em)`
      return obj
    },
    // 是否为激活菜单或子菜单有激活
    isActive() {
      return this.$$Menu.activePath[this.level] === this.value
    },
    // 是否为精确激活菜单
    isExactActive() {
      const result = this.$$Menu.modelValue === this.value

      if (result) {
        this.$nextTick(() => {
          this.$$Menu.activePath = []

          this.$$Menu.activePath[this.level] = this.value
          this.$parent.updateActivePath && this.$parent.updateActivePath()
        })
      }

      return result
    },
    isFixed() {
      const { collapse, mode } = this.$$Menu

      return (
        (collapse === true && mode === 'inline') ||
        ['vertical', 'horizontal'].includes(mode)
      )
    },
    isOpen() {
      let { myExpand } = this.$$Menu
      let { children } = this.$refs
      let result = [].concat(myExpand).includes(this.value)

      if (this.isFixed && children && result) {
        this.showTooltip()
      }

      return result
    }
  },
  methods: {
    /**
     * 收缩与展开节点功能
     * @param {string} type 类型标记
     **/
    toggleChild(type) {
      const { mode, updateValue, clearMyExpand } = this.$$Menu

      if (this.disabled) return
      // 有子级时 我们只担任展开或收缩
      if (this.$refs.children) {
        // 当只允许点击图标展开收缩时
        if (this.$$Menu.expandOnClickIcon) {
          if (type !== 'icon') return
        }
        // 如果是在折叠菜单时
        if (this.$$Menu.collapse) return

        if (mode === 'inline') {
          const findIndex = this.$$Menu.myExpand.findIndex(
            item => item === this.value
          )

          if (this.isOpen) {
            this.$$Menu.myExpand.splice(findIndex, 1)
          } else {
            this.$$Menu.myExpand.push(this.value)
          }
        }
      } else {
        updateValue([this.value], this)

        if (mode !== 'inline') clearMyExpand()
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
      if (this.$$Menu.mode !== 'inline' || this.$$Menu.collapse) {
        this.$$Menu.clearMyExpand()
      }
    },

    // 展示浮层
    showTooltip() {
      const { header, children } = this.$refs

      let placement = 'right-start'

      if (this.$$Menu.mode === 'horizontal') {
        placement = this.level === 0 ? 'bottom-start' : 'right-start'
      }

      if (this.tooltip) return

      this.tooltip = autoUpdate(header, children, () => {
        if (!this.isOpen && this.tooltip) {
          this.tooltip()
          this.tooltip = null
          return
        }

        computePosition(header, children, {
          strategy: 'fixed',
          placement,
          middleware: [flip(), offset({ mainAxis: 3 })]
        }).then(({ x, y }) => {
          Object.assign(children.style, {
            left: x + 'px',
            top: y + 'px'
          })
        })
      })
    },

    updateValue(val, that) {
      this.$parent.updateValue([this.value, ...val], that)
    },

    updateActivePath() {
      this.$$Menu.activePath[this.level] = this.value

      this.$parent.updateActivePath && this.$parent.updateActivePath()
    },

    updateExpand(val) {
      if (this.$parent.updateExpand) {
        this.$parent.updateExpand([this.value, ...val])
      }
    }
  }
}
</script>
