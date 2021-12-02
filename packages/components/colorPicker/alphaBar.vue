<template>
  <div class="vc-color-picker__control-model">
    <input
      class="vc-color-picker__range-input is-hsv"
      type="range"
      step="1"
      min="0"
      max="360"
      v-model="Hue"
    />
    <div class="vc-color-picker__alpha" v-if="format !== 'hex'">
      <input
        class="vc-color-picker__range-input is-alpha"
        type="range"
        :style="alphaBarStyles"
        step="0.01"
        min="0"
        max="1"
        v-model="alpha"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    format: String
  },
  inject: ['vcColorPicker'],
  data() {
    return {
      // Hue: this.store.Hue,
      // alpha: this.store.alpha,
      // r: this.store.red,
      // g: this.store.green,
      // b: this.store.blue
    }
  },
  computed: {
    alphaBarStyles() {
      let { R, G, B } = this.vcColorPicker
      let from = `rgba(${R}, ${G}, ${B}, 0)`
      let to = `rgb(${R}, ${G}, ${B})`

      return {
        background: `linear-gradient(to right, ${from} 0%, ${to} 100%)`
      }
    },
    alpha: {
      get() {
        return this.vcColorPicker.A
      },
      set(value) {
        this.vcColorPicker.updateVal({ type: 'alpha', value })
      }
    },
    Hue: {
      get() {
        return this.vcColorPicker.H
      },
      set(value) {
        value = Number(value)
        this.vcColorPicker.updateVal({ type: 'Hue', value })
      }
    }
  }
}
</script>
