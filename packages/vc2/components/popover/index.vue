<template>
  <Popper>
    <teleport to="body">
      <div
        :id="popoverId"
        :class="['vc-popover-target', area, defaultClass]"
        :popover="popover"
        :style="popoverStyle"
        @beforetoggle="onBeforetoggle"
      >
        <slot>
          <div class="title">{{ title }}</div>
          <div class="body">{{ content }}</div>
        </slot>
      </div>
    </teleport>

    <Inner
      ref="referenceArea"
      :slots="$slots"
      :style="{ anchorName }"
      @click="onClick"
      @mouseenter="onHover"
      @mouseleave="onMouseleave"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
      @contextmenu="onContextMenu"
    ></Inner>
  </Popper>
</template>

<script setup lang="ts">
import { computed, useId, ref, type CSSProperties, watch, onMounted } from 'vue'
import Inner from './slots'
import Popper from '../popper/index.vue'
import { popoverProps } from './types'

defineOptions({
  name: 'VcPopover'
})

const props = defineProps(popoverProps)
const emit = defineEmits(['update:visible'])

const id = useId()
const popoverId = `popover-${id}`
const anchorName = '--anchor-el-' + id
const isVisible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const popoverStyle = computed<CSSProperties>(() => {
  const w = typeof props.width === 'number' ? props.width + 'px' : props.width
  return {
    positionAnchor: anchorName,
    insetArea: props.area,
    '--speed': props.speed,
    '--w': w
  } as CSSProperties
})

function updateVisible(val: boolean) {
  isVisible.value = val
  emit('update:visible', val)
}

function onBeforetoggle(e: any) {
  if (e.newState === 'closed') {
    timer = setTimeout(() => {
      updateVisible(false)
    }, 100)
  } else {
    updateVisible(true)
  }
}

const onClick = () => {
  if (props.trigger !== 'click') return

  if (isVisible.value) {
    hide()
  } else {
    show()
  }
}

function onHover() {
  if (props.trigger !== 'hover') return
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  show()
}

function onMouseleave() {
  if (props.trigger !== 'hover') return
  timer = setTimeout(() => {
    hide()
  }, 100)
}

function onFocusIn() {
  if (props.trigger !== 'focus') return
  show()
}

function onFocusOut() {
  if (props.trigger !== 'focus') return
  hide()
}

function onContextMenu(e: MouseEvent) {
  if (props.trigger !== 'contextmenu') return
  e.preventDefault()
  show()
}

function show() {
  const el = document.getElementById(popoverId) as HTMLElement & {
    showPopover(): void
    hidePopover(): void
  }
  if (el && !isVisible.value) {
    el.showPopover()
  }
}

function hide() {
  const el = document.getElementById(popoverId) as HTMLElement & {
    showPopover(): void
    hidePopover(): void
  }
  if (el && isVisible.value) {
    el.hidePopover()
  }
}

watch(
  () => props.visible,
  newVal => {
    if (props.trigger !== 'manual') return
    if (newVal) {
      show()
    } else {
      hide()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.trigger === 'manual' && props.visible) {
    show()
  }
})

defineExpose({ show, hide })
</script>
