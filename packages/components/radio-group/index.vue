<template>
  <div class="vc-radio-group" role="radiogroup">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VcRadioGroup",
  componentName: 'VcRadioGroup',
  props: {
    value: {

    },
    size: String,
    fill: String,
    textColor: String,
    disabled: {
      type: Boolean,
      default: false
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