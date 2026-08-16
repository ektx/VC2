<template>
  <component :is="render()" />
</template>

<script setup>
import { cloneVNode, h, useSlots, useAttrs, Fragment } from 'vue'

const attrs = useAttrs()

const render = () => {
  const slots = attrs.slots
  const slotNodes = slots.default?.() || []

  if (slotNodes.length) {
    const allCloneNodes = slotNodes.map(node => {
      const mergedEvents = {}
      const nodeProps = node.props || {}

      // 处理父组件传递的事件
      Object.keys(attrs).forEach(key => {
        if (key.startsWith('on')) {
          const handler = attrs[key]
          const nodeHandler = nodeProps[key]

          mergedEvents[key] = (...args) => {
            // 执行节点自身的事件
            if (typeof nodeHandler === 'function') {
              nodeHandler(...args)
            }
            // 执行父组件传递的事件
            if (typeof handler === 'function') {
              handler(...args)
            }
          }
        }
      })
      return cloneVNode(node, {
        ...attrs,
        ...nodeProps,
        ...mergedEvents
      })
    })

    return h(Fragment, allCloneNodes)
  }

  return null
}
</script>
