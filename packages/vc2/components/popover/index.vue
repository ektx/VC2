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
          <vc-button-group class="footer">
            <vc-button v-if="cancelButton" @click="onClickBtn('cancel')">
              {{ getTxt(cancelButton) }}
            </vc-button>
            <vc-button
              v-if="confirmButton"
              theme="primary"
              @click="onClickBtn('confirm')"
            >
              {{ getTxt(confirmButton) }}
            </vc-button>
          </vc-button-group>
        </slot>
      </div>
    </teleport>

    <Inner
      ref="referenceArea"
      :slots="slots"
      :style="{ anchorName }"
      @click="onClick"
      @mouseenter="onHover"
      @mouseleave="onMouseleave"
      @focusin="onFocusIn"
      @focusout="onFocusOut"
      @contextmenu="onContextMenu"
    />
  </Popper>
</template>

<script setup lang="ts">
import {
  computed,
  useId,
  ref,
  type CSSProperties,
  watch,
  onMounted,
  useSlots
} from 'vue'
import Inner from './slots'
import Popper from '../popper/index.vue'
import { popoverProps } from './types'
import VcButton from '../button/index.vue'

defineOptions({
  name: 'VcPopover'
})

const props = defineProps(popoverProps)
const emit = defineEmits(['update:visible', 'confirm', 'cancel'])
const slots = useSlots()

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

const popover = computed(() => {
  return props.trigger === 'manual' ? 'manual' : 'auto'
})

function updateVisible(val: boolean) {
  isVisible.value = val
  emit('update:visible', val)
}

function getTxt(item: string | boolean) {
  return item ? (typeof item === 'string' ? item : '确认') : ''
}

function onClickBtn(type: 'confirm' | 'cancel') {
  emit(type)
  hide()
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
