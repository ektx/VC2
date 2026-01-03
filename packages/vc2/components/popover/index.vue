<template>
  <Popper>
    <teleport to="body">
      <div
        :id="popoverId"
        :class="['vc-popover-target', area, defaultClass]"
        :popover
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

<script setup>
import { computed, useId, ref } from 'vue'
import Inner from './slots'
import Popper from '../popper/index.vue'

defineOptions({
  name: 'VcPopover'
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  popover: {
    type: String,
    default: 'auto' // 'manual' 手动js控制
  },
  defaultClass: {
    type: String,
    default: ''
  },
  referenceClass: {
    type: String,
    default: ''
  },
  /**
   * 定位
   * top | top center | top span-left | top span-right | top left | top right |
   * bottom(default) | bottom center | bottom span-left | bottom span-right | bottom left | bottom right |
   * left | left center | left span-top | left span-bottom |
   * right | right center | right span-top | right span-bottom |
   *
   */
  area: {
    type: String,
    default: 'bottom span-right'
  },
  speed: {
    type: String,
    default: '0.3s'
  },
  title: {
    type: String,
    default: 'Title'
  },
  content: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: ''
  }
})

const id = useId()
const popoverId = `popover-${id}`
const anchorName = '--anchor-el-' + id
const isVisible = ref(false)
let timer = null

const popoverStyle = computed(() => {
  let w = typeof props.width === 'number' ? props.width + 'px' : props.width
  return {
    positionAnchor: anchorName,
    insetArea: props.area,
    // positionArea: props.area,
    '--speed': props.speed,
    '--w': w
  }
})

function onBeforetoggle(e) {
  if (e.newState == 'closed') {
    timer = setTimeout(() => {
      isVisible.value = false
    }, 100)
  }
}

const onClick = e => {
  let el = document.getElementById(popoverId)

  if (isVisible.value) {
    el.hidePopover()
    isVisible.value = false
  } else {
    el.showPopover()
    isVisible.value = true
  }
}

function onHover() {
  // debugger
}

function onMouseleave() {
  // debugger
}

function onFocusIn() {}
function onFocusOut() {}

function show() {
  let el = document.getElementById(popoverId)
  el.showPopover()
}

function hide() {
  let el = document.getElementById(popoverId)
  el.hidePopover()
}

defineExpose({ show, hide })
</script>
