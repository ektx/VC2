<template>
  <div
    :class="[
      'vc-form-item__label',
      `text-align-${vcForm.labelPosition}`,
      {
        'is-no-asterisk': vcForm.hideRequiredAsterisk
      }
    ]"
  >
    <label v-if="label">{{ label }}</label>
    <span
      v-if="vcForm.labelSuffix && label"
      class="vc-form-item__label-suffix"
      >{{ vcForm.labelSuffix }}</span
    >
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  // 标题
  label: {
    type: String,
    default: ''
  }
})

const vcForm = inject('vcForm', null)
</script>
