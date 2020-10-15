<template>
  <div :class="['vc-input-number', {'is-disabled': disabled}]">
    <button 
      class="vc-input-number__decrease" 
      :disabled="isDecrease"
      @click.prevent="setValue(-1)"
    >
      <i class="vc-icon-minus"></i>
    </button>
    <button 
      class="vc-input-number__increase" 
      :disabled="isIncrease"
      @click.prevent="setValue(1)"
    >
      <i class="vc-icon-plus"></i>
    </button>
    <input 
      type="text" 
      class="vc-input-number__input"
      :disabled="disabled"
      :readonly="disabled"
      :min="min"
      :max="max"
      :style="inputStyle"
      :value="intValue"
      @blur="blurEvt"
    >
  </div>
</template>

<script>
export default {
  name: 'VcInputNumber',
  inject: {
    vcFormItem: {
      default: null
    }
  },
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    size: {
      type: String,
      default: '12px'
    },
    step: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '8em'
    },
    precision: {
      type: Number,
      default: 0
    },
    disabled: Boolean
  },
  computed: {
    inputStyle () {
      return {
        fontSize: this.size,
        width: this.width
      }
    },
    intValue: {
      get() {
        let result = this.modelValue

        if (this.precision > 0) {
          result = result.toFixed(this.precision)

          let [int, float] = result.split('.')

          if (float.length < this.precision) {
            float = float.padEnd(this.precision, '0')
          }

          result = `${int}.${float}`
        }

        return result
      },
      set(val) {
        val = Number(val)
        this.$emit('update:modelValue', val)
        this.$emit('change', val)
      }
    },
    isDecrease() {
      return this.intValue <= this.min
    },
    isIncrease() {
      return this.intValue >= this.max
    }
  },
  methods: {
    setValue(val) {
      if (this.disabled) return

      let result = Number(this.intValue) + (val * this.step)
      
      if (result < this.min) return
      if (result > this.max) return

      this.intValue = result.toFixed(this.precision)
      this.vcFormItem && this.vcFormItem.checkValidate('change')
    },

    blurEvt(evt) {
      let { value } = evt.target

      if (isNaN(value)) {
        evt.target.value = this.intValue
      } else {
        let [int, float] = value.split('.')

        if (this.precision > 0) {
          value = Number(value).toFixed(this.precision)
        }

        this.intValue = value
      }
    }
  }
}
</script>

<style lang="less">
.vc-input-number {
  display: inline-block;
  position: relative;

  &__input {
    appearance: none;
    display: block;
    width: 8em;
    line-height: 2;
    text-align: center;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    outline: none;
    transition: border-color .3s;

    &::-webkit-outer-spin-button, 
    &::-webkit-inner-spin-button {
      appearance: none;
    }

    &:focus {
      border-color: #409eff;
    }
  }

  &:hover {
    .vc-input-number__input {
      border-color: #409eff;
    }
  }

  button {
    position: absolute;
    top: 1px;
    bottom: 1px;
    width: 2em;
    font-size: 12px;
    color: #666;
    border: none;
    outline: none;
    background-color: #f5f7fa;
    cursor: pointer;

    &.vc-input-number__decrease {
      left: 1px;
      border-right: 1px solid #dcdfe6;
      border-radius: 3px 0 0 3px;
    }

    &.vc-input-number__increase {
      right: 1px;
      border-left: 1px solid #dcdfe6;
      border-radius: 0 3px 3px 0;
    }

    &:hover {
      color: #409eff;
    }

    &[disabled] {
      color: #aaa;
      cursor: not-allowed;
    }
  }

  &.is-disabled {
    cursor: not-allowed;

    .vc-input-number__input {
      pointer-events: none;
      color: #aaa;
      background: #f5f7fa;
      border-color: #dcdfe6;
    }

    button {
      pointer-events: none;
      color: #aaa;
    }
  }
}
</style>