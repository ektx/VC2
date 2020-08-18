<template>
  <label
    :class="['vc-radio',{'is-checked': model === label}, isBorder ? 'is-border' : '', isButton() ? '' : 'is-button',isDisabled() ? 'is-disabled':'',labelFocus ? 'is-label-focus' : '']"
    ref="vcRadio"
    :style="[sizeStyle,coreStyle]"
  >
    <span
      :class="['vc-radio__input',{'is-checked': model === label}, isDisabled() ? 'is-disabled':'']"
      v-show="isButton()"
    >
      <span :class="['vc-radio__inner', focus ? 'is-focus' : '']">
        <input
          type="radio"
          class="vc-radio__original"
          :value="label"
          v-model="model"
          @change="handleChange"
          :disabled="isDisabled()"
          @blur="handleBlur"
          @focus="handleFocus"
        />
      </span>
    </span>
    <span class="vc-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">备选项</template>
    </span>
  </label>
</template>

<script>
import {
  ref,
  getCurrentInstance,
  onMounted,
  watch,
  computed,
  inject
} from "vue";
export default {
  name: "VcRadio",
  componentName: "vcRadio",
  props: {
    label: {},
    value: {},
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否顯示边框
    border: {
      type: Boolean,
      default: false
    },
    // 文字大小
    size: {
      type: Number,
      default: 14
    }
  },
  setup(props, context) {
    let radioGroup = ref("");
    let isBorder = ref("");
    let { ctx } = getCurrentInstance();
    let focus = ref(false)
    let labelFocus = ref(false)
    const vcRadio = ref("");
    const vcFormItem = inject("vcFormItem", null);

    // 判断这是不是一个radio组
    const isGroup = computed(() => {
      let parent = ctx.$parent;
      while (parent) {
        if (parent.$options.name !== "VcRadioGroup") {
          parent = parent.$parent;
        } else {
          radioGroup.value = parent;
          return true;
        }
      }
      return false;
    });

    const model = computed({
      get: () => {
        return isGroup.value ? radioGroup.value.value : props.value;
      },
      set: val => {
        if (isGroup.value) {
          radioGroup.value.$emit("update:value", val);
        } else {
          context.emit("update:value", val);
        }
      }
    });

    const isButton = () => {
      if (isGroup.value && radioGroup.value.type == "button") {
        return false;
      }
      return true;
    };

    const isShowBorder = () => {
      if (isGroup.value && radioGroup.value.type == "button") {
        isBorder.value = true;
      } else {
        isBorder.value = props.border;
      }
    };

    const coreStyle = computed(() => {
      if (
        isGroup.value &&
        radioGroup.value.type == "button" &&
        model.value == props.label
      ) {
        return {
          background: radioGroup.value.fill || "",
          color: radioGroup.value.textColor || "",
          boxShadow: radioGroup.value.fill
            ? "-1px 0 0 0 " + radioGroup.value.fill
            : ""
        };
      }
    });

    const isDisabled = () => {
      if (isGroup.value && !radioGroup.value.disabled) {
        return props.disabled;
      }
      return isGroup.value ? radioGroup.value.disabled : props.disabled;
    };

    const sizeStyle = computed(() => {
      if (
        isGroup.value &&
        radioGroup.value.size != undefined &&
        radioGroup.value.size != 14
      ) {
        return {
          fontSize: radioGroup.value.size + "px"
        };
      }
      if (props.size != 14) {
        return {
          fontSize: props.size + "px"
        };
      }
    });

    const handleChange = event => {
      console.log(11111111111)
      if (isDisabled()) return;
      setTimeout(() => {
        if (isGroup.value) {
          radioGroup.value.$emit("update:value", model.value);
          if (vcFormItem != null) {
            vcFormItem.checkValidate("change");
          }
        } else {
          context.emit("update:value", model.value);
          if (vcFormItem != null) {
            vcFormItem.checkValidate("change");
          }
        }
      }, 100);
    };

    const handleBlur = event => {
      console.log('blur')
      event.preventDefault();
      event.stopPropagation();
      if(isBorder.value == false){
        focus.value = false
      }else {
        labelFocus.value = false
      }
      if (vcFormItem != null) {
        vcFormItem.checkValidate("blur");
      }
    };

    const handleFocus = event => {
      console.log('focus')
      event.preventDefault();
      event.stopPropagation();
      if(isBorder.value == false){
       focus.value = true
      }else {
        labelFocus.value = true
      }
      if (vcFormItem != null) {
        vcFormItem.checkValidate("focus");
      }
    };

    onMounted(() => {
      isShowBorder();
    });

    return {
      isDisabled,
      sizeStyle,
      model,
      vcRadio,
      handleChange,
      isButton,
      isBorder,
      coreStyle,
      handleFocus,
      handleBlur,
      focus,
      labelFocus
    };
  }
};
</script>

<style lang="less">
.vc-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.vc-radio.is-disabled {
  cursor: not-allowed;
}
.vc-radio.is-border {
  padding: 0.6em 0.9em 0.5em 0.8em;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
}
.vc-radio.is-border.is-label-focus {
  box-shadow: 0 0 0 2px rgba(64,158,255,.2);
  transition: all .2s ease-in-out;
}
.vc-radio.is-border.is-disabled {
  border-color: #ebeef5;
}
.vc-radio.is-button.is-border {
  padding: 0.5em 0.9em 0.5em 0.75em;
}
.vc-radio.is-button.is-border.is-checked.is-disabled {
  background-color: #f2f6fc;
  box-shadow: -1px 0 0 0 #f2f6fc;
}
.vc-radio.is-button {
  margin-right: 0;
  border-radius: 0;
  border-left-color: transparent;
}
.vc-radio.is-button .vc-radio__label {
  padding-left: 0;
}
.vc-radio.is-checked {
  color: #409eff;
  border-color: #409eff;
}
.vc-radio.is-button:nth-child(1) {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-left-color: #dcdfe6;
}
.vc-radio.is-button.is-checked {
  color: #fff;
  background-color: #409eff;
  border-color: transparent;
  box-shadow: -1px 0 0 0 #409eff;
}
.vc-radio.is-button:last-child {
  margin-right: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.vc-radio:last-child {
  margin-right: 0;
}
.vc-radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}

.vc-radio__input.is-disabled + span.vc-radio__label {
  color: #c0c4cc;
  cursor: not-allowed;
}

.vc-radio__input.is-disabled .vc-radio__inner {
  cursor: not-allowed;
}

.vc-radio__input.is-disabled.is-checked .vc-radio__inner {
  background-color: #e4e7ed;
  border-color: #e4e7ed;
}

.vc-radio__inner {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
}

.vc-radio__inner:after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.15s ease-in;
}

.vc-radio__inner:hover {
  border-color: #409eff;
}

.vc-radio__input.is-checked .vc-radio__inner:after {
  transform: translate(-50%, -50%) scale(1);
}

.vc-radio.is-checked .vc-radio__inner {
  border-color: #409eff;
  background: #409eff;
}

.vc-radio.is-checked .is-focus {
  box-shadow: 0 0 0 2px rgba(64,158,255,.2);
}
.vc-radio.is-checked.is-labelFocus .is-focus {
  box-shadow: none;
}
.vc-radio__original {
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}

.vc-radio__label {
  font-size: 1em;
  padding-left: 10px;
}
</style>