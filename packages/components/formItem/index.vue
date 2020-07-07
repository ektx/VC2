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
import AsyncValidator from 'async-validator'

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
  data () {
    return {
      parentForm: null,
      validateState: '',
      validateMessage: ''
    }
  },
  mounted () {
    this.updateLabelWidth()
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
    updateLabelWidth () {
      if (!this.flexDirection) {
        let label = this.$el.querySelector('.vc-form-item__label')
        let labelStyleWidth = window.getComputedStyle(label).width
        let labelWidth = Math.ceil(parseFloat(labelStyleWidth))

        if (labelWidth > this.$parent.autoLabelWidth) {
          this.$parent.autoLabelWidth = labelWidth
        }
      }
    },

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

    getRules() {
      let formRules = this.parentForm.rules

      return formRules ? formRules[this.prop] : []
    }
  }
}
</script>

<style lang="less">
.vc-form-item {
  display: flex;
  margin-bottom: 22px;
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