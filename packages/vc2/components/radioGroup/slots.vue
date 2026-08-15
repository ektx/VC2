<template>
  <component :is="render()" />
</template>

<script setup>
import { cloneVNode, h, useSlots, useAttrs, Fragment } from 'vue'

const attrs = useAttrs()
const emit = attrs.emits

const render = () => {
  const slots = attrs.slots
  const slotNodes = slots.default?.() || []

  if (slotNodes.length) {
    const allCloneNodes = slotNodes.map(node => {
      console.log('node', node.props)
      return cloneVNode(node, {
        ...attrs,
        ...node.props,
        'onUpdate:modelValue': val => {
          console.log(val)
          emit('update:modelValue', val)
        }
      })
    })

    return h(Fragment, allCloneNodes)
  }

  return null
}
</script>
