<template>
  <div class="vc-input">
    <div
      :class="[
        'vc-input__text',
        {'is-focus': focusing, 'is-disabled': disabled }
      ]"
      v-if="type !== 'textarea'"
    >
      <div class="vc-input__text--prefix-icon">
        <slot name="prefixIcon">
          <i v-if="prefixIcon" :class="prefixIcon"></i>
        </slot>
      </div>
      <input
        ref="input"
        :value="value"
        v-bind="__attrs"
        :class="['vc-input__text--input',disabled ? 'disabled-input' : '']"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="__type"
        @input="changeInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
      <div class="vc-input__text--suffix-icon">
        <slot name="suffixIcon">
          <i v-if="suffixIcon" :class="suffixIcon"></i>
        </slot>
      </div>

      <div
        class="vc-input__text--clearable"
        v-if="clearable && value"
        @click="clearMsg"
      >
        <i class="vc-icon-circle-close"></i>
      </div>

      <div 
        v-if="type === 'password' && value" 
        class="vc-input__text--show-passwd" 
        @click="togglePasswd"
      >
        <i :class="__type === 'text' ? 'vc-icon-not-view' : 'vc-icon-view'"></i>
      </div>

      <div class="vc-input__numLength" v-if="showWordLimit">
        <i class>
          <span>{{nowLength}}</span>
          <span>/{{maxLength}}</span>
        </i>
      </div>
    </div>
    <div v-else class="vc_input__textarea">
      <textarea
        :class="[
          'vc-input__inner',
          focusing ? 'focus-textarea' : ''
        ]"
        :value="value"
        ref="textarea"
        :placeholder="placeholder"
        :rows="rows"
        :style="textareaCalcStyle"
        @input="changeInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      ></textarea>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  onUpdated,
  watch,
  toRefs,
  inject,
} from "vue"
import { getAttrs } from '../../utils/index'
import calcTextareaHeight from "./calcTextareaHeight";

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
    rows: {
      type: [Number, String],
      default: "1"
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
    let hovering = ref(false);
    let focusing = ref(false);
    let content = ref("");
    let textareaCalcStyle = ref(null);
    let __type = ref(props.type)

    const vcFormItem = inject("vcFormItem", null);

    const state = reactive({
      maxLength: 0,
      nowLength: 0
    });

    const textarea = ref(null);
    const input = ref(null);

    watch(
      () => props.value,
      (count, prevCount) => {
        resizeTextarea();
      }
    )

    const changeInput = evt => {
      emit("update:value", event.target.value);
      if (props.showWordLimit) {
        state.maxLength = input.value.maxLength;
        state.nowLength = event.target.value.length;
      }
      if (props.validateEvent) {
        vcFormItem.checkValidate("change");
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
    // 动态获取文本域得方法
    const resizeTextarea = () => {
      if (props.type !== "textarea") return;
      if (!props.autosize) {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight
        };
        return;
      }
      const minRows = props.autosize.minRows;
      const maxRows = props.autosize.maxRows;

      textareaCalcStyle.value = calcTextareaHeight(
        textarea.value,
        minRows,
        maxRows
      );
    };

    onMounted(() => {
      
      resizeTextarea();
      if (props.showWordLimit) {
        state.maxLength = input.value.maxLength;
      }
    });
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
      hovering,
      focusing,
      content,
      textareaCalcStyle,
      textarea,
      changeInput,
      clearMsg,
      togglePasswd,
      handleFocus,
      handleBlur,
      handleChange,
      focus,
      input,
      ...toRefs(state),
      vcFormItem,
      __attrs: getAttrs(),
      __type
    };
  }
}
</script>