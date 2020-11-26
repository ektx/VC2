<template>
  <div 
    class="vc-popover"
    @mouseenter="hoverEvt"
    @mouseleave="leaveEvt"
    @click="clickEvt"
  >
    <teleport to="body">
      <transition name="vc-fade">
        <div
          ref="popper"
          v-show="isShow"
          class="vc-popover__layer"
          :style="{width}"
        >
          <div v-if="title" class="vc-popover__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <slot>{{ content }}</slot>
          <div class="arrow" data-popper-arrow>
            <svg id="svg" width="16" height="6">
              <path class="svg-arrow" d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></path>
              <path class="svg-content" d="m0 7s2 0 5-4c1-1 2-2 3-2 1 0 2 1 3 2 3 4 5 4 5 4h-16z"></path>
            </svg>
          </div>
        </div>
      </transition>
    </teleport>
    <span ref="referenceArea">
      <slot name="reference"/>
    </span>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'

export default {
  name: 'VcPopover',
  props: {
    // 状态是否可见
    modelValue: {
      type: Boolean,
      default: null
    },
    // 出现位置
    // @arguments top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    placement: {
      type: String,
      default: 'bottom',
    },
    // 触发方式
    // @arguments hover/click/focus/manual
    trigger: {
      type: String,
      default: 'hover',
      validator: value => ['click', 'focus', 'hover', 'manual'].includes(value)
    },
    // 标题
    title: String,
    // 显示的内容，也可以通过 slot 传入 DOM
    content: String,
    // 宽度
    width: {
      type: String,
      default: 'auto'
    }
  },
  watch: {
    modelValue(val) {
      this.isShow = val
      if (val) {
        this.createPopperLayer()
      }
    }
  },
  data() {
    return {
      tooltip: null,
      isShow: false,
      onClick: false
    }
  },
  mounted() {
    document.addEventListener('click', this.hide)
    this.$el.addEventListener('focusin', this.focusIn)
    this.$el.addEventListener('focusout', this.focusOut)
  },
  unmounted() {
    document.removeEventListener('click', this.hide)
    this.$el.removeEventListener('focusin', this.focusIn)
    this.$el.removeEventListener('focusout', this.focusOut)
  },
  methods: {
    hoverEvt() {
      if (this.trigger !== 'hover') return
      this.isShow = true
      this.createPopperLayer()
    },
    leaveEvt() {
      if (this.trigger !== 'hover') return
      this.hide()
    },
    clickEvt() {
      if (this.trigger !== 'click') return
      this.onClick = true
      this.isShow = true
      this.createPopperLayer()
    },
    hide() {
      if (!this.tooltip) return
      if (this.onClick) {
        this.onClick = false
        return
      }
      // 如果是手动，不能全局关闭
      if (this.modelValue) return

      this.isShow = false
      
      setTimeout(() => {
        if (!this.tooltip) return

        this.tooltip.destroy()
        this.tooltip = null
      }, 300)
    },
    focusIn() {
      if (this.trigger !== 'focus') return
      this.isShow = true
      this.createPopperLayer()
    },
    focusOut() {
      if (this.trigger !== 'focus') return
      this.hide()
    },
    createPopperLayer() {
      if (!this.tooltip) {
        this.tooltip = createPopper(
          this.$refs.referenceArea,
          this.$refs.popper,
          {
            placement: this.placement,
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 15]
                }
              },
              {
                name: 'computeStyles',
                options: {
                  adaptive: false,
                  gpuAcceleration: false
                }
              }
            ],
            strategy: 'fixed'
          }
        )
      }
    }
  }
}
</script>
