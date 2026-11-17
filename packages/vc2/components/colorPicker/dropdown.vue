<template>
  <div class="vc-color-picker__drop-down">
    <ColorPanel :S="S" :V="V" :isOpened="isOpened" />

    <div class="vc-color-picker__display-panel">
      <div class="current-color">
        <div class="color-box" @click="onClear" title="清空值">
          <span :style="colorStyle"></span>
          <i class="vc-icon-close"></i>
        </div>
      </div>
      <AlphaBar :format="format" />
    </div>

    <HexPanel v-if="format === 'hex'" />
    <HSVAPanel v-else-if="format === 'hsv'" />
    <HSLAPanel v-else-if="format === 'hsl'" />
    <RGBAPanel v-else />
  </div>
</template>

<script>
import ColorPanel from './colorPanel.vue'
import HSVAPanel from './panel/hsvaPanel.vue'
import HSLAPanel from './hslaPanel.vue'
import RGBAPanel from './rgbaPanel.vue'
import HexPanel from './panel/hexPanel.vue'
import AlphaBar from './alphaBar.vue'

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
    H: Number,
    S: Number,
    V: Number
  },
  computed: {
    colorStyle() {
      return this.vcColorPicker.currentColor
    }
  },
  methods: {
    onClear() {
      this.vcColorPicker.$emit('update:modelValue', '')
    }
  }
}
</script>
