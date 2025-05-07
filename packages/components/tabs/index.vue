<template>
  <div ref="el" class="vc-tabs">
    <div class="vc-tabs--header">
      <div class="vc-tabs-nav-wrap">
        <div
          :class="['vc-tabs-nav-item', { active: item.name === modelValue }]"
          v-for="(item, index) in list"
          @click="onClickNav(item, index)"
        >
          <TabNav :data="item"></TabNav
          ><i
            v-if="item.closable"
            class="vc-icon-close"
            @click.stop="onCloseItem(item, index)"
          ></i>
        </div>
      </div>
      <div v-if="$slots.extra" class="vc-tabs-extra">
        <slot name="extra"></slot>
      </div>
    </div>

    <div class="vc-tabs--body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  getCurrentInstance,
  provide,
  watch,
  useSlots,
  nextTick,
  useTemplateRef
} from 'vue'
import TabNav from './tabNav'

const props = defineProps({
  // 选中对象
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
const emits = defineEmits(['update:modelValue', 'close'])

const list = ref([])
const instance = getCurrentInstance()
const slots = useSlots()
const el = useTemplateRef('el')

provide('tabsRootContextKey', {
  instance,
  props,
  updatePanel,
  emits
})

async function updatePanel(pane) {
  let index = list.value.findIndex(item => item.id === pane.id)

  if (index > -1) {
    list.value.splice(index, 1)
  }

  list.value.push(pane)

  await nextTick()

  // 聚集活动节点
  const activeEl = el.value.querySelector('.active')
  const activeBCR = activeEl.getBoundingClientRect()
  const wrapEl = el.value.querySelector('.vc-tabs-nav-wrap')
  const offset = activeBCR.x - wrapEl.clientWidth + activeBCR.width

  wrapEl.scrollBy(offset, 0)
}

function onClickNav(item, i) {
  emits('update:modelValue', item.name)
}

function onCloseItem(item, index) {
  list.value.splice(index, 1)
  // 当关闭节点与活动节点相同时
  if (item.name === props.modelValue) {
    if (index > 0) {
      emits('update:modelValue', list.value[index - 1].name)
    } else {
      if (list.value.length > 0) {
        emits('update:modelValue', list.value[0].name)
      }
    }
  }

  emits('close', { tab: item, index })
}
</script>
