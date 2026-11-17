<template>
  <dialog
    ref="el"
    :class="['vc-layer', { def: !isDefAni }]"
    closedby="none"
    @click="onClick"
  >
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
import { computed, ref, useTemplateRef, watch } from 'vue'
import { layerProps } from './types'

defineOptions({
  name: 'VcLayer'
})

const { title = '标题', show: showProp = false } = defineProps(layerProps)
const emit = defineEmits(['update:show'])

const el = useTemplateRef('el')
const isOpen = ref(false)
const currentTargetEl = ref<HTMLElement | null>(null)

const isDefAni = computed(() => !!currentTargetEl.value)

watch(
  () => showProp,
  val => {
    if (val) {
      show(null)
    } else {
      close()
    }
  }
)

function show(e: MouseEvent) {
  return new Promise((resolve, reject) => {
    if (!el.value) {
      reject('el is null')
      return
    }

    if (e) {
      currentTargetEl.value = (e.currentTarget || e.target) as HTMLElement
      // 旧状态：只给目标元素设置 name，dialog 此时是关闭状态不应设置
      if (currentTargetEl.value) {
        currentTargetEl.value.style.viewTransitionName = 'screenDialog-open'
      }
    }

    document.startViewTransition(() => {
      // 新状态：目标清除 name，dialog 设置 name 并打开
      if (currentTargetEl.value)
        currentTargetEl.value.style.viewTransitionName = ''

      if (el.value) el.value.style.viewTransitionName = 'screenDialog-open'

      el.value?.showModal()
      isOpen.value = true

      resolve(true)
    })
  })
}

function close() {
  return new Promise(async resolve => {
    if (!el.value) return

    if (currentTargetEl.value)
      el.value.style.viewTransitionName = 'screenDialog-hide'

    const transition = document.startViewTransition(() => {
      if (el.value) el.value.style.viewTransitionName = ''

      if (currentTargetEl.value) {
        currentTargetEl.value.style.viewTransitionName = 'screenDialog-hide'
      }

      el.value?.close()
      isOpen.value = false
      emit('update:show', isOpen.value)

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
