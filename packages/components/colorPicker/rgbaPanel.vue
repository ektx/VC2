<template>
  <ul class="color-picker__rgba-panel color-picker__text-table">
    <li>
      <input type="number" max="255" min="0" v-model="r" />
      <p>R</p>
    </li>
    <li>
      <input type="number" max="255" min="0" v-model="g" />
      <p>G</p>
    </li>
    <li>
      <input type="number" max="255" min="0" v-model="b" />
      <p>B</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import Alpha from './alpha.vue'
import { hsv2rgb, rgb2hsv } from './color'

export default {
  inject: ['vcColorPicker'],
  components: { Alpha },
  computed: {
    rgb() {
      let { H, S, V } = this.vcColorPicker

      return hsv2rgb(H, S, V)
    },
    r: {
      get() {
        return this.rgb.r
      },
      set(value) {
        let hsv = rgb2hsv(value, this.g, this.b)
        this.vcColorPicker.updateVal({ type: 'hex', hsv, value })
      }
    },
    g: {
      get() {
        return this.rgb.g
      },
      set(value) {
        let hsv = rgb2hsv(this.r, value, this.b)
        this.vcColorPicker.updateVal({ type: 'hex', hsv, value })
      }
    },
    b: {
      get() {
        return this.rgb.b
      },
      set(value) {
        let hsv = rgb2hsv(this.r, this.rgb.g, value)
        this.vcColorPicker.updateVal({ type: 'hex', hsv, value })
      }
    }
  }
}
</script>
