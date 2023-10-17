<template>
  <div
    :class="[
      'vc-form-item__label',
      `text-align-${vcForm.labelPosition}`,
      {
        'is-no-asterisk': vcForm.hideRequiredAsterisk
      }
    ]"
    :style="labelStyle"
  >
    <label v-if="label">{{ label }}</label>
    <span
      v-if="vcForm.labelSuffix && label"
      class="vc-form-item__label-suffix"
      >{{ vcForm.labelSuffix }}</span
    >
  </div>
</template>

<script>
export default {
  inject: ['vcForm'],
  props: {
    // 标题
    label: {
      type: String,
      default: ''
    },
    // 指定标题的宽度，支持'auto'
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
  computed: {
    labelStyle() {
      let result = {}

      if (this.vcForm) {
        result.width = this.vcForm.labelWidth
      } else {
        result.width = this.labelWidth
      }

      return result
    }
  },
  data() {
    return {
      _labelWidth: 0
    }
  }
}
</script>
