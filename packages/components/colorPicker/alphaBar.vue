<template>
  <div class="vc-color-picker__control-model">
    <div class="vc-color-picker__hue">
      <div class="vc-color-picker__hue-bar"></div>
      <span class="vc-color-picker__hue-thumb" :style="hueThumbStyle"></span>
    </div>
    <div class="vc-color-picker__alpha" v-if="format !== 'hex'">
      <div class="vc-color-picker__alpha-bar" :style="alphaBarStyles"></div>
      <span class="vc-color-picker__alpha-thumb" :style="alphaThumbStyle"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance, inject } from 'vue'
import { hsv2rgb } from './color'

const { ctx } = getCurrentInstance()
const vcColorPicker = inject('vcColorPicker')

export default {
  props: {
    format: String
  }
}

export const alphaBarStyles = computed(() => {
  let {h, s, v} = vcColorPicker.hsv
  let {r, g, b} = hsv2rgb(h, s, v)
  let from = `rgba(${r}, ${g}, ${b}, 0)`
  let to = `rgb(${r}, ${g}, ${b})`

  return {
    background: `linear-gradient(to right, ${from} 0%, ${to} 100%)`
  }
})

export const alphaThumbStyle = computed(() => ({
  left: Math.round(vcColorPicker.alpha * 100) + '%'
}))

export const hueThumbStyle = computed(() => ({
  left: Math.round(vcColorPicker.hsv.h / 360 * 100) + '%'
}))
</script>
