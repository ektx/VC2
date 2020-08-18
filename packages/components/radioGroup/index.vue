<template>
  <div class="vc-radio-group" role="radiogroup">
    <slot></slot>
  </div>
</template>

<script>
import { watch } from 'vue';
export default {
  name: "VcRadioGroup",
  componentName: 'VcRadioGroup',
  props: {
    value: {},
    size: String,
    fill: String,
    textColor: String,
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'radio'
    },
    size: {
      type: Number,
      default: 14
    },
    textColor: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    }
  },

  setup(props, context) {
    return {
    }
  }
};
</script>

<style lang="less">
</style>