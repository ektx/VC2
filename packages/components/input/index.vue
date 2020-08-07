<template>
  <div class="vc-input">
    <div
      :class="[
      'vc-input__text',
      disabled ? 'disabled' : '',
      focusing ? 'focus' : ''
    ]"
      v-if="type !== 'textarea'"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="vc-input__prefix-icon" v-if="prefixIcon">
        <i :class="prefixIcon"></i>
      </div>
      <input
        :value="value"
        ref="input"
        @input="changeInput"
        v-bind="$attrs"
        :disabled="disabled"
        :class="['vc-input__input',disabled ? 'disabled-input' : '']"
        :placeholder="placeholder"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
      <div class="vc-input__suffix-icon" v-if="suffixIcon">
        <i :class="suffixIcon"></i>
      </div>

      <div
        class="vc-input__clearable"
        v-if="clearable && isMety || clearable && isMety && hovering || clearable && isMety && focusing"
        @click="clearMsg"
      >
        <i class="vc-icon-circle-close"></i>
      </div>

      <div class="vc-input__showPassword" v-if="showPassword && isMety" @click="closeMsg">
        <i class="vc-icon-view"></i>
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
        @input="changeInput"
        :value="value"
        ref="textarea"
        :placeholder="placeholder"
        :rows="rows"
        :style="textareaCalcStyle"
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
  watchEffect,
  onMounted,
  getCurrentInstance,
  onUpdated,
  watch,
  toRefs,
  inject
} from "vue";

import calcTextareaHeight from "./calcTextareaHeight";

export default {
  name: "VcInput",
  props: {
    //
    suffixIcon: String,
    prefixIcon: String,
    value: {
      type: [String, Number],
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
  setup(props, context) {
    let hovering = ref(false);
    let focusing = ref(false);
    let isMety = ref(false);
    let passwordVisible = ref(false);
    let content = ref("");
    let textareaCalcStyle = ref(null);

    const vcFormItem = inject("vcFormItem", null);

    const state = reactive({
      maxLength: 0,
      nowLength: 0
    });

    const textarea = ref(null);
    const input = ref(null);

    watchEffect(() => {
      if (props.value === "" || props.value === null) {
        isMety.value = false;
      } else {
        isMety.value = true;
      }
    });

    watch(
      () => props.value,
      (count, prevCount) => {
        resizeTextarea();
      }
    );

    let { ctx } = getCurrentInstance();

    const changeInput = event => {
      event.stopPropagation();
      context.emit("update:value", event.target.value);
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
      context.emit("focus", event);
    };

    const handleBlur = event => {
      event.preventDefault();
      event.stopPropagation();

      focusing.value = false;
      context.emit("blur", event);

      if (props.validateEvent) {
        vcFormItem.checkValidate("blur");
      }
    };
    // input 获取焦点得方法
    const focus = () => {
      
      let arr = input.value || textarea.value;
      arr.focus();
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
      context.emit("change", event);
      if (props.showWordLimit) {
      }
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
      context.emit("update:value", "");
    };

    const closeMsg = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    return {
      hovering,
      focusing,
      content,
      isMety,
      passwordVisible,
      textareaCalcStyle,
      textarea,
      changeInput,
      clearMsg,
      closeMsg,
      handleFocus,
      handleBlur,
      handleChange,
      focus,
      input,
      ...toRefs(state),
      vcFormItem
    };
  }
};
</script>