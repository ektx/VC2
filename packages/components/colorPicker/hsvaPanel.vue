<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="vcColorPicker.hsv.h" max="360" min="0">
      <p>H</p>
    </li>
    <li>
      <input type="number" v-model="vcColorPicker.hsv.s" max="100" min="0">
      <p>S</p>
    </li>
    <li>
      <input type="number" v-model="vcColorPicker.hsv.v" max="100" min="0">
      <p>V</p>
    </li>
    <Alpha />
  </ul>
</template>

<script>
import Alpha from './alpha.vue'

export default {
  name: 'VcColorPickerHSLAPanel',
  inject: ['vcColorPicker'],
  components: { Alpha },
}
</script>
