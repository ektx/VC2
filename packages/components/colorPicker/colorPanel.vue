<template>
  <div 
    class="vc-color-picker__hsl-panel" 
    :style="vcColorPicker.colorStyle"
    @mousedown="mousedownEvt"
  >{{cursorStyle}}-{{x}}:{{y}}
    <span 
      class="vc-color-picker__hsl-cursor"
      :style="cursorStyle"
    >
      <i></i>
    </span>
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance, onMounted, onUnmounted, watch } from 'vue'
import { useMousePosition } from '../../utils/mouse'
import { lightness, hue, saturation, HSV_V, HSV_S, isOpened } from './color'

export default {
  inject: ['vcColorPicker'],
  props: {
    // styles: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  setup(props) {
    const { ctx } = getCurrentInstance()
    const X = ref(0)
    const Y = ref(0)
    const start = ref({
      x: 0,
      y: 0,
      layerX: 0,
      layerY: 0,
    })
    const elBCR = ref({})
    const {x, y} = useMousePosition()

    const cursorStyle = computed(() => {
      return {
        transform: `translate(${X.value}px, ${Y.value}px)`
      }
    })

    onMounted(() => {
      document.addEventListener('mousemove', ctx.mousemoveEvt, false)
      document.addEventListener('mouseup', ctx.mouseupEvt, false)
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', ctx.mousemoveEvt, false)
      document.removeEventListener('mouseup', ctx.mouseupEvt, false)
    })

    watch(
      () => isOpened.value,
      (val) => {
        console.log(val)
        if (val) {
          ctx.$nextTick(() => {
            ctx.setPosition()
          })
        }
      }
    )

    return {
      x, y,
      X, Y,
      cursorStyle,
      start,
      elBCR,
      lightness,
      saturation,
      hue,
      HSV_S,
      HSV_V,
    }
  },
  methods: {
    clickEvt(evt) {
      evt.stopPropagation()
    },

    mousedownEvt(evt) {
      evt.stopPropagation()
      let { layerX, layerY} = evt

      this.elBCR = this.$el.getBoundingClientRect()
      this.start = {
        x: this.x, 
        y: this.y,
        layerX,
        layerY
      }
      this.X = layerX
      this.Y = layerY
      this.vcColorPicker.isActive = true
    },

    mouseupEvt(evt) {
      setTimeout(() => {
        this.vcColorPicker.isActive = false
      }, 1);
    },

    mousemoveEvt(evt) {
      if (this.vcColorPicker.isActive) {
        // console.log('mousemove...', this.elBCR)
        let {pageX, pageY} = evt
        let {x, y, layerX, layerY} = this.start
        let {width, height} = this.elBCR
        let _x = layerX + pageX - x
        let _y = layerY + pageY - y

        if (_x < 0) _x = 0
        if (_y < 0) _y = 0

        if (Math.abs(_x) > width) _x = width
        if (Math.abs(_y) > height) _y = height

        this.X = _x
        this.Y = _y
        // HSV
        this.HSV_V = (1 - _y / height) * 100
        this.HSV_S = _x / width
      }
    },

    setPosition() {
      this.elBCR = this.$el.getBoundingClientRect()
      let { width, height } = this.elBCR

      if (width && height) {
        this.X = width * (this.HSV_V/100)
        this.Y = height * (1 - this.HSV_S/100)
      }
    }
  }
}
</script>

<style lang="less">
.vc-color-picker__hsl {
  &-panel {
    position: relative;
    width: 230px;
    height: 125px;
    background: 
      linear-gradient(0deg,#000,transparent),
      linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
    overflow: hidden;
  }

  &-cursor {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0;
    height: 0;

    i {
      display: block;
      width: 10px;
      height: 10px;
      border: 1px solid #fff;
      border-radius: 100%;
      background: transparent;
      transform: translate(-50%, -50%);
    }
  }
}
</style>