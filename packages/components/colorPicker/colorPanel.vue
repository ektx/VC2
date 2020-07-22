<template>
  <div 
    class="vc-color-picker__hsl-panel" 
    :style="panelColor"
    @mousedown="mousedownEvt"
    @mouseup="mouseupEvt"
  >
    <span 
      class="vc-color-picker__hsl-cursor"
      :style="cursorStyle"
    >
      <i></i>
    </span>
  </div>
</template>

<script>
import { 
  ref, 
  computed, 
  getCurrentInstance, 
  onMounted, 
  onUnmounted, 
  watch, inject 
} from 'vue'
import { useMousePosition } from '../../utils/mouse'

export default {
  inject: ['vcColorPicker'],
  props: {
    isOpened: Boolean,
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

    const cursorStyle = computed(() => ({
      transform: `translate(${X.value}px, ${Y.value}px)`
    }))
    const panelColor = computed(() => {
      let { h } = ctx.vcColorPicker.hsv
      return {
        backgroundColor: `hsl(${h}, 100%, 50%)`
      }
    })

    onMounted(() => {
      document.addEventListener('mousemove', ctx.mousemoveEvt, false)
      // document.addEventListener('mouseup', ctx.mouseupEvt, false)
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', ctx.mousemoveEvt, false)
      // document.removeEventListener('mouseup', ctx.mouseupEvt, false)
    })

    watch(
      () => props.isOpened,
      (val) => {
        if (val) {
          ctx.$nextTick(() => {
            ctx.setPosition()
          })
        }
      }
    )

    let _HSV = inject('VCColorPickerHSV')
    watch(
      () => _HSV.value,
      (val) => {
        if (!ctx.vcColorPicker.isActive) ctx.setPosition()
      }
    )

    return {
      x, y,
      X, Y,
      cursorStyle,
      panelColor,
      start,
      elBCR,
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
        let { h } = this.vcColorPicker.hsv
        let v = Math.round((1 - _y / height) * 100)
        let s = Math.round(_x / width * 100)

        this.vcColorPicker.hsv = {h, s, v}
      }
    },

    setPosition() {
      this.elBCR = this.$el.getBoundingClientRect()
      let { width, height } = this.elBCR
      let { s, v } = this.vcColorPicker.hsv

      if (width && height) {
        this.X = Math.round(width * (s / 100))
        this.Y = Math.round(height * (1 - v / 100))
      }
    }
  }
}
</script>
