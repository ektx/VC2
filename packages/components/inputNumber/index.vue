<template>
  <div :class="['vc-input-number', {'is-disabled': disabled, 'is-clear': clearMode}]">
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
      autocomplete="off"
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
    // 绑定值
    modelValue: {
      type: Number,
      default: 0
    },
    // 设置计数器允许的最小值
    min: {
      type: Number,
      default: -Infinity
    },
    // 设置计数器允许的最大值
    max: {
      type: Number,
      default: Infinity
    },
    // 设置大小
    size: {
      type: String,
      default: '12px'
    },
    // 计数器步长
    step: {
      type: Number,
      default: 1
    },
    // 设置宽度
    width: {
      type: String,
      default: '8em'
    },
    // 数值精度
    precision: {
      type: Number,
      default: 0
    },
    // 是否禁用计数器
    disabled: Boolean,
    // 简洁模式
    clearMode: Boolean
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
