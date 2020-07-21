<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="hue" max="360" min="0" @blur="changeEvt">
      <p>H</p>
    </li>
    <li>
      <input type="number" v-model="HSV_S" max="100" min="0" @blur="changeEvt">
      <p>S</p>
    </li>
    <li>
      <input type="number" v-model="HSV_V" max="100" min="0" @blur="changeEvt">
      <p>V</p>
    </li>
    <li>
      <input type="number" v-model="alpha" max="1" min="0" @blur="changeEvt">
      <p>A</p>
    </li>
  </ul>
</template>

<script>
import { watch } from 'vue'
import { hue, HSV_S, HSV_V, alpha, formatString, updateColorPanel } from './color'

export default {
  name: 'VcColorPickerHSLAPanel',
  setup() {

    function changeEvt() {
      formatString(`hsv(${hue.value}, ${HSV_S.value}, ${HSV_V.value})`)
      updateColorPanel()
    }

    return {
      HSV_S,
      HSV_V,
      hue,
      alpha,
      changeEvt
    }
  }
}
</script>
