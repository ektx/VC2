<template>
  <div :class="['vc-switch__inset', `vc-switch__inset-${type}`]">
    <i v-if="icon" :class="icon"></i>
    <span v-if="text" class="vc-switch__inset-text">{{ text }}</span>
  </div>
</template>

<script setup>
import { switchInsetProps } from './types'

defineProps(switchInsetProps)
</script>
