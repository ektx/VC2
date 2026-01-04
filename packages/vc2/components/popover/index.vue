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
    ></Inner>
  </Popper>
</template>

<script setup lang="ts">
import { computed, useId, ref, type CSSProperties } from 'vue'
import Inner from './slots'
import Popper from '../popper/index.vue'
import { popoverProps } from './types'

defineOptions({
  name: 'VcPopover'
})

const props = defineProps(popoverProps)

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

function onBeforetoggle(e: any) {
  if (e.newState === 'closed') {
    timer = setTimeout(() => {
      isVisible.value = false
    }, 100)
  }
}

const onClick = () => {
  const el = document.getElementById(popoverId) as HTMLElement & {
    showPopover(): void
    hidePopover(): void
  }

  if (!el) return

  if (isVisible.value) {
    el.hidePopover()
    isVisible.value = false
  } else {
    el.showPopover()
    isVisible.value = true
  }
}

function onHover() {
  onClick()
}

function onMouseleave() {
  // logic here if needed
}

function onFocusIn() {}
function onFocusOut() {}

function show() {
  const el = document.getElementById(popoverId) as HTMLElement & {
    showPopover(): void
    hidePopover(): void
  }
  el?.showPopover()
}

function hide() {
  const el = document.getElementById(popoverId) as HTMLElement & {
    showPopover(): void
    hidePopover(): void
  }
  el?.hidePopover()
}

defineExpose({ show, hide })
</script>
