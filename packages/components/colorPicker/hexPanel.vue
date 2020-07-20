<template>
  <div class="vc-color-picker__hex-panel">
    <input type="text" v-model="hex">
  </div>
</template>

<script>
import { hex } from './color'

export default {
  setup() {

    return {
      hex
    }
  }
}
</script>

<style>

</style>