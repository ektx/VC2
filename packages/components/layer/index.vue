<template>
  <transition name="vc-fade-animate">
    <div
      v-show="visible"
      :class="['vc-layer', { fullscreen }]"
      @click.self="layerBoxClick"
    >
      <div ref="content" class="vc-layer--inner" :style="style">
        <div v-if="!noHeader" class="vc-layer--header">
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
    // 不需要头部
    noHeader: {
      type: Boolean,
      default: false
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
      toStyle: {},
      // 记录鼠标点击元素位置信息
      mousePosition: null
    }
  },
  watch: {
    show: {
      handler(val) {
        if (val) this.toggleDisplay()
        else this.close()
      }
    }
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
    window.addEventListener('click', this.getClickPosition, true)

    this.$nextTick(() => {
      this.show && this.toggleDisplay()
    })
  },
  unmounted() {
    if (this.$el) {
      this.$el.remove()
    }
    window.removeEventListener('click', this.getClickPosition, true)
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

    getClickPosition(e) {
      let { x, y } = e.target.getBoundingClientRect()
      this.mousePosition = { x, y }

      setTimeout(() => {
        this.mousePosition = null
      }, 100)
    },

    toggleDisplay() {
      if (this.visible) return
      // 打开开始
      this.$emit('open')
      // 开始主容器显示
      this.visible = true
      document.documentElement.style.overflow = 'hidden'

      this.fromStyle = { opacity: 0 }
      this.toStyle = { opacity: 1 }

      if (this.fullscreen) {
        this.fromStyle.transform = 'translateY(100px)'
        this.toStyle.transform = 'translateY(0)'
      } else {
        let width = this.getWidth()
        let offset = { ...{ x: 0, y: 0 }, ...this.offset }
        let toX = (window.innerWidth - width) / 2 + offset.x
        let toY = 100 + offset.y
        let { x = 0, y = 0 } = this.mousePosition || {}
        let scale = this.mousePosition ? 0 : 1

        x = this.mousePosition ? x : toX

        this.toStyle.width = width + 'px'
        this.fromStyle.transform = `translate(${x}px, ${y}px) scale(${scale})`
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
      let fontSize = 0

      switch (true) {
        case this.width.endsWith('rem'):
          ;({ fontSize } =
            document.documentElement.style ||
            window.getComputedStyle(document.documentElement))
          width = parseFloat(this.width) * parseInt(fontSize)
          break

        case this.width.endsWith('em'):
          ;({ fontSize } = this.$el.style || window.getComputedStyle(this.$el))
          width = parseFloat(this.width) * parseInt(fontSize)
          break

        // 20vw 20%
        case /[vw|%]/i.test(this.width):
          width = window.innerWidth * (parseInt(this.width) / 100)
          break

        default:
          width = parseInt(this.width)
      }

      return width
    },

    animate(from, to, cb) {
      const animate = this.$refs.content.animate([from, to], {
        duration: 300,
        easing: 'ease-out'
      })
      animate.onfinish = () => cb()
    }
  }
}
</script>
