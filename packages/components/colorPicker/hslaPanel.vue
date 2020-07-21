<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="hue" @blur="changeEvt">
      <p>H</p>
    </li>
    <li>
      <input type="text" v-model="saturation" @blur="changeEvt">
      <p>S</p>
    </li>
    <li>
      <input type="text" v-model="lightness" @blur="changeEvt">
      <p>L</p>
    </li>
    <li>
      <input type="number" v-model="alpha">
      <p>A</p>
    </li>
  </ul>
</template>

<script>
import { lightness, hue, saturation, alpha, formatString, updateColorPanel } from './color'

export default {
  name: 'VcColorPickerHSLAPanel',
  setup() {

    function changeEvt() {
      formatString(`hsl(${hue.value}, ${saturation.value}, ${lightness.value})`)
      updateColorPanel()
    }

    return {
      lightness,
      saturation,
      hue,
      alpha,
      changeEvt
    }
  }
}
</script>

<style>

</style>