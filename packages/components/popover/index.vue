<template>
  <div 
    class="vc-popover"
    @mouseenter="hoverEvt"
    @mouseleave="leaveEvt"
    @click.stop="clickEvt"
  >
    <teleport to="body">
      <transition name="vc-fade">
        <div
          ref="popper"
          v-show="isShow"
          class="vc-popover__layer"
          :style="{width}"
        >
          <div class="vc-popover__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <slot>{{ content }}</slot>
          <div class="arrow" data-popper-arrow></div>
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
      isShow: false
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
      this.isShow = true
      this.createPopperLayer()
    },
    hide() {
      if (!this.tooltip) return
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

<style lang="less">
.vc-popover {
  display: inline-block;

  &__layer {
    padding: 10px;
    font-size: 14px;
    color: #606266;
    border: 1px solid rgba(0,8,16,.15);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
    border-radius: 5px;
    z-index: 100;

    .arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #fff;
      transform: rotate(45deg);
      border: 1px solid rgba(0,8,16,.15);
    }

    &[data-popper-placement^='top'] > .arrow {
      bottom: -5px;
      border-top: none;
      border-left: none;
    }
    
    &[data-popper-placement^='bottom'] > .arrow {
      top: -5px;
      border-right: none;
      border-bottom: none;
    }
    
    &[data-popper-placement^='left'] > .arrow {
      right: -5px;
      border-left: none;
      border-bottom: none;
    }
    
    &[data-popper-placement^='right'] > .arrow {
      left: -5px;
      border-right: none;
      border-top: none;
    }
  }

  &__title {
    padding: 0 0 5px;
    font-size: 16px;
    color: #333;
  }
}
</style>