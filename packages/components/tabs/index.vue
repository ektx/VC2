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
            @click.stop="onCloseItem(item)"
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
const emits = defineEmits(['update:modelValue', 'remove'])

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
  removePanel,
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

function removePanel(id) {
  let index = list.value.findIndex(item => item.id === id)

  list.value.splice(index, 1)
}

const removeTab = tab => {
  let index = this.list.findIndex(item => item.id === tab.id)
  this.list.splice(index, 1)
  // 更新当前标签
  if (this.activeTab && tab.id === this.activeTab.id) {
    this.activeTab = null
  }

  this.$emit('tab-remove', tab, index)
  this.$emit('tabRemove', tab, index)
}

function focusActive() {
  const activeEl = virtualBoxRrf.value.querySelector('.is-active')
  const { clientWidth } = virtualBoxRrf.value

  if (!activeEl) return
  console.log(1, activeEl.offsetLeft)
  // activeEl && activeEl.scrollIntoView()
  virtualBoxRrf.value.scrollLeft =
    activeEl.offsetLeft - clientWidth + activeEl.clientWidth
}

function onClickNav(item, i) {
  emits('update:modelValue', item.name)
}

function onCloseItem(item) {
  debugger
}
</script>
