<template>
  <button
    :class="[
      'vc-button',
      theme,
      {
        plain,
        round,
        text,
        'is-loading': loading
      }
    ]"
    type="button"
    :disabled="disabled"
    :style="_style"
  >
    <Transition name="vc-button--loading">
      <span v-if="_icon" class="vc-button--icon">
        <i :class="_icon"></i>
      </span>
    </Transition>
    <span><slot></slot></span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { buttonProps } from './types'

defineOptions({
  name: 'VcButton'
})

const props = defineProps(buttonProps)

const _icon = computed(() => {
  return props.loading ? 'vc-icon-loading' : props.icon
})

const _style = computed(() => {
  return {
    '--size': props.size,
    '--color': props.color,
    '--bg': typeof props.bg === 'string' ? props.bg : ''
  }
})
</script>
