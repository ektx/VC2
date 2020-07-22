<template>
  <li>
    <input 
      type="number" 
      max="1" min="0" 
      step="0.1" 
      v-model="alpha" 
    >
    <p>A</p>
  </li>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
export default {
  inject: ['vcColorPicker'],
  setup() {
    const { ctx } = getCurrentInstance()

    const alpha = computed({
      get: () => ctx.vcColorPicker.alpha,
      set: (val)=> {
        ctx.vcColorPicker.alpha = val
      }
    })

    return { alpha }
  }
}
</script>
