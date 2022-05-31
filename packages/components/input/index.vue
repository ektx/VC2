<template>
  <div
    :class="['vc-input', `is-${type}`, { 'is-disabled': disabled }]"
    v-bind="setAttrs($attrs, ['id', 'class', 'style'])"
    @click="onClick"
  >
    <div class="vc-input__prefix-icon">
      <slot name="prefixIcon">
        <i v-if="prefixIcon" :class="prefixIcon"></i>
      </slot>
    </div>

    <input
      v-if="type !== 'textarea'"
      ref="input"
      class="vc-input__text"
      v-bind="setAttrs($attrs, ['events'])"
      v-model="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="TYPE"
    />
    <textarea
      v-else
      ref="textarea"
      class="vc-input__textarea"
      v-bind="setAttrs($attrs, ['events'])"
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="textareaCalcStyle"
    ></textarea>

    <div
      class="vc-input__clearable"
      v-if="clearable && modelValue"
      @click="clearMsg"
    >
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
      <i :class="TYPE === 'text' ? 'vc-icon-not-view' : 'vc-icon-view'"></i>
    </div>

    <div v-if="showWordLimit" class="vc-input__num-length">
      <span>{{ state.nowLength }}</span>
      <span>/{{ state.maxLength }}</span>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, inject } from 'vue'
import { setAttrs } from '../../utils/index'
import calcTextareaHeight from './calcTextareaHeight'

export default {
  name: 'VcInput',
  inheritAttrs: false,
  props: {
    //
    suffixIcon: String,
    prefixIcon: String,
    modelValue: {
      type: [String, Number],
      default: ''
    },
    //
    disabled: {
      type: Boolean,
      default: false
    },
    // input 清除按钮
    clearable: {
      type: Boolean,
      default: false
    },
    // input placeholder属性
    placeholder: {
      type: String,
      default: '请输入'
    },
    // 是否显示密码
    showPassword: {
      type: Boolean,
      default: false
    },
    // input 类型
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    // 显示长度
    showWordLimit: {
      type: Boolean,
      default: false
    },
    // 是否开启验证
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { attrs, emit }) {
    const textarea = ref(null)
    const input = ref(null)
    let textareaCalcStyle = ref(null)
    let TYPE = ref(props.type)
    let inputEl = null

    const vcFormItem = inject('vcFormItem', null)

    const state = reactive({
      maxLength: 0,
      nowLength: 0
    })

    // 获取焦点
    const focus = () => {
      inputEl.focus()
    }
    // 失去焦点
    const blur = () => {
      inputEl.blur()
    }
    // 选中文字
    const select = () => {
      inputEl.select()
    }

    // 动态获取文本域
    watch(
      () => props.modelValue,
      val => {
        resizeTextarea()

        // 时时更新统计字数
        if (props.showWordLimit) {
          state.maxLength = inputEl.maxLength
          state.nowLength = val.length
        }

        if (props.validateEvent && vcFormItem) {
          vcFormItem.checkValidate('change')
        }
      }
    )

    const resizeTextarea = () => {
      if (props.type !== 'textarea' || !props.autosize) return

      let minRows = 1
      let maxRows = null

      if (typeof props.autosize === 'object') {
        ;({ minRows, maxRows } = props.autosize)
      }

      textareaCalcStyle.value = calcTextareaHeight(
        textarea.value,
        minRows,
        maxRows
      )
    }

    onMounted(() => {
      inputEl = input.value || textarea.value

      resizeTextarea()

      if (props.showWordLimit) {
        state.maxLength = inputEl.maxLength
      }
    })

    // 点击 清除图标 清除数据
    const clearMsg = () => {
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

    return {
      textareaCalcStyle,
      input,
      textarea,
      clearMsg,
      togglePasswd,
      focus,
      blur,
      state,
      select,
      TYPE,
      setAttrs,
      onClick
    }
  }
}
</script>
