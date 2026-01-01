<template>
  <div class="vc-color-picker__control-model">
    <input
      class="vc-color-picker__range-input is-hsv"
      type="range"
      step="1"
      min="0"
      max="360"
      v-model="Hue"
    />
    <div class="vc-color-picker__alpha" v-if="format !== 'hex'">
      <input
        class="vc-color-picker__range-input is-alpha"
        type="range"
        :style="alphaBarStyles"
        step="0.01"
        min="0"
        max="1"
        v-model="alpha"
      />
    </div>
  </div>
</template>

<script>
import { hsv2rgb } from './color'

export default {
  props: {
    format: String
  },
  inject: ['vcColorPicker'],
  computed: {
    alphaBarStyles() {
      let { H, S, V } = this.vcColorPicker
      let { r, g, b } = hsv2rgb(H, S, V)
      let from = `rgba(${r}, ${g}, ${b}, 0)`
      let to = `rgb(${r}, ${g}, ${b})`

      return {
        background: `linear-gradient(to right, ${from} 0%, ${to} 100%)`
      }
    },
    alpha: {
      get() {
        return this.vcColorPicker.A
      },
      set(value) {
        this.vcColorPicker.updateVal({
          type: 'alpha',
          hsv: { a: value },
          value
        })
      }
    },
    Hue: {
      get() {
        return this.vcColorPicker.H
      },
      set(value) {
        value = Number(value)
        this.vcColorPicker.updateVal({ type: 'Hue', hsv: { h: value }, value })
      }
    }
  }
}
</script>
