<template>
  <ul class="color-picker__rgba-panel color-picker__text-table">
    <li>
      <input type="number" max="255" min="0" v-model="R" @blur="changeEvt">
      <p>R</p>
    </li>
    <li>
      <input type="number" max="255" min="0" v-model="G" @blur="changeEvt">
      <p>G</p>
    </li>
    <li>
      <input type="number" max="255" min="0" v-model="B" @blur="changeEvt">
      <p>B</p>
    </li>
    <li>
      <input type="number" v-model="alpha">
      <p>A</p>
    </li>
  </ul>
</template>

<script>
import { alpha, R, G, B, formatString, updateColorPanel } from './color'

export default {
  setup() {
    function changeEvt() {
      formatString(`rgb(${R.value}, ${G.value}, ${B.value})`)
      updateColorPanel()
    }

    return {
      alpha,
      R, G, B,
      changeEvt
    }
  }
}
</script>
