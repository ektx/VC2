<template>
  <div
    :class="[
      'vc-form-item',
      validateState,
      validateStatus ? 'is-' + validateStatus : '',
      {
        'is-column': isColumn,
        'is-required': isRequired
      }
    ]"
    :style="style"
  >
    <Label :label="label"></Label>

    <div class="vc-form-item__content">
      <slot :status="validateStatus"></slot>
      <div ref="errRef" class="vc-form-item__info">
        <slot name="error" :error="validateMessage">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Label from './label.vue'
import AsyncValidator from 'async-validator'
import { getValueOfPath, setValueOfPath } from '../../utils'

export default {
  name: 'VcFormItem',
  inject: ['vcForm'],
  provide() {
    return {
      vcFormItem: this
    }
  },
  components: { Label },
  props: {
    // 标题
    label: {
      type: String,
      default: ''
    },
    // 指定标题的宽度，支持'auto'
    labelWidth: String,
    prop: String,
    inline: Boolean,
    gridColumn: String,
    gridRow: String,
    /** 设置提示文案 */
    help: {
      type: String,
      default: ''
    },
    /** 校验状态 */
    validateStatus: {
      type: String,
      default: '',
      validator: val => {
        return ['', 'error', 'success'].includes(val)
      }
    }
  },
  watch: {
    async validateMessage(val) {
      await this.$nextTick()

      if (val) {
        let h = this.$refs.errRef.scrollHeight

        Object.assign(this.$refs.errRef.style, {
          height: h + 'px',
          transform: `translateY(0%)`
        })
      } else {
        this.$refs.errRef.style = null
      }
    }
  },
  computed: {
    isColumn() {
      return this.vcForm.labelPosition === 'top'
    },

    isRequired() {
      let rules = this.getRules()
      let result = false

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            result = true
            return false
          }
          return true
        })
      }
      return result
    },

    style() {
      let obj = {
        '--labelWidth': this.labelWidth
      }

      if (this.gridColumn) {
        obj.gridColumn = this.gridColumn
      }

      return obj
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: ''
    }
  },
  mounted() {
    if (this.prop && this.vcForm && this.vcForm.fields) {
      this.vcForm.fields.push(this)
    }

    if (this.help) this.validateMessage = this.help
  },
  methods: {
    validate(trigger, cb) {
      const rules = this.getRules()
      const descriptor = {}

      descriptor[this.prop] = []

      if (rules.length > 0) {
        rules.forEach(rule => {
          if (trigger) {
            if (rule.trigger && rule.trigger.includes(trigger))
              descriptor[this.prop].push(rule)
          } else {
            descriptor[this.prop].push(rule)
          }
        })
      }

      if (!descriptor[this.prop].length) return

      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.vcForm.model[this.prop]

      validator.validate(model, { firstFields: true }, err => {
        this.validateState = err ? 'is-error' : 'is-success'
        this.validateMessage = err ? err[0].message : ''

        cb && cb(err)
      })
    },

    resetField() {
      this.clearValidate()

      if (this.prop) {
        const val = getValueOfPath(this.vcForm.defaultValue, this.prop)

        setValueOfPath(this.vcForm.model, this.prop, val)
      }
    },

    clearValidate() {
      this.validateState = ''
      this.validateMessage = this.help || ''
    },

    getRules() {
      if (!this.prop) return []

      return this.vcForm.rules[this.prop] || []
    },
    // 子组件验证方法
    checkValidate(trigger) {
      this.$nextTick(() => {
        this.validate(trigger)
      })
    }
  }
}
</script>
