<template>
  <ul 
    class="color-picker__hsla-panel color-picker__text-table"
    @mouseup="mouseupEvt"
  >
    <li>
      <input type="number" v-model="hue">
      <p>H</p>
    </li>
    <li>
      <input type="text" v-model="saturation">
      <p>S</p>
    </li>
    <li>
      <input type="text" v-model="lightness">
      <p>L</p>
    </li>
    <li>
      <input type="number" v-model="alpha">
      <p>A</p>
    </li>
  </ul>
</template>

<script>
import { lightness, hue, saturation, alpha } from './color'

export default {
  name: 'VcColorPickerHSLAPanel',
  setup() {

    function mouseupEvt(evt) {
      evt.stopPropagation()
      console.log(111)
    }

    return {
      lightness,
      saturation,
      hue,
      alpha,
      mouseupEvt
    }
  }
}
</script>

<style>

</style>