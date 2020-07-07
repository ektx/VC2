<template>
  <section class="vc-form">
    <slot/>
  </section>
</template>

<script>
export default {
  name: 'VcForm',
  props: {
    // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。
    // 支持 auto。
    labelWidth: String,
    // 数据
    model: Object,
    // 规则
    rules: Object,
  },
  data () {
    return {
      autoLabelWidth: 0,
      fields: []
    }
  },
  methods: {
    validate (cb) {
      let result = true
      let count = 0
      if (!this.model) {
        console.warn('[VC2 Warn][Form]model is required for validate to work!')
        return
      }
      console.log(this)
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && cb) cb(result)

      this.fields.forEach(field => {
        field.validate('', (message, field) => {
          if (message) result = false

          if (++count === this.fields.length) {
            cb && cb(result)
          }
        })
      })
    }
  }
}
</script>

<style lang="less">

</style>