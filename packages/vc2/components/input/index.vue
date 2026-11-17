<template>
  <div
    :class="['vc-input', `is-${type}`, { 'is-disabled': disabled }]"
    v-bind="setAttrs($attrs, ['id', 'class', 'style'])"
    @click="onClick"
  >
    <div v-if="$slots.prepend" class="vc-input__prepend">
      <slot name="prepend"></slot>
    </div>

    <div v-if="$slots.prefixIcon || prefixIcon" class="vc-input__prefix-icon">
      <slot name="prefixIcon">
        <i v-if="prefixIcon" :class="prefixIcon"></i>
      </slot>
    </div>

    <input
      v-if="type !== 'textarea'"
      ref="input"
      class="vc-input__text"
      v-bind="setAttrs($attrs, ['events'])"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="TYPE"
      @input="evt => $emit('update:modelValue', (evt.target as HTMLInputElement).value)"
      @keyup.enter="e => $emit('enter', e)"
    />
    <textarea
      v-else
      ref="textarea"
      class="vc-input__textarea"
      v-bind="setAttrs($attrs, ['events'])"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="textareaCalcStyle"
      @input="evt => $emit('update:modelValue', (evt.target as HTMLTextAreaElement).value)"
      @keyup.enter="e => $emit('enter', e)"
    ></textarea>

    <div class="vc-input__clearable" v-if="clearable" @click="clearMsg">
      <i class="vc-icon-error"></i>
    </div>

    <div class="vc-input__suffix-icon">
      <slot name="suffixIcon">
        <i v-if="suffixIcon" :class="suffixIcon"></i>
      </slot>
    </div>

    <div
      v-if="type === 'password' && modelValue"
      class="vc-input__show-passwd"
      @click="togglePasswd"
    >
      <i :class="TYPE === 'text' ? 'vc-icon-view' : 'vc-icon-not-view'"></i>
    </div>

    <div v-if="showWordLimit" class="vc-input__num-length">
      <span>{{ state.nowLength }}</span>
      <span>/{{ state.maxLength }}</span>
    </div>

    <div v-if="$slots.append" class="vc-input__append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, inject, StyleValue } from 'vue'
import { setAttrs } from '../../utils/index'
import { inputProps, inputEmits } from './types'

defineOptions({
  name: 'VcInput',
  inheritAttrs: false
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const textarea = ref<HTMLTextAreaElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
let textareaCalcStyle = ref<any>(null)
let TYPE = ref(props.type)
let inputEl: HTMLInputElement | HTMLTextAreaElement | null = null

const vcFormItem = inject<any>('vcFormItem', null)

const state = reactive({
  maxLength: 0,
  nowLength: 0
})

// 获取焦点
const focus = () => {
  inputEl?.focus()
}
// 失去焦点
const blur = () => {
  inputEl?.blur()
}
// 选中文字
const select = () => {
  inputEl?.select()
}

// 动态获取文本域
watch(
  () => props.modelValue,
  val => {
    resizeTextarea()

    // 时时更新统计字数
    if (props.showWordLimit && inputEl) {
      state.maxLength = inputEl.maxLength
      state.nowLength = String(val).length
    }

    if (props.validateEvent && vcFormItem) {
      vcFormItem.checkValidate('change')
    }
  }
)

const resizeTextarea = () => {
  if (props.type !== 'textarea' || !props.autosize) return

  let minRows = 2
  let maxRows: number | string = Infinity

  if (typeof props.autosize === 'object') {
    ;({ minRows, maxRows = Infinity } = props.autosize)
  }

  textareaCalcStyle.value = {
    fieldSizing: 'content',
    '--max-rows': maxRows + 'lh',
    '--min-rows': minRows + 'lh',
    resize: typeof props.autosize === 'boolean' ? 'vertical' : 'none'
  } as any
}

onMounted(() => {
  inputEl = input.value || textarea.value

  resizeTextarea()

  if (props.showWordLimit && inputEl) {
    state.maxLength = inputEl.maxLength
  }
})

// 点击 清除图标 清除数据
const clearMsg = () => {
  if (inputEl) {
    inputEl.value = ''
  }

  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  focus()
}

const togglePasswd = () => {
  TYPE.value = TYPE.value == 'text' ? 'password' : 'text'
}

function onClick() {
  focus()
}

defineExpose({
  focus,
  blur,
  select
})
</script>
