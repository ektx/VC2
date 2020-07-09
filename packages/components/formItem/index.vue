<template>
  <div 
    :class="[
      'vc-form-item', 
      { 
        'is-column': flexDirection,
        'is-required': isRequired
      }
    ]"
  >
    <Label :label="label" :labelWidth="labelWidth || vcForm.labelWidth"/>
    <div class="vc-form-item__content">
      <slot></slot>
      <transition name="vc-fade-in">
        <slot
          v-if="validateState === 'error'"
          name="error"
          :error="validateMessage"
        >
          <div class="vc-form-item__error">
            {{ validateMessage}}
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
  },
  computed: {
    flexDirection () {
      return !(this.labelWidth || this.vcForm.labelWidth)
    },

    isRequired () {
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
    }
  },
  data () {
    return {
      parentForm: null,
      validateState: '',
      validateMessage: '',
    }
  },
  mounted () {
    if (this.$parent.$options.name === 'VcForm') {
      this.parentForm = this.$parent
    }

    if (this.prop) {
      if (this.parentForm) {
        this.parentForm.fields.push( this )
      }
    }
  },
  updated () {
    console.log('updated')
  },
  methods: {
    validate (trigger, cb) {
      const rules = this.getRules()
      console.log(rules)

      const descriptor = {}
      if (rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[this.prop] = rules
      
      const validator = new AsyncValidator(descriptor)
      const model = {}

      model[this.prop] = this.parentForm.model[this.prop]

      validator.validate(model, { firstFields: true }, (err, fields) => {
        this.validateState = err ? 'error' : 'success'
        this.validateMessage = err ? err[0].message : ''

        cb(this.validateMessage)
      })
    },

    resetField() {
      this.validateState = ''
      this.validateMessage = ''

      if (this.prop) {
        let val = this.vcForm.defaultValue[this.prop] || ''
        this.vcForm.model[this.prop] = val
      }
    },

    getRules() {
      if (!this.prop) return []

      return this.vcForm.rules[this.prop] || []
    }
  }
}
</script>

<style lang="less">
.vc-form-item {
  display: flex;
  margin-bottom: 22px;
  font-size: 14px;

  &.is-column {
    flex-direction: column;
  }
  &.is-required {

    .vc-form-item__label:before {
      content: '*';
      color: #ff4d4f;
    }
  }

  &__label {
    color: #666;
    // line-height: 2em;

    label {
      padding-right: 5px;
    }
  }

  &__content {
    position: relative;
    flex: 1;
    min-height: 2em;
  }

  &__error {
    position: absolute;
    left: 0;
    font-size: 12px;
    color: #ff4d4f;
  }
}

.vc-fade-in-enter-active,
.vc-fade-in-leave-active {
  opacity: 1;
  transition: opacity .2s;
  transform-origin: center top;
}
.vc-fade-in-enter-from,
.vc-fade-in-leave-to {
  opacity: 0;
}
</style>