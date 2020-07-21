<template>
  <div class="vc-color-picker__drop-down" @mouseup="mouseupEvt">
    <ColorPanel />
    <div class="vc-color-picker__display-panel">
      <div class="current-color">
        <div class="color-box">
          <span :style="{backgroundColor: `rgba(${R}, ${G}, ${B}, ${alpha})`}"></span>
        </div>
      </div>
      <AlphaBar/>
    </div>
    <HSVAPanel />
    <HSLAPanel />
    <RGBAPanel />
    <HexPanel />
  </div>
</template>

<script>
import ColorPanel from './colorPanel.vue'
import HSVAPanel from './hsvaPanel.vue'
import HSLAPanel from './hslaPanel.vue'
import RGBAPanel from './rgbaPanel.vue'
import HexPanel from './hexPanel.vue'
import AlphaBar from './alphaBar.vue'
import { R, G, B, alpha } from './color'

export default {
  name: 'VcColorPickerDropdown',
  components: { 
    ColorPanel,  
    HSVAPanel,
    HSLAPanel,
    RGBAPanel,
    HexPanel,
    AlphaBar
  },
  setup() {
    function mouseupEvt(evt) {
      evt.stopPropagation()
    }

    return {
      R, G, B, alpha,

      mouseupEvt
    }
  }
}
</script>

<style lang="less">
.vc-color-picker {
  &__drop-down {
    position: absolute;
    z-index: 2000;
    box-sizing: content-box;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }

  &__display-panel {
    display: flex;
    padding: 10px;

    .color-box {
      width: 32px;
      height: 32px;
      border-radius: 20px;
      box-sizing: border-box;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
      overflow: hidden;

      span {
        display: block;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(0,0,0,.1);
      }
    }
  }
}
</style>