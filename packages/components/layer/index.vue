<template>
  <transition name="vc-fade-animate">
    <div
      v-show="visible"
      :class="['vc-layer', { fullscreen }]"
      @click.stop.self="layerBoxClick"
    >
      <div ref="content" class="vc-layer--inner" :style="style" @click.stop>
        <div class="vc-layer--header">
          <slot name="header">
            <span>{{ title }}</span>
            <i class="vc-icon-close" @click="hideLayer"></i>
          </slot>
        </div>
        <div class="vc-layer--main"><slot></slot></div>
        <div v-if="$slots.footer" class="vc-layer--footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VcLayer',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    // 调整弹层的宽度
    width: {
      type: String,
      default: '50%'
    },
    offset: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0
      })
    },
    // 点击背景不消失，默认false
    closeModal: {
      type: Boolean,
      default: false
    },
    // 弹层自身是否插入至 body 元素上
    appendToBody: Boolean,
    // 是否为全屏
    fullscreen: Boolean,
    // 关闭前的回调，会暂停弹层的关闭
    beforeClose: {
      type: Function,
      default: null
    }
  },
  emits: ['open', 'update:show', 'close', 'opened', 'closed'],
  data() {
    return {
      // 默认不是组件调用关闭
      visible: false,
      timer: null,
      style: {},
      fromStyle: {},
      toStyle: {}
    }
  },
  watch: {
    show: {
      handler(val, old) {
        if (val) {
          this.timer = setTimeout(() => {
            this.getClickPosition()
          }, 50)
        } else {
          old !== undefined && this.close()
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
    window.addEventListener('click', this.windowEvent)
  },
  unmounted() {
    if (this.appendToBody && this.$el) {
      this.$el.parentNode.removeChild(this.$el)
    }
    window.removeEventListener('click', this.windowEvent)
  },
  methods: {
    layerBoxClick() {
      !this.closeModal && this.hideLayer()
    },

    hideLayer() {
      if (this.beforeClose) {
        this.beforeClose()
        return
      }

      this.close()
    },

    close() {
      this.visible = false
      this.$emit('close')
      this.animate(this.toStyle, this.fromStyle, () => {
        this.$emit('update:show', false)
        this.$emit('closed')
        document.documentElement.style.overflow = ''
      })
    },

    windowEvent(evt) {
      if (this.show) {
        if (this.timer) {
          this.timer = clearTimeout(this.timer)
        }
        evt && this.getClickPosition(evt)
      }
    },

    getClickPosition(evt) {
      if (this.visible) return
      // 打开开始
      this.$emit('open')
      // 开始主容器显示
      this.visible = true
      document.documentElement.style.overflow = 'hidden'

      this.fromStyle.opacity = 0
      this.toStyle.opacity = 1

      if (this.fullscreen) {
        this.fromStyle.transform = 'translateY(100px)'
        this.toStyle.transform = 'translateY(0)'
      } else {
        let targetDOMRect = evt
          ? evt.target.getBoundingClientRect()
          : { x: 0, y: 0 }
        let width = this.getWidth()
        let offset = { ...{ x: 0, y: 0 }, ...this.offset }
        let toX = (window.innerWidth - width) / 2 + offset.x
        let toY = 100 + offset.y
        let fromX = evt ? targetDOMRect.x : toX
        let fromScale = evt ? 0 : 1

        this.fromStyle.transform = `translate(${fromX}px, ${targetDOMRect.y}px) scale(${fromScale})`
        this.toStyle.transform = `translate(${toX}px, ${toY}px) scale(1)`
      }

      this.animate(this.fromStyle, this.toStyle, () => {
        this.style = this.toStyle
        this.$emit('opened')
      })
    },

    getWidth() {
      // 0.5为弹层的默认宽度
      let width = window.innerWidth * 0.5

      if (this.width) {
        if (this.width.endsWith('px')) {
          width = parseInt(this.width)
        }
        // 20vw 20%
        else {
          width = window.innerWidth * (parseInt(this.width) / 100)
        }
      }

      return width
    },

    animate(from, to, cb) {
      const animate = this.$refs.content.animate([from, to], {
        duration: 350,
        easing: 'ease-in-out'
      })
      animate.onfinish = () => cb()
    }
  }
}
</script>
