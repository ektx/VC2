<template>
  <ul class="vc-color-picker__hex-panel color-picker__text-table">
    <li>
      <input type="text" v-model="hex" @blur="changeEvt">
      <p>十六进制</p>
    </li>
    <li>
      <input type="text" v-model="alpha">
      <p>A</p>
    </li>
  </ul>
</template>

<script>
import { hex, alpha, formatString, updateColorPanel } from './color'

export default {
  setup() {

    function changeEvt(evt) {
      evt.stopPropagation()
      
      formatString(hex.value)
      updateColorPanel()
    }

    return {
      hex,
      alpha,
      changeEvt
    }
  }
}
</script>

<style>

</style>