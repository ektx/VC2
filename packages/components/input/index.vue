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
        v-bind="$attrs"
        :disabled="disabled"
        :class="[disabled ? 'disabled' : '']"
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
        <i class="">
          <span>{{nowLength}}</span><span>/{{maxLength}}</span>
        </i>
      </div>
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
      type: String
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

    const vcFormItem = inject('vcFormItem', null);

    const state = reactive({
        maxLength: 0,
        nowLength: 0,
    });

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
      console.log('触发input')
      context.emit("update:value", event.target.value);
      if(props.showWordLimit) {
        state.maxLength = input.value.maxLength
        state.nowLength = event.target.value.length
      }
      if(props.validateEvent){
        vcFormItem.checkValidate('change')
      }
    };

    const handleFocus = event => {
      console.log('触发foucus')
      event.preventDefault()
      focusing.value = true
      context.emit('focus', event)
    }

    const handleBlur = event => {
      console.log('触发失焦')
      event.preventDefault()
      focusing.value = false
      context.emit('blur', event)

      if(props.validateEvent){
        vcFormItem.checkValidate('blur')
      }
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
      if(props.showWordLimit){
      }
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
      if(props.showWordLimit) {
        state.maxLength = input.value.maxLength
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
       vcFormItem,
    };
  }
};
</script>

<style lang="less">
.vc-input {
  font-size: 14px;

  .vc-input__text {
    display: flex;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 180px;
    
    box-sizing: border-box;

    &:hover {
      // box-shadow: 0 0 2px 0 rgba(232, 237, 250, 0.6),
      //   0 2px 2px 0 rgba(232, 237, 250, 0.5);
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

      span{
        color: #909399;
        font-size: 12px;
      }
    }

    .int-icon-right {
      margin-right: 5px;
    }

    .focus {
      border-color: #409eff;
    }

    input {
      width: 100%;
      height: 100%;
      padding: .4em .5em .4em .5em;
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
