<template>
  <div ref="el" class="vc-select__dropdown" popover>
    <slot></slot>
  </div>
</template>

<script setup>
import { watch, useTemplateRef } from 'vue'

defineOptions({
  name: 'VcSelectDropDown'
})

const el = useTemplateRef('el')
const { show } = defineProps({
  show: Boolean
})

watch(
  () => show,
  val => {
    if (val) {
      console.log('show')
      el.value.showPopover()
    }
  }
)
</script>
