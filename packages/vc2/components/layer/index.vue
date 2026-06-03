<template>
  <dialog ref="el" class="vc-layer" closedby="none" @click="onClick">
    <slot name="header">
      <div class="header">
        <h1>{{ title }}</h1>
        <button @click.stop="close">
          <i class="vc-icon-close"></i>
        </button>
      </div>
    </slot>

    <slot></slot>

    <div v-if="$slots.footer" class="vc-layer--footer">
      <slot name="footer"></slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

interface Props {
  title?: string
  show?: boolean
}

defineOptions({
  name: 'VcLayer'
})

const el = useTemplateRef('el')
const { title = '标题' } = defineProps<Props>()
const isOpen = ref(false)
const currentTargetEl = ref(null)

function show(e: MouseEvent) {
  return new Promise((resolve, reject) => {
    if (!el.value) reject('el is null')

    el.value.style.viewTransitionName = 'screenDialog-open'

    if (e) {
      currentTargetEl.value = e.currentTarget || e.target
      if (currentTargetEl.value)
        currentTargetEl.value.style.viewTransitionName = 'screenDialog-open'
    }

    document.startViewTransition(() => {
      if (currentTargetEl.value)
        currentTargetEl.value.style.viewTransitionName = ''

      el.value.showModal()
      isOpen.value = true

      resolve(true)
    })
  })
}

function close() {
  return new Promise(async resolve => {
    el.value.style.viewTransitionName = 'screenDialog-hide'

    const transition = document.startViewTransition(() => {
      if (currentTargetEl.value)
        currentTargetEl.value.style.viewTransitionName = 'screenDialog-hide'

      el.value.close()
      isOpen.value = false

      resolve(true)
    })

    try {
      await transition.finished
    } finally {
      if (currentTargetEl.value)
        currentTargetEl.value.style.viewTransitionName = ''
    }
  })
}

function onClick(e: MouseEvent) {
  if (e.target === el.value) {
    close()
  }
}

defineExpose({
  show,
  close
})
</script>
