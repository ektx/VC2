<template>
  <form :class="['vc-form', { inline }]">
    <slot/>
  </form>
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
    },
    // 行内表单模式
    inline: Boolean,
    // 表单域标签的位置，
    // @arguments left / right / top
    labelPosition: {
      type: String,
      default: 'right'
    },
    // 是否显示必填字段的标签旁边的红色星号
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
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

    /**
     * @Doc
     * @description 验证部分字段内容
     * @param props {string|array} 要验证的字段
     * @param cb {function} 回调函数
     */
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

    /**
     * @Doc
     * @description 移除表单项的校验结果。
     * @param props {array | string} 要清除验证的字段
     * @default -
     */
    clearValidate(props = []) {
      props = props.concat(props)

      if (props.length) {
        this.fields.forEach(field => {
          if (props.includes(field.prop)) {
            field.clearValidate()
          }
        })
      } else {
        this.fields.forEach(field => {
          field.clearValidate()
        })
      }
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
.vc-form {
  &.inline {
    display: flex;

    .vc-form-item {
      margin-right: 10px;
    }
  }
}
</style>