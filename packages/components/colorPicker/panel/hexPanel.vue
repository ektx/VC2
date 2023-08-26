<template>
  <ul class="vc-color-picker__hex-panel color-picker__text-table">
    <li>
      <input type="text" v-model="hex" />
      <p>十六进制</p>
    </li>
  </ul>
</template>

<script>
import { hsv2rgb, toHex, hex2rgb, rgb2hsv } from '../color'

export default {
  inject: ['vcColorPicker'],
  data() {
    return {
      timer: null
    }
  },
  computed: {
    hex: {
      get() {
        let { H, S, V } = this.vcColorPicker
        let { r, g, b } = hsv2rgb(H, S, V)
        return toHex({ r, g, b })
      },
      set(value) {
        if (this.timer) clearTimeout(this.timer)

        this.timer = setTimeout(() => {
          let rgb = hex2rgb(value)

          if (rgb === null) return

          let { r, g, b } = rgb
          let hsv = rgb2hsv(r, g, b)

          this.vcColorPicker.updateVal({ type: 'hex', hsv, value })
        }, 500)
      }
    }
  }
}
</script>
