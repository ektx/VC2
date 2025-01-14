<template>
  <div :class="['vc-button-group', { round }]">
    <slot></slot>
  </div>
</template>

<script setup>
defineOptions({
  name: 'vcButtonGroup'
})

const { round } = defineProps({
  round: Boolean
})
</script>
