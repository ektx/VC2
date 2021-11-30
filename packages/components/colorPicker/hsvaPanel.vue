<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="Hue" max="360" min="0" />
      <p>H</p>
    </li>
    <li>
      <input type="number" v-model="Saturation" max="100" min="0" />
      <p>S</p>
    </li>
    <li>
      <input type="number" v-model="Value" max="100" min="0" />
      <p>V</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import Alpha from './alpha.vue'

export default {
  name: 'VcColorPickerHSLAPanel',
  inject: ['store'],
  components: { Alpha },
  data() {
    return {
      Hue: this.store.Hue,
      Value: this.store.Value,
      Saturation: this.store.Saturation
    }
  }
}
</script>
