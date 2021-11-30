<template>
  <div
    class="vc-color-picker__hsl-panel"
    :style="panelColor"
    @mousedown.stop="mousedownEvt"
  >
    {{ S }}-{{ V }}
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
    isOpened: Boolean,
    S: Number,
    V: Number
  },
  computed: {
    panelColor() {
      return {
        backgroundColor: `hsl(${this.vcColorPicker.H}, 100%, 50%)`
      }
    }
  },
  watch: {
    isOpened(val) {
      val && this.setPosition()
    }
  },
  data() {
    return {
      // V: 0,
      // S: 0,
      X: 0,
      Y: 0,
      s: 0,
      v: 0,
      isDrag: false
    }
  },
  computed: {
    cursorStyle() {
      return { transform: `translate(${this.X}px, ${this.Y}px)` }
    }
  },
  mounted() {
    console.log(123)
    document.addEventListener('mousemove', this.mousemoveEvt)
    document.addEventListener('mouseup', this.mouseupEvt)
  },
  unmounted() {
    document.removeEventListener('mousemove', this.mousemoveEvt)
    document.removeEventListener('mouseup', this.mouseupEvt)
  },
  // setup(props) {
  //   const { ctx } = getCurrentInstance()
  //   const X = ref(0)
  //   const Y = ref(0)
  //   const start = ref({
  //     x: 0,
  //     y: 0,
  //     layerX: 0,
  //     layerY: 0
  //   })
  //   const elBCR = ref({})
  //   const { x, y } = useMousePosition()
  //   const vcColorPicker = inject('vcColorPicker', null)

  //   const cursorStyle = computed(() => ({
  //     transform: `translate(${X.value}px, ${Y.value}px)`
  //   }))

  //   onMounted(() => {
  //     document.addEventListener('mousemove', ctx.mousemoveEvt)
  //     document.addEventListener('mouseup', ctx.mouseupEvt)
  //   })

  //   onUnmounted(() => {
  //     document.removeEventListener('mousemove', ctx.mousemoveEvt)
  //     document.removeEventListener('mouseup', ctx.mouseupEvt)
  //   })

  //   watch(
  //     () => props.isOpened,
  //     val => {
  //       if (val) {
  //         nextTick(() => {
  //           ctx.setPosition()
  //         })
  //       }
  //     }
  //   )

  //   // let _HSV = inject('VCColorPickerHSV')
  //   // watch(
  //   //   () => _HSV.value,
  //   //   val => {
  //   //     if (!vcColorPicker.isActive) ctx.setPosition()
  //   //   }
  //   // )

  //   return {
  //     x,
  //     y,
  //     X,
  //     Y,
  //     cursorStyle,
  //     start,
  //     elBCR,
  //     vcColorPicker
  //   }
  // },
  methods: {
    mousedownEvt(evt) {
      this.isDrag = true

      // 点击时 更新颜色
      this.mousemoveEvt(evt)
    },

    mouseupEvt() {
      this.isDrag = false
    },

    mousemoveEvt(evt) {
      if (this.isDrag) {
        let { width, height, x, y } = this.$el.getBoundingClientRect()
        let _x = evt.x - x
        let _y = evt.y - y

        if (_x < 0) _x = 0
        if (_y < 0) _y = 0

        if (Math.abs(_x) > width) _x = width
        if (Math.abs(_y) > height) _y = height

        this.X = _x
        this.Y = _y
        // HSV
        let v = Math.round((1 - _y / height) * 100)
        let s = Math.round((_x / width) * 100)

        this.vcColorPicker.updateVal({ v, s })
      }
    },

    setPosition() {
      console.log('setPosition')
      if (this.isDrag) return

      this.elBCR = this.$el.getBoundingClientRect()
      let { width, height } = this.elBCR

      if (width && height) {
        this.X = Math.round(width * (this.S / 100))
        this.Y = Math.round(height * (1 - this.V / 100))
      }
    }
  }
}
</script>
