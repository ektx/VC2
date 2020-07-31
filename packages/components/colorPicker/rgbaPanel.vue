<template>
  <ul class="color-picker__rgba-panel color-picker__text-table">
    <li>
      <input type="number" max="255" min="0" v-model="rgb.r" @blur="changeEvt">
      <p>R</p>
    </li>
    <li>
      <input type="number" max="255" min="0" v-model="rgb.g" @blur="changeEvt">
      <p>G</p>
    </li>
    <li>
      <input type="number" max="255" min="0" v-model="rgb.b" @blur="changeEvt">
      <p>B</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import { hsv2rgb, rgb2hsv } from './color'
import Alpha from './alpha.vue'
import { getCurrentInstance, computed } from 'vue'

export default {
  inject: ['vcColorPicker'],
  components: { Alpha },
  setup() {
    const { ctx } = getCurrentInstance()

    const rgb = computed(() => {
      let { h, s, v } = ctx.vcColorPicker.hsv
      let rgb = hsv2rgb(h, s, v)

      return { ...rgb }
    })

    function changeEvt() {
      let {r, g, b} = rgb.value
      ctx.vcColorPicker.hsv = rgb2hsv(r, g, b)
    }

    return {
      rgb,
      changeEvt
    }
  }
}
</script>
