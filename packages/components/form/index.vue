<template>
  <section class="vc-form">
    <slot/>
  </section>
</template>

<script>
import merge from '../../utils/merge'

export default {
  name: 'VcForm',
  provide() {
    return {
      vcForm: this
    }
  },
  props: {
    // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。
    // 支持 auto。
    labelWidth: String,
    // 数据
    model: Object,
    // 规则
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      autoLabelWidth: 0,
      fields: [],
      defaultValue: {}
    }
  },
  mounted() {
    if (this.model) {
      this.defaultValue = merge({}, this.model)
    }
  },
  methods: {
    validate (cb) {
      this.validateArr(this.fields, cb)
    },

    resetFields() {
      if (!this.model) {
        console.warn('[VC Warn][Form]model is required for resetFields to work.');
        return;
      }
      this.fields.forEach(field => {
        field.resetField()
      })
    },

    // 验证部分字段内容
    validateField(props, cb) {
      let filters = []
      props = props.concat(props)

      this.fields.forEach(field => {
        if (props.includes(field.prop)) {
          filters.push(field)
        }
      })

      this.validateArr(filters, cb)
    },

    validateArr(arr, cb) {
      let result = true
      let count = 0
      if (!this.model) {
        console.warn('[VC2 Warn][Form]model is required for validate to work!')
        return
      }
      // 如果需要验证的arr为空，调用验证时立刻返回callback
      if (arr.length === 0 && cb) cb(result)

      arr.forEach(field => {
        field.validate('', (message, field) => {
          if (message) result = false

          if (++count === arr.length) {
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