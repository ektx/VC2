<template>
  <div
    class="vc-color-picker__hsl-panel"
    :style="panelColor"
    @mousedown.stop="mousedownEvt"
  >
    <span class="vc-color-picker__hsl-cursor" :style="cursorStyle">
      <i></i>
    </span>
  </div>
</template>

<script>
export default {
  inject: ['vcColorPicker'],
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
    },
    cursorStyle() {
      return { transform: `translate(${this.X}px, ${this.Y}px)` }
    }
  },
  watch: {
    isOpened(val) {
      val && this.setPosition()
    },
    V() {
      this.isOpened && this.setPosition()
    }
  },
  data() {
    return {
      X: 0,
      Y: 0,
      isDrag: false
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.mousemoveEvt)
    window.addEventListener('mouseup', this.mouseupEvt)
  },
  unmounted() {
    window.removeEventListener('mousemove', this.mousemoveEvt)
    window.removeEventListener('mouseup', this.mouseupEvt)
  },
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

        this.vcColorPicker.updateVal({ type: 'plane', hsv: { v, s } })
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
