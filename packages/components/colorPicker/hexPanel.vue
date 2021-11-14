<template>
  <ul class="vc-color-picker__hex-panel color-picker__text-table">
    <li>
      <input type="text" :value="hex" @blur="changeEvt" />
      <p>十六进制</p>
    </li>
  </ul>
</template>

<script>
import { getCurrentInstance, computed } from 'vue'
import { formatString, hsv2rgb, toHex } from './color'

export default {
  inject: ['vcColorPicker'],
  setup() {
    const { ctx } = getCurrentInstance()

    const hex = computed(() => {
      let { h, s, v } = ctx.vcColorPicker.hsv
      let { r, g, b } = hsv2rgb(h, s, v)

      return toHex({ r, g, b })
    })

    function changeEvt(evt) {
      let format = formatString(evt.target.value)

      if (format) {
        let { hsv } = format
        ctx.vcColorPicker.hsv = hsv
      }
    }

    return { hex, changeEvt }
  }
}
</script>
