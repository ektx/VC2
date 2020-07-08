<template>
  <div class="vc-form-item__label" :style="labelStyle">
    <label v-if="label">{{ label }}</label>
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
  watch: {
    _labelWidth(val) {
      if (val) {
        let w = val
        if (typeof val === 'number') {
          w += 'px'
        }
        this.labelStyle.width = w
      } else {
        delete this.labelStyle.width
        this.isAutoFrom = 'watch'
      }
    },
  },
  data() {
    return {
      _labelWidth: 0,
      labelStyle: {},
      isAutoFrom: ''
    }
  },
  mounted() {
    this.updateLabelWidth()
  },
  updated() {
    // debugger
    // console.log('updated label', this.label)
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

<style>

</style>