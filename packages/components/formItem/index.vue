<template>
  <div 
    :class="[
      'vc-form-item', 
      { isColumn: flexDirection }
    ]"
  >
    <div class="vc-form-item__label">
      <label 
        :style="labelStyle"
      >{{ label }}</label>
    </div>
    <div class="vc-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VcFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    // 指定标题的宽度，支持'auto'
    labelWidth: String
  },
  computed: {
    labelStyle () {
      let width = this.labelWidth

      if (this.$parent && this.$parent.$options.name === 'VcForm') {
        width = this.$parent.labelWidth
      }

      return {
        width
      }
    },

    flexDirection () {
      return !this.labelStyle.width
    }
  }
}
</script>

<style lang="less">
.vc-form-item {
  display: flex;
  font-size: 14px;

  &.isColumn {
    flex-direction: column;
  }

  &__label {
    color: #666;
    line-height: 2em;

    label {
      padding-right: 5px;
    }
  }

  &__content {
    min-height: 2em;
  }
}
</style>