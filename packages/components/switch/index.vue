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
      :class="['el-switch__label', 'el-switch__label-left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText"
    >
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>

    <span
      :class="['el-switch__core',disabled ? 'opacity' : '',loading ? 'is-loading' : '']"
      ref="core"
      :style="{width: coreWidth + 'px', fontSize: r + 'px', height: (r+4) + 'px', borderRadius: r + 'px',}"
      id="core"
    >
      <span
        v-if="activeTextInside && !activeIconClassInside"
        class="vc-switch__core-open"
        v-show="checked"
      >{{activeTextInside}}</span>
      <span
        v-if="checked && activeIconClassInside"
        style="top: 0.3em"
        :class="['vc-switch__core-open',activeIconClassInside]"
      ></span>

      <span
        v-if="inactiveTextInside && !inactiveIconClassInside"
        class="vc-switch__core-close"
        v-show="!checked"
      >{{inactiveTextInside}}</span>

      <span
        v-if="!checked && inactiveIconClassInside"
        style="top: 0.3em"
        :class="['vc-switch__core-close',inactiveIconClassInside]"
      ></span>

      <span
        style="top: 0.32em;visibility:hidden;"
        :class="['vc-switch__core-open',activeIconClassInside]"
        ref="textOpenIconWidth"
      ></span>
      <span
        style="top: 0.32em;visibility:hidden;"
        :class="['vc-switch__core-close',inactiveIconClassInside]"
        ref="textCloseIconWidth"
      ></span>
      <span
        ref="textOpenWidth"
        style="visibility:hidden;box-sizing: border-box"
      >{{activeTextInside}}</span>
      <span
        ref="textCloseWidth"
        :class="!inactiveTextInside ? 'inactiveTextInside' : ''"
        style="visibility:hidden;"
      >{{inactiveTextInside}}</span>
    </span>

    <span
      :class="['el-switch__label', 'el-switch__label-right', checked ? 'is-active' : '']"
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
      type: [Number, String],
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

    // switch 打开时所显示图标的类名，设置此项会忽略 active-text-inside
    activeIconClassInside: {
      type: String,
      default: ""
    },
    // switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text
    inactiveIconClass: {
      type: String,
      default: ""
    },
    // switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text（内部圖標）
    inactiveIconClassInside: {
      type: String,
      default: ""
    },
    // switch 打开时的文字描述
    activeText: String,

    activeTextInside: {
      type: String,
      default: ""
    },
    // switch 关闭时的文字描述
    inactiveText: String,

    inactiveTextInside: {
      type: String,
      default: ""
    },

    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 圓圈半徑
    r: {
      type: Number,
      default: 20
    },
    // 是否顯示加載動畫
    loading: {
      type: Boolean,
      default: false
    }
  },

  setup(props, context) {
    let coreWidth = ref("");
    let checked = ref("");

    const core = ref(null);
    const textOpenWidth = ref(null);
    const textCloseWidth = ref(null);
    const textOpenIconWidth = ref(null);
    const textCloseIconWidth = ref(null);

    const changeStyle = () => {
      if (props.disabled === false || props.disabled === undefined) {
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

    const calcWidth = () => {
      let w3 =
        textCloseWidth.value.clientWidth > textOpenWidth.value.clientWidth
          ? textCloseWidth.value.clientWidth
          : textOpenWidth.value.clientWidth;

      let w2 =
        textOpenIconWidth.value.clientHeight >
        textCloseIconWidth.value.clientHeight
          ? textOpenIconWidth.value.clientHeight
          : textCloseIconWidth.value.clientHeight;
      console.log(222, textOpenIconWidth);

      let w = w3 > w2 ? w3 : w2;
      console.log(props.r, w3, w2);
      coreWidth.value = props.r + w + 15;
    };

    onMounted(() => {
      coreWidth.value = props.width;
      checked.value = props.value;
      setBackgroundColor();
      if (props.width !== 40) {
        return;
      } else if (
        props.inactiveTextInside === "" &&
        props.activeTextInside === "" &&
        props.activeIconClassInside == "" &&
        props.inactiveIconClassInside == ""
      ) {
      } else {
        calcWidth();
      }
    });

    onUpdated(() => {});

    return {
      coreWidth,
      checked,

      core,
      textOpenWidth,
      textCloseWidth,
      textOpenIconWidth,
      textCloseIconWidth,

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
  height: 20px;
  vertical-align: middle;
  box-sizing: border-box;
}

.el-switch__core {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  box-sizing: border-box;
  background: #dcdfe6;
  transition: border-color 0.3s, background-color 0.3s;
  vertical-align: middle;
  cursor: pointer;

  span {
    color: #fff;
    font-size: 0.7em;
    position: absolute;
    white-space: nowrap;
  }

  &::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 100%;
    transition: all 0.3s;
    width: 1em;
    height: 1em;
    background-color: #fff;
  }
}
.el-switch__label.is-active {
  color: #409eff;
}

.el-switch__label-right {
  margin-left: 10px;
}

.el-switch__label-left {
  margin-right: 10px;
}

.vc-switch__core-open {
  left: 7px;
}

.vc-switch__core-close {
  right: 7px;
}

.el-switch__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}
.el-switch__core.opacity {
  opacity: 0.5;
}

.el-switch__core.is-loading {
  font-size: 1em;
}

.el-switch__core.is-loading::before {
  content: "";
  display: block;
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: transparent;
  position: absolute;
  left: 2px;
  top: 3px;
  z-index: 1;
  border: 1px solid #2d8cf0;
  border-color: transparent transparent transparent #2d8cf0;
  -webkit-animation: switch-loading 1s linear;
  animation: switch-loading 1s linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
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

.is-checked {
  .el-switch__core {
    &::after {
      left: 100%;
      margin-left: -1.1em;
    }
  }
  .is-loading {
    &::before {
      left: 100%;
      margin-left: -1em;
    }
  }
}

.el-switch.is-disabled .el-switch__core {
  cursor: not-allowed;
}

*,
:after,
:before {
  box-sizing: border-box;
}

@keyframes switch-loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>