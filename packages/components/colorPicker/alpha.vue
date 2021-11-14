<template>
  <li>
    <input type="number" max="1" min="0" step="0.01" v-model="alpha" />
    <p>A</p>
  </li>
</template>

<script setup>
import { inject } from 'vue'

const { alpha } = inject('store')
// const { alpha } = store
// import { computed, getCurrentInstance } from 'vue'
// export default {
//   inject: ['vcColorPicker'],
//   setup() {
//     const { ctx } = getCurrentInstance()

//     const alpha = computed({
//       get: () => ctx.vcColorPicker.alpha,
//       set: val => {
//         ctx.vcColorPicker.alpha = val
//       }
//     })

//     return { alpha }
//   }
// }
</script>
