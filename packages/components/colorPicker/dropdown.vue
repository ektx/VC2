<template>
  <div class="vc-color-picker__drop-down" @mouseup="mouseupEvt">
    
    <ColorPanel :isOpened="isOpened"/>

    <div class="vc-color-picker__display-panel">
      <div class="current-color">
        <div class="color-box">
          <span :style="colorStyle"></span>
        </div>
      </div>
      <AlphaBar/>
    </div>
    <HexPanel v-if="format === 'hex'" />
    <HSVAPanel v-else-if="format === 'hsv'" />
    <HSLAPanel v-else-if="format === 'hsl'" />
    <RGBAPanel v-else/>
  </div>
</template>

<script>
import ColorPanel from './colorPanel.vue'
import HSVAPanel from './hsvaPanel.vue'
import HSLAPanel from './hslaPanel.vue'
import RGBAPanel from './rgbaPanel.vue'
import HexPanel from './hexPanel.vue'
import AlphaBar from './alphaBar.vue'
import { getCurrentInstance, onMounted, ref, computed } from 'vue'

export default {
  name: 'VcColorPickerDropdown',
  inject: ['vcColorPicker'],
  components: { 
    ColorPanel,  
    HSVAPanel,
    HSLAPanel,
    RGBAPanel,
    HexPanel,
    AlphaBar
  },
  props: {
    format: String,
    isOpened: Boolean,
  },
  setup() {
    const { ctx } = getCurrentInstance()
    
    function mouseupEvt(evt) {
      evt.stopPropagation()
    }

    const colorStyle = computed(() => {
      return ctx.vcColorPicker.colorStyle
    })

    return {
      mouseupEvt,
      colorStyle
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