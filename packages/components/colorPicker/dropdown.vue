<template>
  <div class="vc-color-picker__drop-down">
    <ColorPanel />
    <HSLAPanel />
    <RGBAPanel />
    <HexPanel />
    <h1>hello</h1>
    <h1>hello</h1>
  </div>
</template>

<script>
import ColorPanel from './colorPanel.vue'
import HSLAPanel from './hslaPanel.vue'
import RGBAPanel from './rgbaPanel.vue'
import HexPanel from './hexPanel.vue'

export default {
  name: 'VcColorPickerDropdown',
  components: { 
    ColorPanel,  
    HSLAPanel,
    RGBAPanel,
    HexPanel
  }
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