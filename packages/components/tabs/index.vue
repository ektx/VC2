<template>
  <div class="vc-tabs">
    <div class="vc-tabs--header">
      <div class="vc-tabs--nav-wrap">
        <div
          ref="virtualBoxRrf"
          class="vc-tabs--virtual-content"
          @wheel="onWheel"
        >
          <Nav2 :list="list"></Nav2>
        </div>
        <div
          ref="virtualScrollRef"
          v-show="virtualVisible"
          class="vc-tabs--virtual-scroll"
        >
          <div class="vc-tabs--virtual-scrollbar"></div>
        </div>
      </div>
      <div class="vc-append">
        <slot name="append"></slot>
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
  nextTick
} from 'vue'
import Nav from './tabNav.vue'
import Nav2 from './tabNav'

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
console.log(slots)
console.log(instance)
provide('tabsRootContextKey', {
  instance,
  props,
  updatePanel,
  removePanel,
  emits
})

// watch(
//   () => props.value,
//   val => {
//     this.list.forEach(item => {
//       if (item.id === val) this.activeTab = item
//     })
//   }
// )

onMounted(() => {})

/**
 * @param {MouseEvent} e
 */
const onWheel = e => {
  const { clientWidth, scrollWidth } = virtualBoxRrf.value

  if (scrollWidth <= clientWidth) return

  e.preventDefault()

  if (/mac/i.test(navigator.userAgent)) {
    e.currentTarget.scrollLeft -= e.deltaY
  } else {
    e.currentTarget.scrollLeft += e.deltaY
  }

  updateVirtualScroll()
}

function updatePanel(pane) {
  console.log('update...', pane)
  let index = list.value.findIndex(item => item.id === pane.id)

  if (index > -1) {
    list.value.splice(index, 1)
  }

  list.value.push(pane)

  nextTick(() => {
    focusActive()
    updateVirtualScroll()
  })
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

function updateVirtualScroll() {
  if (!virtualBoxRrf.value) return

  const { clientWidth, scrollWidth } = virtualBoxRrf.value
  const barEl = virtualScrollRef.value.querySelector(
    '.vc-tabs--virtual-scrollbar'
  )

  virtualVisible.value = clientWidth < scrollWidth

  Object.assign(barEl.style, {
    width: (clientWidth * 100) / scrollWidth + '%',
    transform: `translate(${
      (virtualBoxRrf.value.scrollLeft * 100) / clientWidth
    }%, 0px)`
  })
}
</script>
