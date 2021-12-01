<template>
  <ul class="vc-color-picker__hex-panel color-picker__text-table">
    <li>
      <input type="text" v-model="hex" />
      <p>十六进制</p>
    </li>
  </ul>
</template>

<script>
export default {
  inject: ['vcColorPicker'],
  computed: {
    hex: {
      get() {
        return this.vcColorPicker.hex
      },
      set(val) {
        this.vcColorPicker.updateVal({ type: 'hex', value: val })
      }
    }
  }
}
</script>
