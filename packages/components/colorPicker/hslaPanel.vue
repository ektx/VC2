<template>
  <ul class="color-picker__hsla-panel color-picker__text-table">
    <li>
      <input type="number" v-model="H" />
      <p>H</p>
    </li>
    <li>
      <input type="number" v-model="S" max="100" min="0" />
      <p>S</p>
    </li>
    <li>
      <input type="number" v-model="L" max="100" min="0" />
      <p>L</p>
    </li>
    <Alpha />
  </ul>
</template>

<script setup>
import { inject } from 'vue'
import Alpha from './alpha.vue'

const { HSL_Hue: H, HSL_S: S, Lightness: L } = inject('store')
</script>
