<template>
  <div 
    :class="[
      'vc-form-item', 
      { isColumn: flexDirection }
    ]"
  >
    <div class="vc-form-item__label" :style="labelStyle">
      <label v-if="label">{{ label }}</label>
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
    // 标题
    label: {
      type: String,
      default: ''
    },
    // 指定标题的宽度，支持'auto'
    labelWidth: String,
    prop: String,
  },
  computed: {
    labelStyle () {
      let parent = this.$parent
      let width = this.labelWidth

      if (parent && parent.$options.name === 'VcForm') {
        width = parent.labelWidth

        if (width === 'auto' && parent.autoLabelWidth) {
          width = parent.autoLabelWidth + 'px'
        }
      }

      return {
        width
      }
    },

    flexDirection () {
      return !this.labelStyle.width
    }
  },
  watch: {
    labelWidth: {
      handler (val) {
        if (!val) {
          this.updateLabelWidth()
        }
      },
    }
  },
  mounted () {
    this.updateLabelWidth()
  },
  updated () {
    console.log('updated')
  },
  methods: {
    updateLabelWidth () {
      if (!this.flexDirection) {
        let label = this.$el.querySelector('.vc-form-item__label')
        let labelStyleWidth = window.getComputedStyle(label).width
        let labelWidth = Math.ceil(parseFloat(labelStyleWidth))

        if (labelWidth > this.$parent.autoLabelWidth) {
          this.$parent.autoLabelWidth = labelWidth
        }
      }
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
    // line-height: 2em;

    label {
      padding-right: 5px;
    }
  }

  &__content {
    min-height: 2em;
  }
}
</style>