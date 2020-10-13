<template>
  <div :class="[
    'vc-form-item__label', 
    `text-align-${vcForm.labelPosition}`,
    {
      'is-no-asterisk': vcForm.hideRequiredAsterisk
    }
  ]" :style="labelStyle">
    <label v-if="label">{{ label }}</label>
    <span 
      v-if="vcForm.labelSuffix && label" 
      class="vc-form-item__label-suffix"
    >{{ vcForm.labelSuffix }}</span>
  </div>
</template>

<script>
export default {
  inject: ['vcForm'],
  props: {
    label: {
      type: String,
      default: ''
    },
    // 指定标题的宽度，支持'auto'
    labelWidth: String,
  },
  computed: {
    labelStyle() {
      let result = {}

      if (this._labelWidth) {
        let width = this._labelWidth
        if (!isNaN(this._labelWidth)) {
          width += 'px'
        }
        result.width = width
      } else {
        this.isAutoFrom = 'watch'
      }

      return result
    }
  },
  data() {
    return {
      _labelWidth: 0,
      isAutoFrom: ''
    }
  },
  mounted() {
    this.updateLabelWidth()
  },
  updated() {
    if (this.isAutoFrom === 'watch') {
      this.updateLabelWidth()
      this.isAutoFrom = 'update'
    } 
    else if (this.isAutoFrom === '') {
      this._labelWidth = 0
    }
  },
  methods: {
    updateLabelWidth () {
      if (this.labelWidth === 'auto') {
        let labelStyleWidth = window.getComputedStyle(this.$el).width
        let W = Math.ceil(parseFloat(labelStyleWidth))
  
        if (W > this.vcForm.autoLabelWidth) {
          this.vcForm.autoLabelWidth = W
          this._labelWidth = W
        } else {
          this._labelWidth = this.vcForm.autoLabelWidth
        }
      } else {
        this._labelWidth = this.labelWidth
      }
    },
  }
}
</script>
