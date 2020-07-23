<template>
  <div class="vc-color-picker__control-model" ref="box">
    <div class="vc-color-picker__hue">
      <div class="vc-color-picker__hue-bar"></div>
      <span class="vc-color-picker__hue-thumb" :style="hueThumbStyle"></span>
    </div>
    <div class="vc-color-picker__alpha" v-if="format !== 'hex'">
      <div 
        class="vc-color-picker__alpha-bar" 
        :style="alphaBarStyles"
        @mousedown="mousedown"
      ></div>
      <span 
        class="vc-color-picker__alpha-thumb" 
        :style="alphaThumbStyle" 
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { hsv2rgb } from './color'

export default {
  props: {
    format: String
  }
}

const vcColorPicker = inject('vcColorPicker')
let start = {}
let boxBCR = {}
export const box = ref(null)

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

export function mousedown(evt) {
  evt.stopPropagation()
  let {pageX, layerX} = evt

  vcColorPicker.isDrag = true
  start = {
    pageX,
    layerX,
  }

  boxBCR = box.value.getBoundingClientRect()
  mousemove(evt)
}

onMounted(() => {
  document.addEventListener('mousemove', mousemove, false)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', mousemove, false)
})

export function mousemove(evt) {
  let { width } = boxBCR
  let { pageX } = evt

  if (vcColorPicker.isDrag) {
    let x = start.layerX + pageX - start.pageX

    x = x > 0 
      ? x > width ? width : x 
      : 0
    
    vcColorPicker.alpha = parseFloat((x / width).toFixed(1))
  }
}
</script>
