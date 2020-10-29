<template>
  <div class="vc-color-picker__control-model">
    <input 
      class="vc-color-picker__range-input is-hsv" 
      type="range" 
      step="1" min="0" max="360"
      v-model="hsvH"
    >
    <div class="vc-color-picker__alpha" v-if="format !== 'hex'">
      <input 
        class="vc-color-picker__range-input is-alpha"
        type="range"
        :style="alphaBarStyles"
        step="0.01" min="0" max="1"
        v-model="alpha"
      >
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
import { hsv2rgb } from './color'

export default {
  props: {
    format: String
  },
  setup() {
    const vcColorPicker = inject('vcColorPicker')

    const alphaBarStyles = computed(() => {
      let {h, s, v} = vcColorPicker.hsv
      let {r, g, b} = hsv2rgb(h, s, v)
      let from = `rgba(${r}, ${g}, ${b}, 0)`
      let to = `rgb(${r}, ${g}, ${b})`

      return {
        background: `linear-gradient(to right, ${from} 0%, ${to} 100%)`
      }
    })

    const alpha = computed({
      get() {
        return vcColorPicker.alpha
      },
      set: val => vcColorPicker.alpha = val
    }) 

 
    const hsvH = computed({
      get() {
        return vcColorPicker.hsv.h
      },
      set: (val) => {
        vcColorPicker.hsv.h = val
      }
    })

    return {
      hsvH,
      alpha,
      alphaBarStyles,
    }
  }
}
</script>
