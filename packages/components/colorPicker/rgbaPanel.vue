<template>
  <ul 
    class="color-picker__rgba-panel color-picker__text-table"
    @mouseup="mouseupEvt"
  >
    <li>
      <input type="number" v-model="R">
      <p>R</p>
    </li>
    <li>
      <input type="number" v-model="G">
      <p>G</p>
    </li>
    <li>
      <input type="number" v-model="B">
      <p>B</p>
    </li>
    <li>
      <input type="number" v-model="alpha">
      <p>A</p>
    </li>
  </ul>
</template>

<script>
import { alpha, R, G, B } from './color'

export default {
  setup() {

    function mouseupEvt(evt) {
      evt.stopPropagation()
    }

    return {
      alpha,
      R, G, B,
      mouseupEvt
    }
  }
}
</script>

<style>

</style>