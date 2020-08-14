<template>
  <div 
    :class="[
      'vc-input', `is-${type}`,
      {'is-focus': focusing, 'is-disabled': disabled }
    ]"
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
      v-bind="__attrs"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="__type"
      @input="changeInputEvt"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <textarea
      v-else
      ref="textarea"
      class="vc-input__textarea"
      v-bind="__attrs"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="textareaCalcStyle"
      @input="changeInputEvt"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></textarea>

    <div class="vc-input__suffix-icon">
      <slot name="suffixIcon">
        <i v-if="suffixIcon" :class="suffixIcon"></i>
      </slot>
    </div>

    <div
      class="vc-input__clearable"
      v-if="clearable && value"
      @click="clearMsg"
    >
      <i class="vc-icon-circle-close"></i>
    </div>

    <div 
      v-if="type === 'password' && value" 
      class="vc-input__show-passwd" 
      @click="togglePasswd"
    >
      <i :class="__type === 'text' ? 'vc-icon-not-view' : 'vc-icon-view'"></i>
    </div>

      <div v-if="showWordLimit" class="vc-input__num-length">
        <span>{{state.nowLength}}</span>
        <span>/{{state.maxLength}}</span>
      </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  watch,
  inject,
} from 'vue'
import { getAttrs } from '../../utils/index'
import calcTextareaHeight from "./calcTextareaHeight"

export default {
  name: "VcInput",
  inheritAttrs: false,
  props: {
    //
    suffixIcon: String,
    prefixIcon: String,
    value: {
      type: String,
      default: ""
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
      default: "text"
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
      default: false
    }
  },
  setup(props, { attrs, emit }) {
    const textarea = ref(null)
    const input = ref(null)
    let focusing = ref(false);
    let textareaCalcStyle = ref(null);
    let __type = ref(props.type)
    let inputEl = null

    const vcFormItem = inject("vcFormItem", null);

    const state = reactive({
      maxLength: 0,
      nowLength: 0
    })

    const changeInputEvt = evt => {
      emit("update:value", event.target.value);

      if (props.showWordLimit) {
        state.maxLength = inputEl.maxLength
        state.nowLength = event.target.value.length
      }

      if (props.validateEvent) {
        vcFormItem.checkValidate("change")
      }
    };

    const handleFocus = event => {
      event.preventDefault();
      event.stopPropagation();

      focusing.value = true;
      emit("focus", event);
    };

    const handleBlur = event => {
      event.preventDefault()
      event.stopPropagation()

      focusing.value = false;
      emit("blur", event);

      if (props.validateEvent) {
        vcFormItem.checkValidate("blur");
      }
    };
    // input 获取焦点得方法
    const focus = () => {
      let arr = input.value || textarea.value;
      arr.focus()
    };
    // input 失去焦点得方法
    const blur = () => {
      let arr = input.value || textarea.value;
      arr.blur();
    };
    // 选中 input 中的文字
    const select = () => {
      let arr = input.value || textarea.value;
      arr.select();
    };

    const handleChange = event => {
      emit("change", event.target.value)
    };
    
    // 动态获取文本域
    watch(
      () => props.value,
      () => {resizeTextarea()}
    )
    const resizeTextarea = () => {
      if (props.type !== "textarea" || !props.autosize) return
      
      let minRows = 1
      let maxRows = null
      
      if (typeof props.autosize === 'object') {
        ({minRows, maxRows} = props.autosize)
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
      emit('update:value', '')
      emit('change', '')
      emit('clear')
      focus()
    }

    const togglePasswd = () => {
      __type.value = __type.value == 'text' ? 'password' : 'text'
    }

    return {
      focusing,
      textareaCalcStyle,
      input,
      textarea,
      changeInputEvt,
      clearMsg,
      togglePasswd,
      handleFocus,
      handleBlur,
      handleChange,
      focus,
      state,
      __attrs: getAttrs(),
      __type
    };
  }
}
</script>