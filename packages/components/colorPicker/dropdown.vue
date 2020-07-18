<template>
  <div class="vc-color-picker__drop-down">
    <HSLPanel />
    <h1>hello</h1>
    <h1>hello</h1>
    <h1>hello</h1>
    <h1>hello</h1>
  </div>
</template>

<script>
import HSLPanel from './hslPanel.vue'

export default {
  name: 'VcColorPickerDropdown',
  components: { HSLPanel }
}
</script>

<style>
.vc-color-picker__drop-down {
  position: absolute;
  z-index: 2000;
  box-sizing: content-box;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
}
</style>