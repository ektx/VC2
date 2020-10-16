<template>
  <div 
    class="vc-popover"
    @mouseenter="hoverEvt"
    @mouseleave="leaveEvt"
  >
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
    placement: {
      type: String,
      default: 'bottom',
    },
    // @arguments hover/click/focus/manual
    trigger: {
      type: String,
      default: 'hover',
      validator: value => ['click', 'focus', 'hover', 'manual'].indexOf(value) > -1
    },
    title: String,
    content: String,
    width: {
      type: String,
      default: 'auto'
    }
  },
  data() {
    return {
      tooltip: null,
      isShow: false
      // reference: null
    }
  },
  mounted() {
    // debugger
    // let reference = this.$slots.reference

    // if (reference) {
    //   console.log(this.reference)
    // }
  },
  methods: {
    hoverEvt() {
      if (this.trigger !== 'hover') return
      console.log('hover')
      this.isShow = true
      this.createPopperLayer()
    },
    leaveEvt() {
      if (this.trigger !== 'hover') return
      console.log('hide')
      // this.isShow = false
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