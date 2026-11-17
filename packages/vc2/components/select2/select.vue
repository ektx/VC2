<template>
  <div class="vc-cus-select">
    <select>
      <button>
        <selectedcontent></selectedcontent>
      </button>

      <div class="options">
        <option v-for="option in options" :value="option.value">
          {{ option.label }}
        </option>
      </div>
    </select>
  </div>
</template>

<script setup lang="ts">
import { selectProps2, type SelectOption2, selectKey } from './types'

defineOptions({ name: 'VcSelect2' })

const { options } = defineProps(selectProps2)
</script>

<style></style>
