<template>
  <ul class="vc-color-picker__hex-panel color-picker__text-table">
    <li>
      <input type="text" :value="hex" />
      <p>十六进制</p>
    </li>
  </ul>
</template>

<script>
export default {
  inject: ['vcColorPicker', 'store'],
  data() {
    return {
      hex: this.store.hex
    }
  }
}
</script>
