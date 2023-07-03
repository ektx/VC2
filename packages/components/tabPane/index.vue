<template>
  <div class="vc-tab-pane" v-if="visible">
    <slot></slot>
  </div>
</template>

<script setup>
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  useSlots
} from 'vue'

const props = defineProps({
  // 选项卡标题
  label: {
    type: String,
    default: ''
  },
  // 与选项卡绑定值 value 对应的标识符，表示选项卡别名
  name: {
    type: [String, Number],
    default: ''
  },
  // 标签是否可关闭
  closable: Boolean,
  // 是否禁用
  disabled: Boolean,
  // 选项卡图标
  icon: String
})

const instance = getCurrentInstance()
const slots = useSlots()
const tabsRoot = inject('tabsRootContextKey')

const id = computed(() => {
  return props.name || props.label
})
const visible = computed(() => {
  return tabsRoot.props.modelValue
    ? id.value === tabsRoot.props.modelValue
    : false
})

onUpdated(() => {
  if (slots.label) {
    nextTick(() => {
      tabsRoot.updatePanel({
        id: instance.uid,
        props,
        slots
      })
    })
  }
})

onMounted(() => {
  tabsRoot.updatePanel({
    id: instance.uid,
    props,
    slots
  })
})

onBeforeUnmount(() => {
  tabsRoot.removePanel(instance.uid)
})
</script>
