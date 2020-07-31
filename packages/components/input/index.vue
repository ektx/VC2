<template>
  <div class="vc-input">
    <div
      :class="[
      'vc-input__text',
      disabled ? 'dis' : '',focusing ? 'focus' : ''
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
        :disabled="disabled"
        :class="[disabled ? 'disabled' : '']"
        :placeholder="placeholder"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :maxlength="maxlength"
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
        <i class="">
          <span>0</span><span>/100</span>
        </i>
      </div>
      {{showWordLimit}}


    </div>
    <div v-else class="vc_input__textarea">
      <textarea
        :class="[
          'vc-input__inner',
          focusing ? 'focus' : ''
        ]"
        @input="changeInput"
        :value="value"
        ref="textarea"
        :placeholder="placeholder"
        :rows="rows"
        :style="textareaCalcStyle"
        @focus="focusing = true"
        @blur="focusing = false"
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
  watch
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
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    rows: {
      type: Number,
      default: 1
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    maxlength: {
      type: Number,
    },
    //show-word-limit
    showWordLimit: {
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

    const textarea = ref(null);
    const input = ref(null)

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
      context.emit("update:value", event.target.value);
    };

    const handleFocus = event => {
      focusing.value = true
      context.emit('focus', event)
    }

    const handleBlur = event => {
      focusing.value = false
      context.emit('blur', event)
    }
    // input 获取焦点得方法
    const focus = () =>{
      let arr = input.value || textarea.value;
      arr.focus()
    }
    // input 失去焦点得方法
    const blur = () => {
      let arr = input.value || textarea.value;
      arr.blur()
    }
    // 选中 input 中的文字
    const select = () => {
      let arr = input.value || textarea.value;
      arr.select()
    }

    const handleChange = event => {
      context.emit('change', event);
    }
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
      input
    };
  }
};
</script>

<style lang="less">
.vc-input {
  .vc-input__text {
    display: flex;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 180px;
    height: 40px;
    box-sizing: border-box;

    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
      cursor: pointer;
    }

    .disabled {
      color: #c0c4cc;
      border-color: #e4e7ed;
      cursor: not-allowed !important;
    }

    .vc-input__prefix-icon {
      height: 100%;
      padding-left: 6px;
      line-height: 40px;
      text-align: center;
      transition: all 0.3s;

      i {
        line-height: 100%;
      }
    }

    .vc-input__suffix-icon {
      padding-right: 4px;
    }

    .vc-input__clearable {
      padding-right: 4px;
    }

    .vc-input__showPassword {
      padding-right: 4px;
    }

    .vc-input__numLength{
      padding-right: 6px;
    }

    .int-icon-right {
      margin-right: 5px;
    }

    .focus {
      border-color: #409eff;
    }

    input {
      width: calc(100% - 16px);
      height: 100%;
      font-size: 14px;
      padding-left: 8px;
      cursor: pointer;
    }
  }

  .vc_input__textarea {
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-size: 14px;
    max-width: 414px;

    .vc-input__inner {
      display: block;
      resize: vertical;
      padding: 5px 15px;
      line-height: 1.5;
      box-sizing: border-box;
      width: 100%;
      font-size: inherit;
      color: #606266;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
          0 2px 4px 0 rgba(232, 237, 250, 0.5);
        cursor: pointer;
      }
    }
  }

  .focus {
    border-color: #409eff;
  }
}

.dis {
  background-color: #f5f7fa;
}

input {
  border: 0; // 去除未选中状态边框
  outline: none; // 去除选中状态边框
  background-color: rgba(0, 0, 0, 0); // 透明背景
  -webkit-appearance: none;
}

textarea {
  outline: none;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #d9d9d9;
}
</style>
