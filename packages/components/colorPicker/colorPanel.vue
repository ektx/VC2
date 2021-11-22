<template>
  <div
    class="vc-color-picker__hsl-panel"
    :style="panelColor"
    @mousedown="mousedownEvt"
  >
    <span class="vc-color-picker__hsl-cursor" :style="cursorStyle">
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
  watch,
  inject,
  nextTick
} from 'vue'
import { useMousePosition } from '../../utils/mouse'

export default {
  inject: ['vcColorPicker', 'store'],
  props: {
    isOpened: Boolean
  },
  computed: {
    panelColor() {
      return {
        backgroundColor: `hsl(${this.store.Hue.value}, 100%, 50%)`
      }
    }
  },
  watch: {
    Value() {
      this.setPosition()
    },
    Saturation() {
      this.setPosition()
    }
  },
  data() {
    return {
      Value: this.store.Value,
      Saturation: this.store.Saturation,
      isDrag: this.store.isDrag
    }
  },
  setup(props) {
    const { ctx } = getCurrentInstance()
    const X = ref(0)
    const Y = ref(0)
    const start = ref({
      x: 0,
      y: 0,
      layerX: 0,
      layerY: 0
    })
    const elBCR = ref({})
    const { x, y } = useMousePosition()
    const vcColorPicker = inject('vcColorPicker', null)

    const cursorStyle = computed(() => ({
      transform: `translate(${X.value}px, ${Y.value}px)`
    }))

    onMounted(() => {
      document.addEventListener('mousemove', ctx.mousemoveEvt)
      document.addEventListener('mouseup', ctx.mouseupEvt)
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', ctx.mousemoveEvt)
      document.removeEventListener('mouseup', ctx.mouseupEvt)
    })

    watch(
      () => props.isOpened,
      val => {
        if (val) {
          nextTick(() => {
            ctx.setPosition()
          })
        }
      }
    )

    // let _HSV = inject('VCColorPickerHSV')
    // watch(
    //   () => _HSV.value,
    //   val => {
    //     if (!vcColorPicker.isActive) ctx.setPosition()
    //   }
    // )

    return {
      x,
      y,
      X,
      Y,
      cursorStyle,
      start,
      elBCR,
      vcColorPicker
    }
  },
  methods: {
    mousedownEvt(evt) {
      evt.stopPropagation()
      let { layerX, layerY } = evt

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
      this.isDrag = true

      // 点击时 更新颜色
      this.mousemoveEvt(evt)
    },

    mouseupEvt(evt) {
      this.vcColorPicker.isActive = false
    },

    mousemoveEvt(evt) {
      if (this.vcColorPicker.isActive) {
        let { pageX, pageY } = evt
        let { x, y, layerX, layerY } = this.start
        let { width, height } = this.elBCR
        let _x = layerX + pageX - x
        let _y = layerY + pageY - y

        if (_x < 0) _x = 0
        if (_y < 0) _y = 0

        if (Math.abs(_x) > width) _x = width
        if (Math.abs(_y) > height) _y = height

        this.X = _x
        this.Y = _y
        // HSV
        let v = Math.round((1 - _y / height) * 100)
        let s = Math.round((_x / width) * 100)

        this.Saturation = s
        this.Value = v
      }
    },

    setPosition() {
      if (this.isDrag) return

      this.elBCR = this.$el.getBoundingClientRect()
      let { width, height } = this.elBCR

      if (width && height) {
        this.X = Math.round(width * (this.Saturation / 100))
        this.Y = Math.round(height * (1 - this.Value / 100))
      }
    }
  }
}
</script>
