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
      <input type="text" v-model="HSV_S">
      <p>S</p>
    </li>
    <li>
      <input type="text" v-model="HSV_V">
      <p>V</p>
    </li>
    <li>
      <input type="number" v-model="alpha">
      <p>A</p>
    </li>
  </ul>
</template>

<script>
import { hue, HSV_S, HSV_V, alpha } from './color'

export default {
  name: 'VcColorPickerHSLAPanel',
  setup() {

    function mouseupEvt(evt) {
      evt.stopPropagation()
    }

    return {
      HSV_S,
      HSV_V,
      hue,
      alpha,
      mouseupEvt
    }
  }
}
</script>

<style>

</style>