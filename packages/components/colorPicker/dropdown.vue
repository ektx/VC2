<template>
  <div class="vc-color-picker__drop-down" @mouseup="mouseupEvt">

    <ColorPanel :isOpened="isOpened"/>

    <div class="vc-color-picker__display-panel">
      <div class="current-color">
        <div class="color-box" @click="clear">
          <span :style="colorStyle"></span>
          <i class="vc-icon-close"></i>
        </div>
      </div>
      <AlphaBar :format="format"/>
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
      if (!ctx.vcColorPicker.isDrag)
        evt.stopPropagation()
    }

    const colorStyle = computed(() => {
      return ctx.vcColorPicker.colorStyle
    })

    function clear() {
      ctx.vcColorPicker.hsv = {}
    }

    return {
      mouseupEvt,
      colorStyle,
      clear
    }
  }
}
</script>
