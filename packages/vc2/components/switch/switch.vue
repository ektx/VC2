<template>
  <div
    :class="[
      'vc-switch',
      {
        'is-checked': checked,
        'is-disabled': disabled || loading
      }
    ]"
    :style="style"
    @click="changeStyle"
  >
    <div
      :class="[
        'vc-switch__label vc-switch__label-left',
        { 'is-active': !checked }
      ]"
      v-if="!inset && (inactiveIcon || inactiveText)"
    >
      <i :class="inactiveIcon" v-if="inactiveIcon"></i>
      <span v-if="inactiveText">{{ inactiveText }}</span>
    </div>

    <div class="vc-switch__core" :style="coreStyle">
      <Inset v-if="inset" type="open" :icon="activeIcon" :text="activeText" />

      <Inset
        v-if="inset"
        type="close"
        :icon="inactiveIcon"
        :text="inactiveText"
      />

      <span v-if="btnText" class="vc-switch__core-dot-size"
        ><i>{{ btnText }}</i></span
      >

      <span :class="['vc-switch__core-dot', { 'has-text': btnText }]">
        <span v-if="loading" class="vc-icon-loading"></span>
        <i v-else>{{ btnText }}</i>
      </span>
    </div>

    <span
      :class="[
        'vc-switch__label vc-switch__label-right',
        { 'is-active': checked }
      ]"
      v-if="!inset && (activeIcon || activeText)"
    >
      <i :class="activeIcon" v-if="activeIcon"></i>
      <span v-if="activeText">{{ activeText }}</span>
    </span>
  </div>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import Inset from './inset.vue'
import { switchProps, switchEmits } from './types'

defineOptions({
  name: 'VcSwitch',
  inheritAttrs: false
})

const emit = defineEmits(switchEmits)

const props = defineProps(switchProps)

const vcFormItem = inject('vcFormItem', null)

// 优先使用 v-model 绑定的 modelValue，未传时回退到已废弃的 value
const currentValue = computed(() =>
  props.modelValue === undefined ? props.value : props.modelValue
)

let checked = ref(currentValue.value === props.activeValue)

watch(
  currentValue,
  val => (checked.value = val === props.activeValue)
)

const coreStyle = computed(() => {
  let color = checked.value ? props.activeColor : props.inactiveColor

  return {
    ...(props.width ? { width: props.width + 'px' } : {}),
    color
  }
})

const style = computed(() => {
  return {
    '--active-color': props.activeColor,
    '--inactive-color': props.inactiveColor,
    '--r': props.r
  }
})

const changeStyle = () => {
  if (props.disabled || props.loading) return

  checked.value = !checked.value
  const val = checked.value ? props.activeValue : props.inactiveValue

  emit('change', val)
  emit('update:modelValue', val)
  emit('update:value', val)
  vcFormItem && vcFormItem.checkValidate('change')
}
</script>
