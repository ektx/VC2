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
          :style="layerStyle"
          @click="popperClick"
        >
          <div v-if="title" class="vc-popover__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <slot>{{ content }}</slot>
          <div class="vc-popover__footer">
            <button
              type="submit"
              v-if="confirmButtonText"
              @click="confirmClickEvt"
            >
              {{ confirmButtonText }}
            </button>
            <button
              type="button"
              v-if="cancelButtonText"
              @click="cancelClickEvt"
            >
              {{ cancelButtonText }}
            </button>
          </div>
          <div class="arrow">
            <svg id="svg" width="16" height="6">
              <path
                class="svg-arrow"
                d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"
              ></path>
              <path
                class="svg-content"
                d="m0 7s2 0 5-4c1-1 2-2 3-2 1 0 2 1 3 2 3 4 5 4 5 4h-16z"
              ></path>
            </svg>
          </div>
        </div>
      </transition>
    </teleport>
    <span ref="referenceArea">
      <slot name="reference" />
    </span>
  </div>
</template>

<script>
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  arrow
} from '@floating-ui/dom'

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
      default: 'bottom'
    },
    /** 触发方式
     *  @arguments hover/click/focus/manual(手动)
     **/
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
      type: [String, Number],
      default: 'auto'
    },
    /** 确认按钮 */
    confirmButton: {
      type: [Boolean, String],
      default: false
    },
    /** 取消按钮 */
    cancelButton: {
      type: [Boolean, String],
      default: false
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
      timer: null
    }
  },
  computed: {
    layerStyle() {
      return {
        width: typeof this.width === 'number' ? this.width + 'px' : this.width
      }
    },
    confirmButtonText() {
      return typeof this.confirmButton === 'boolean'
        ? this.confirmButton
          ? 'Yes'
          : ''
        : this.confirmButton
    },
    cancelButtonText() {
      return typeof this.cancelButton === 'boolean'
        ? this.cancelButton
          ? 'Yes'
          : ''
        : this.cancelButton
    }
  },
  mounted() {
    window.addEventListener('click', this.hide, true)
    this.$el.addEventListener('focusin', this.focusIn)
    this.$el.addEventListener('focusout', this.focusOut)
  },
  unmounted() {
    window.removeEventListener('click', this.hide, true)
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
      this.trigger === 'hover' && this.hide()
    },
    clickEvt() {
      if (this.trigger === 'click') {
        this.isShow = true
        this.createPopperLayer()
      }
    },

    focusIn() {
      if (this.trigger === 'focus') {
        this.isShow = true
        this.createPopperLayer()
      }
    },
    focusOut() {
      this.trigger === 'focus' && this.hide()
    },

    hide(time = 200) {
      if (!this.isShow) return

      this.timer = setTimeout(() => {
        this.isShow = false

        if (this.trigger === 'manual') {
          this.$emit('update:modelValue', this.isShow)
        }

        this.tooltip = null
      }, time)
    },

    createPopperLayer() {
      if (!this.$refs.referenceArea) return

      const { referenceArea, popper } = this.$refs
      const arrowElement = popper.querySelector('.arrow')

      this.tooltip = autoUpdate(referenceArea, popper, () => {
        if (!referenceArea) return

        computePosition(referenceArea, popper, {
          placement: this.placement,
          strategy: 'fixed',
          middleware: [
            flip(),
            offset(12),
            shift({ padding: 5 }),
            arrow({ element: arrowElement })
          ]
        }).then(({ x, y, placement, middlewareData }) => {
          Object.assign(popper.style, {
            left: x + 'px',
            top: y + 'px'
          })

          const { x: arrowX, y: arrowY } = middlewareData.arrow
          const { width, height } = popper.getBoundingClientRect()

          let top = ''

          if (arrowY != null) {
            // 箭头宽度 16 添加 4px 美化
            top = arrowY + 20 > height ? height - 20 : arrowY
            // border-radius 10
            top = top > 10 ? top : 10
            top += 'px'
          }

          arrowElement.setAttribute('placement', placement)

          Object.assign(arrowElement.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top
          })
        })
      })
    },
    popperClick() {
      if (this.timer) clearTimeout(this.timer)
    },
    confirmClickEvt() {
      this.$emit('confirm', true)
      this.hide(0)
    },
    cancelClickEvt() {
      this.$emit('cancel', false)
      this.hide(0)
    }
  }
}
</script>
