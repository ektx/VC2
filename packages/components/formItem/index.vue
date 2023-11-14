<template>
  <div
    :class="[
      'vc-form-item',
      {
        'is-column': isColumn,
        'is-required': isRequired,
        'is-error': validateState === 'error'
      }
    ]"
    :style="style"
  >
    <Label :label="label" :labelWidth="labelWidth || vcForm.labelWidth"></Label>

    <div class="vc-form-item__content">
      <slot></slot>
      <transition name="vc-fade-in">
        <slot
          v-if="validateState === 'error'"
          name="error"
          :error="validateMessage"
        >
          <div class="vc-form-item__error">
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script>
import Label from './label.vue'
import AsyncValidator from 'async-validator'

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
    gridRow: String
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
      let obj = {}

      if (this.gridColumn) {
        obj.gridColumn = this.gridColumn
      }

      return obj
    }
  },
  data() {
    return {
      parentForm: null,
      validateState: '',
      validateMessage: ''
    }
  },
  mounted() {
    if (this.$parent.$options.name === 'VcForm') {
      this.parentForm = this.$parent
    }

    if (this.prop) {
      if (this.parentForm) {
        this.parentForm.fields.push(this)
      }
    }
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
        this.validateState = err ? 'error' : 'success'
        this.validateMessage = err ? err[0].message : ''

        cb && cb(err)
      })
    },

    resetField() {
      this.clearValidate()

      if (this.prop) {
        let val = Reflect.has(this.vcForm.defaultValue, this.prop)
          ? this.vcForm.defaultValue[this.prop]
          : ''

        this.vcForm.model[this.prop] = val
      }
    },

    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
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
