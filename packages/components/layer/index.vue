<template>
  <transition 
    name="vc-fade-down" 
    @after-enter="afterEnter" 
    @after-leave="afterLeave"
  >
    <div 
      v-show="show" 
      class="vc-layer" 
      @click.self="layerBoxClick"
    >
      <transition name="scale">
        <div v-show="show" class="layer-inner" :style="style">
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
    // Dialog 自身是否插入至 body 元素上
    appendToBody: Boolean,
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
          isAllow: false
      }
  },
  watch: {
    show (val) {
      if (val) {
        // 允许记录点击位置
        this.isAllow = true
        this.$emit('open')

        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      }
    }
  },
  mounted () {
    if (this.show) {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
    document.documentElement.addEventListener('click', this.getClickPosition)
  },
  methods: {
    layerBoxClick () {
      if (!this.closeModal) this.hideLayer()
    },

    hideLayer () {
      this.$emit('update:show', false)
      this.$emit('close')
    },

    getClickPosition (evt) {
      if ( isIE() ) {
        if (this.show) return
      } else {
        // 防止组件记录了非开启弹层的位置信息
        if (!this.isAllow) return
        if (!this.show) return
      }

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
      this.isAllow = false
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
    document.documentElement.removeEventListener('click', this.getClickPosition)
  }
}
</script>

<style lang="less">
.vc-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow: auto;

  .layer-inner {
    width: 50%;
    margin: 100px auto;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);

    & > .vc-layer__header {
      position: relative;
      font-size: 18px;
      color: #333;
      font-weight: 400;
      text-align: left;
      padding: 15px 40px 10px 20px;

      i {
        position: absolute;
        top: 18px;
        right: 15px;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }

    & > .vc-layer__main {
      padding: 10px 20px;
    }

    & > .vc-layer__footer {
      padding: 10px 20px;
      text-align: right;

      button + button {
        margin-left: 10px;
      }
    }
  }
}
</style>