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
  inject: ['store'],
  data() {
    return {
      Hue: this.store.Hue,
      alpha: this.store.alpha,
      r: this.store.red,
      g: this.store.green,
      b: this.store.blue
    }
  },
  computed: {
    alphaBarStyles() {
      let from = `rgba(${this.r}, ${this.g}, ${this.b}, 0)`
      let to = `rgb(${this.r}, ${this.g}, ${this.b})`

      return {
        background: `linear-gradient(to right, ${from} 0%, ${to} 100%)`
      }
    }
  }
}
</script>
