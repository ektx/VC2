<template>
  <div class="vc-tabs">
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
      <div class="vc-tabs-extra">
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
  onMounted,
  onUpdated,
  nextTick,
  computed
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
const activeTab = ref(null)
const isOver = ref(false)
const isPrevDisable = ref(false)
const isNextDisable = ref(false)
const virtualBoxRrf = ref(null)
const virtualScrollRef = ref(null)
const virtualVisible = ref(false)

const instance = getCurrentInstance()
const slots = useSlots()

console.log(slots.default())
console.log(instance)
provide('tabsRootContextKey', {
  instance,
  props,
  updatePanel,
  emits
})

onMounted(() => {
  console.log('[onMounted SplitCollapseItem]')
})

function updatePanel(pane) {
  console.log('update...', pane)
  let index = list.value.findIndex(item => item.id === pane.id)

  if (index > -1) {
    list.value.splice(index, 1)
  }

  list.value.push(pane)
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
  } else {
    let activeIndex = list.value.findIndex(
      item => item.name === props.modelValue
    )

    // 存在激活项
    if (activeIndex > -1) {
      // 当活动节点在删除节点前，需要减1
      if (activeIndex > index) {
        emits('update:modelValue', list.value[activeIndex - 1].name)
      }
    }
  }

  emits('close', { tab: item, index })
}
</script>
