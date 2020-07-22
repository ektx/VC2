<template>
  <div class="vc-color-picker__control-model">
    <div class="vc-color-picker__hue">
      <div class="vc-color-picker__hue-bar"></div>
      <span class="vc-color-picker__hue-thumb" :style="hueThumbStyle"></span>
    </div>
    <div class="vc-color-picker__alpha" v-if="format !== 'hex'">
      <div class="vc-color-picker__alpha-bar" :style="alphaBarStyles"></div>
      <span class="vc-color-picker__alpha-thumb" :style="alphaThumbStyle"></span>
    </div>
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance } from 'vue'
import { hsv2rgb } from './color'

export default {
  name: 'VcColorPickerAlphaBar',
  inject: ['vcColorPicker'],
  props: {
    format: String
  },
  setup() {
    const { ctx } = getCurrentInstance()
    const alphaBarStyles = computed(() => {
      let {h, s, v} = ctx.vcColorPicker.hsv
      let {r, g, b} = hsv2rgb(h, s, v)
      let from = `rgba(${r}, ${g}, ${b}, 0)`
      let to = `rgb(${r}, ${g}, ${b})`

      return {
        background: `linear-gradient(to right, ${from} 0%, ${to} 100%)`
      }
    })

    const alphaThumbStyle = computed(() => ({
      left: Math.round(ctx.vcColorPicker.alpha * 100) + '%'
    }))

    const hueThumbStyle = computed(() => ({
      left: Math.round(ctx.vcColorPicker.hsv.h / 360 * 100) + '%'
    }))

    return {
      alphaBarStyles,
      alphaThumbStyle,
      hueThumbStyle,
    }
  }
}
</script>

<style lang="less">
.vc-color-picker__control-model {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  margin: 0 0 0 10px;
}
.vc-color-picker__hue,
.vc-color-picker__alpha {
  position: relative;
  width: 100%;
  height: 10px;

  &-bar {
    width: 100%;
    height: 100%;
  }

  &-thumb {
    position: absolute;
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 100%;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .2);
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
.vc-color-picker__hue {
  background: linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);

  & + .vc-color-picker__alpha {
    margin-top: 8px;
  }
}
.vc-color-picker__alpha {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
}
</style>