<template>
  <div
    :class="['el-switch',checked ? 'is-checked' : '',disabled ? 'is-disabled' : '']"
    @click="changeStyle()"
  >
    <input
      class="el-switch__input"
      :value="value"
      @input="changeInput"
      type="checkbox"
      ref="input"
      @change="handleChange"
    />

    <span
      :class="['el-switch__label', 'el-switch__label--left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText"
    >
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>

    <span  :class="['el-switch__core',disabled ? 'opc' : '']" ref="core" :style="{ 'width': coreWidth + 'px' }">
      <span>开始88</span>
      <slot name="close"></slot>
    </span>

    <span
      :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText"
    >
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
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

export default {
  name: "VcSwitch",
  props: {
    // 开关所绑定的值
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    // switch开关的长度
    width: {
      type: Number,
      default: 40
    },
    // switch 打开时的背景色
    activeColor: {
      type: String,
      default: "#409EFF"
    },
    // switch 关闭时的背景色
    inactiveColor: {
      type: String,
      default: "#C0CCDA"
    },
    // switch 打开时的值
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    // switch 关闭时的值
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    // switch 打开时所显示图标的类名，设置此项会忽略 active-text
    activeIconClass: {
      type: String,
      default: ""
    },
    // switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text
    inactiveIconClass: {
      type: String,
      default: ""
    },
    // switch 打开时的文字描述
    activeText: String,
    // switch 关闭时的文字描述
    inactiveText: String,
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
  },

  setup(props, context) {
    let coreWidth = ref("");
    let checked = ref("");

    const core = ref(null);

    const changeStyle = () => {
      console.log(props.disabled)
      if (props.disabled === false || props.disabled===undefined) {
        checked.value = !checked.value;
        setBackgroundColor();
        handleChange();
      }
    };

    const changeInput = event => {
      context.emit("update:value", event.target.value);
    };

    const handleChange = event => {
      const val = !checked.value ? props.inactiveValue : props.activeValue;
      context.emit("change", val);
    };

    const setBackgroundColor = () => {
      let newColor = checked.value ? props.activeColor : props.inactiveColor;
      core.value.style.borderColor = newColor;
      core.value.style.backgroundColor = newColor;
    };

    onMounted(() => {
      coreWidth.value = props.width;
      checked.value = props.value;
      setBackgroundColor();
    });

    return {
      coreWidth,
      checked,
      core,

      changeStyle,
      changeInput,
      handleChange
    };
  }
};
</script>

<style lang="less">
.el-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  //line-height: 20px;
  height: 20px;
  vertical-align: middle;
  box-sizing: border-box;

  .opc {
    opacity: 0.5;
  }

  .el-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    cursor: pointer;
    
    span {
      color: #fff;
      font-size: 12px;
      position: absolute;
      left: 7px;
      
      white-space:nowrap;
    }
    

    &::after {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }

  .el-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }

  .el-switch__label {
    transition: 0.2s;
    height: 20px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    vertical-align: middle;
    color: #303133;

    * {
      line-height: 1;
      font-size: 14px;
      display: inline-block;
    }
  }

  .is-active {
    color: #409eff;
  }

  .el-switch__label--right {
    margin-left: 10px;
  }

  .el-switch__label--left {
    margin-right: 10px;
  }
}

.is-checked {
  .el-switch__core {
    &::after {
      left: 100%;
      margin-left: -17px;
    }
  }
}

.el-switch.is-disabled .el-switch__core{
  cursor: not-allowed;
}

*, :after, :before {
    box-sizing: border-box;
}
</style>