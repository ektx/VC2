<template>
  <div
    :class="['vc-switch',
      { 
        'is-checked': checked,
        'is-disabled': disabled || loading
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

    <div
      class="vc-switch__core"
      :style="coreStyle"
    >
      <Inset v-if="inset" type="open" :icon="activeIcon" :text="activeText"/>

      <Inset v-if="inset" type="close" :icon="inactiveIcon" :text="inactiveText"/>

      <span v-if="loading" class="vc-icon-loading"></span>

      <i class="vc-switch__core-dot">{{btnText}}</i>
    </div>

    <span
      :class="['vc-switch__label vc-switch__label-right', {'is-active': checked}]"
      v-if="!inset && (activeIcon || activeText)"
    >
      <i :class="activeIcon" v-if="activeIcon"></i>
      <span v-if="activeText">{{ activeText }}</span>
    </span>

  </div>
</template>

<script>
import { ref, computed, inject, watch } from "vue"
import Inset from './inset.vue'

export default {
  name: "VcSwitch",
  components: { Inset },
  props: {
    // 开关所绑定的值
    value: {
      type: [String, Number, Boolean],
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
    // switch 打开时所显示图标的类名
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
      default: 16
    },
    // 是否顯示加載動畫
    loading: {
      type: Boolean,
      default: false
    },
    // 按钮文字
    btnText: String
  },

  setup(props, { emit }) {
    let checked = ref(props.value === props.activeValue)
    const coreStyleObj = ref({})
    const vcFormItem = inject('vcFormItem', null)

    watch(
      () => props.value,
      (val) => checked.value = val
    )

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
      if (props.disabled || props.loading) return

      checked.value = !checked.value
      const val = checked.value ? props.activeValue : props.inactiveValue

      emit('change', val)
      emit('update:value', val)
      vcFormItem && vcFormItem.checkValidate('change')
    }

    return {
      checked,
      coreStyle,
      coreStyleObj,
      changeStyle,
    };
  }
};
</script>

