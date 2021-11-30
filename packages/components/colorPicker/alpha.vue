<template>
  <li>
    <input type="number" max="1" min="0" step="0.01" v-model="alpha" />
    <p>A</p>
  </li>
</template>

<script setup>
import { inject } from 'vue'

const { alpha } = inject('store')
</script>
