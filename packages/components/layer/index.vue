<template>
  <transition 
    name="vc-fade-animate" 
    @after-enter="afterEnter" 
    @after-leave="afterLeave"
  >
    <div 
      v-show="visible" 
      :class="['vc-layer', {'is-fullscreen': fullscreen}]" 
      @click.self.stop="layerBoxClick"
    >
      <transition :name="contentAnimate">
        <div v-show="visible" class="vc-layer__inner" :style="style" @click.stop>
          <div class="vc-layer__header">
            <slot name="title">
              <span>{{title}}</span>
            </slot>
            <i class="vc-icon-close" @click="hideLayer"></i>
          </div>
          <div class="vc-layer__main"><slot></slot></div>
          <div class="vc-layer__footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
        </transition>
      </div>
  </transition>
</template>

<script>
import { isIE } from '../../utils/IE'

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
    width: String,
    position: {
      type: Object,
      default: () => ({})
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
    beforeClose: Function
  },
  computed: {
    style () {
      let style = {}
      let {x, y} = this.evt

      // 如果用户指定了位置
      if (this.position) {
        x = Reflect.has(this.position, 'x') ? this.position.x : x
        y = Reflect.has(this.position, 'y') ? this.position.y : y
      } 

      style = {
        transformOrigin: `${x}px ${y}px`
      }

      if (this.width) style.width = this.width

      return style
    }
  },
  data () {
    return {
      evt: {
        x: 0,
        y: 0
      },
      // 默认不是组件调用关闭
      toClose: false,
      visible: false,
      contentAnimate: 'vc-scale',
      timer: null
    }
  },
  watch: {
    show: {
      handler(val) {
        if (val) {
          this.toClose = false

          this.timer = setTimeout(() => {
            this.$emit('open')
            this.getClickPosition()
          }, 50)
        } else {
          // 组件内调用时，重置（防止多次关闭事件）
          if (this.toClose) {
            this.toClose = false
            return
          }
          this.close()
        }
      },
      immediate: true
    }
  },
  mounted () {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
    window.addEventListener('click', this.windowEvent)
  },
  methods: {
    layerBoxClick () {
      if (!this.closeModal) this.hideLayer()
    },

    hideLayer () {
      if (this.beforeClose) {
        this.beforeClose(this.close)
        return
      }

      this.close()
    },

    close() {
      // 标记组件关闭事件
      this.toClose = true
      this.visible = false
      this.$emit('update:show', false)
      this.$emit('close')
    },

    windowEvent(evt) {
      if (this.show) {
        if (this.timer) {
          this.timer = clearTimeout(this.timer)
        }

        this.getClickPosition(evt)
      }
    },

    getClickPosition (evt) {
      if ( isIE() ) {
        if (this.show) return
      }

      if (evt) {
        if (this.visible) return

        this.contentAnimate = 'vc-scale'
        this.visible = true

        let { clientX, clientY } = evt
        // 0.5为弹层的默认宽度
        let width = window.innerWidth * .5
              
        if (this.width) {
          if (this.width.endsWith('px')) {
            width = parseInt(this.width)
          } 
          // 20vw 20%
          else {
            width = window.innerWidth * (parseInt(this.width)/100)
          }
        }
  
        let halfW = width / 2
        let x = clientX - (window.innerWidth / 2)
        let y = clientY - 100
  
        // x 轴偏移
        x = x + halfW
        this.evt = Object.assign({}, {x, y})
      } else {
        this.contentAnimate = 'vc-fade-down-animate'
        this.visible = true
      }
    },

    afterEnter() {
      this.$emit('opened')
    },
        
    afterLeave() {
      this.$emit('closed')
    }
  },
  unmounted () {
    if (this.appendToBody && this.$el) {
      this.$el.parentNode.removeChild(this.$el)
    }
    window.removeEventListener('click', this.windowEvent)
  }
}
</script>
