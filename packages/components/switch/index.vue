<template>
  <div
    :class="['vc-switch',
      { 
        'is-checked': checked,
        'is-disabled': disabled 
      }
    ]"
    @click="changeStyle"
  >
    <div
      :class="['vc-switch__label vc-switch__label-left', {'is-active': !checked}]"
      v-if="!inset && (inactiveIcon || inactiveText)"
    >
      <i :class="inactiveIcon" v-if="inactiveIcon"></i>
      <span v-if="inactiveText">{{ inactiveText }}</span>
    </div>

    <span v-if="loading" :class="['vc-icon-loading',loading ? 'is-loading' : '']"></span>

    <div
      :class="['vc-switch__core','',disabled ? 'opacity' : '','']"
      ref="core"
      :style="coreStyle"
    >
      <Inset v-if="inset" type="open" :icon="activeIcon" :text="activeText"/>

      <Inset v-if="inset" type="close" :icon="inactiveIcon" :text="inactiveText"/>
    </div>

    <span
      :class="['vc-switch__label', 'vc-switch__label-right', {'is-active': checked}]"
      v-if="!inset && (activeIcon || activeText)"
    >
      <i :class="activeIcon" v-if="activeIcon"></i>
      <span v-if="activeText">{{ activeText }}</span>
    </span>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  computed
} from "vue"
import Inset from './inset.vue'

export default {
  name: "VcSwitch",
  components: { Inset },
  props: {
    // 开关所绑定的值
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    // switch开关的长度
    width: {
      type: Number,
      default: 0
    },
    // switch 打开时的背景色
    activeColor: {
      type: String,
      default: ""
    },
    // switch 关闭时的背景色
    inactiveColor: {
      type: String,
      default: ""
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
    activeIcon: {
      type: String,
      default: ""
    },
    // 关闭时所显示图标的类名
    inactiveIcon: {
      type: String,
      default: ""
    },
    // 内部图标文字
    inset: {
      type: Boolean,
      default: false
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

  setup(props, { emit }) {
    let checked = ref("");
    const coreStyleObj = ref({})

    const coreStyle = computed(() => {
      let { width } = coreStyleObj.value

      if (props.width) {
        width = props.width
      }

      let color = checked.value ? props.activeColor : props.inactiveColor

      return {
        width: width + 'px',
        fontSize: props.r + 'px',
        height: props.r + 'px',
        color
      }
    })


    const changeStyle = () => {
      if (props.disabled) return

      checked.value = !checked.value;
      const val = checked.value ? props.activeValue : props.inactiveValue

      emit('change', val)
      emit('update:value', val)
    }

    onMounted(() => {
      checked.value = props.value
    })

    return {
      checked,
      coreStyle,
      coreStyleObj,
      changeStyle,
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
