<template>
  <div
    :class="['vc-switch',checked ? 'is-checked' : '',disabled ? 'is-disabled' : '']"
    @click="changeStyle()"
  >
    <input
      class="vc-switch__input"
      :value="value"
      @input="changeInput"
      type="checkbox"
      ref="input"
      @change="handleChange"
    />

    <span
      :class="['vc-switch__label', 'vc-switch__label-left', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText"
    >
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>

    <span v-if="loading" :class="['vc-icon-loading',loading ? 'is-loading' : '']"></span>

    <span
      :class="['vc-switch__core','',disabled ? 'opacity' : '','']"
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
      :class="['vc-switch__label', 'vc-switch__label-right', checked ? 'is-active' : '']"
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

    console.log(1111111111111111111111,props.value)


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

      let w = w3 > w2 ? w3 : w2;
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
.is-loading{
  position: absolute;
  left: 0.25em;
  z-index: 2;
}

.is-checked .is-loading{
  left: 100%;
      margin-left: -1.4em;
}

</style>
