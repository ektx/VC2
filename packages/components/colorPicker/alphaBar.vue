<template>
  <div class="vc-color-picker__control-model" ref="box">
    <div class="vc-color-picker__hue">
      <div 
        class="vc-color-picker__hue-bar" 
        @mousedown="evt => mousedown(evt, 'hsv')"
      ></div>
      <span 
        class="vc-color-picker__hue-thumb" 
        :style="hueThumbStyle"
      ></span>
    </div>
    <div class="vc-color-picker__alpha" v-if="format !== 'hex'">
      <div 
        class="vc-color-picker__alpha-bar" 
        :style="alphaBarStyles"
        @mousedown="evt => mousedown(evt, 'alpha')"
      ></div>
      <span 
        class="vc-color-picker__alpha-thumb" 
        :style="alphaThumbStyle" 
      ></span>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import { hsv2rgb } from './color'

export default {
  props: {
    format: String
  },
  setup() {
    const vcColorPicker = inject('vcColorPicker')

    let start = {}
    let boxBCR = {}
    let isActive = false

    const box = ref(null)

    const alphaBarStyles = computed(() => {
      let {h, s, v} = vcColorPicker.hsv
      let {r, g, b} = hsv2rgb(h, s, v)
      let from = `rgba(${r}, ${g}, ${b}, 0)`
      let to = `rgb(${r}, ${g}, ${b})`

      return {
        background: `linear-gradient(to right, ${from} 0%, ${to} 100%)`
      }
    })

    const alphaThumbStyle = computed(() => ({
      left: Math.round(vcColorPicker.alpha * 100) + '%'
    }))

    const hueThumbStyle = computed(() => ({
      left: Math.round(vcColorPicker.hsv.h / 360 * 100) + '%'
    }))

    onMounted(() => {
      document.addEventListener('mousemove', mousemove, false)
      document.addEventListener('mouseup', mouseup, false)
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', mousemove, false)
      document.removeEventListener('mouseup', mouseup, false)
    })

    function mouseup() {
      isActive = false
    }


    function mousedown(evt, type) {
      evt.stopPropagation()
      let {pageX, layerX} = evt

      vcColorPicker.isDrag = true
      start = {
        pageX,
        layerX,
        type
      }
      isActive = true

      boxBCR = box.value.getBoundingClientRect()
      mousemove(evt)
    }

    function mousemove(evt) {
      if (!isActive) return

      let { width } = boxBCR
      let { pageX } = evt

      if (vcColorPicker.isDrag) {
        let x = start.layerX + pageX - start.pageX

        x = x > 0 
          ? x > width ? width : x 
          : 0
        
        let o = x / width

        if (start.type === 'alpha') {
          vcColorPicker.alpha = parseFloat(o.toFixed(1))
        } else {
          vcColorPicker.hsv.h = Math.round(o * 360)
        }
      }
    }


    return {
      box,
      alphaBarStyles,
      alphaThumbStyle,
      hueThumbStyle,
      mouseup,
      mousemove,
      mousedown
    }
  }
}
</script>
