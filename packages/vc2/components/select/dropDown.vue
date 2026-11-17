<template>
  <div ref="el" class="vc-select__dropdown" popover>
    <slot></slot>
  </div>
</template>

<script setup>
import { useTemplateRef, onMounted, onBeforeUnmount } from 'vue'

defineOptions({
  name: 'VcSelectDropDown'
})

const el = useTemplateRef('el')
const emit = defineEmits(['open', 'close'])

function toggle() {
  el.value.togglePopover()
}

function onToggle(e) {
  if (e.newState === 'open') emit('open')
  else emit('close')
}

onMounted(() => {
  el.value.addEventListener('toggle', onToggle)
})

onBeforeUnmount(() => {
  el.value.removeEventListener('toggle', onToggle)
})

defineExpose({
  toggle
})
</script>
