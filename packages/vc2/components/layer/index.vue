<template>
  <dialog
    ref="el"
    :class="['vc-layer', { def: !isDefAni }]"
    closedby="none"
    @click="onClick"
  >
    <slot name="header">
      <div class="header">
        <h1>{{ title }}{{ isDefAni }}</h1>
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
import { computed, ref, useTemplateRef } from 'vue'
import { layerProps } from './types'

defineOptions({
  name: 'VcLayer'
})

const el = useTemplateRef('el')
const { title = '标题' } = defineProps(layerProps)
const isOpen = ref(false)
const currentTargetEl = ref<HTMLElement | null>(null)

const isDefAni = computed(() => !!currentTargetEl.value)

function show(e: MouseEvent) {
  return new Promise((resolve, reject) => {
    if (!el.value) {
      reject('el is null')
      return
    }

    if (e) {
      el.value.style.viewTransitionName = 'screenDialog-open'
      // 需要处理ts类型错误
      currentTargetEl.value = (e.currentTarget || e.target) as HTMLElement

      if (currentTargetEl.value) {
        currentTargetEl.value.style.viewTransitionName = 'screenDialog-open'
      }
    }

    document.startViewTransition(() => {
      if (currentTargetEl.value)
        currentTargetEl.value.style.viewTransitionName = ''

      el.value?.showModal()
      isOpen.value = true

      resolve(true)
    })
  })
}

function close() {
  return new Promise(async resolve => {
    if (!el.value) return

    console.log('close', currentTargetEl.value)
    if (currentTargetEl.value)
      el.value.style.viewTransitionName = 'screenDialog-hide'

    const transition = document.startViewTransition(() => {
      if (el.value) el.value.style.viewTransitionName = ''

      if (currentTargetEl.value) {
        currentTargetEl.value.style.viewTransitionName = 'screenDialog-hide'
      }

      el.value?.close()
      isOpen.value = false

      resolve(true)
    })

    try {
      await transition.finished
    } finally {
      if (currentTargetEl.value) {
        currentTargetEl.value.style.viewTransitionName = ''
        currentTargetEl.value = null
      }
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
