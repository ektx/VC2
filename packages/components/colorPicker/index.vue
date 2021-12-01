<template>
  <div class="vc-color-picker">
    <div
      ref="colorEl"
      :class="[
        'vc-color-picker__color',
        { 'is-round': round, 'is-empty': !modelValue }
      ]"
      @click="showDropdownEvt"
    >
      <span :style="currentColor"></span>
    </div>
    <transition name="vc-zoom-in-top" @after-enter="afterEnterEvt">
      <DropDown
        v-show="isVisible"
        :format="format"
        :isOpened="isOpened"
        :H="H"
        :S="S"
        :V="V"
      />
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropdown.vue'
import { formatString, hex2rgb, hsv2rgb, toHex } from './color'

export default {
  name: 'VcColorPicker',
  components: { DropDown },
  // inject: ['vcFormItem'],
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    // 写入 v-model 的颜色的格式
    // @argumenst hsl / hsv / hex / rgb
    format: {
      type: String,
      default: 'hex'
    },
    // 圆形效果
    round: Boolean
  },
  provide() {
    return {
      vcColorPicker: this,
      store: this.myStore
    }
  },
  data() {
    return {
      H: 0,
      S: 0,
      V: 0,
      A: 0,
      hex: '',
      R: 0,
      G: 0,
      B: 0,
      // Value: this.myStore.Value,
      // isDrag: this.myStore.isDrag,
      // currentColor: '',
      isVisible: false,
      isOpened: false
    }
  },
  computed: {
    currentColor() {
      return {
        backgroundColor: `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`
      }
    }
  },
  mounted() {
    this.formatHSV()
    window.addEventListener('click', this.hideDropdown, false)
  },
  unmounted() {
    window.removeEventListener('click', this.hideDropdown, true)
  },
  methods: {
    showDropdownEvt() {
      const dropdownEl = this.$el.querySelector('.vc-color-picker__drop-down')

      this.isVisible = !this.isVisible
      this.isActive = true

      if (this.isVisible) {
        this.dropdown = createPopper(this.$refs.colorEl, dropdownEl, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 5]
              }
            },
            {
              name: 'computeStyles',
              options: {
                adaptive: false,
                gpuAcceleration: false
              }
            }
          ],
          strategy: 'fixed'
        })
      } else {
        this.hideDropdown()
      }
    },

    formatHSV() {
      if (this.modelValue) {
        let { hsv, alpha } = formatString(this.modelValue)
        // this.myStore.isDrag.value = true
        // this.myStore.Hue.value = hsv.h
        // this.myStore.Saturation.value = hsv.s
        // this.myStore.Value.value = hsv.v
        // this.myStore.alpha.value = alpha
        this.H = hsv.h
        this.S = hsv.s
        this.V = hsv.v
        this.A = alpha
      }
    },

    hideDropdown() {
      if (this.isActive) {
        this.isActive = false
        return
      }

      if (this.isDrag) {
        this.isDrag = false
      } else {
        if (this.isVisible) {
          this.isVisible = false
          // if (this.vcFormItem) this.vcFormItem.checkValidate('blur')
        }
      }
    },

    afterEnterEvt() {
      this.isOpened = true
    },

    updateVal({ type, value }) {
      let result = ''
      let h = this.H
      let s = this.S
      let v = this.V
      let a = this.A

      console.log('update:model', type, value)
      switch (type) {
        case 'plane': {
          s = value.s
          v = value.v
          break
        }
        // case 'hex': {
        //   this.hex = value
        //   break
        // }
      }

      switch (this.format) {
        case 'hex': {
          if (type === 'plane') {
            ;({ r: this.R, g: this.G, b: this.B } = hsv2rgb(h, s, v))
            result = toHex({ r: this.R, g: this.G, b: this.B })
            this.hex = result
          } else {
            let color = hex2rgb(value)
            if (color) {
              ;({ r: this.R, g: this.G, b: this.B } = color)
            }
            this.hex = value
            result = value
          }
          break
        }
      }

      this.$emit('update:modelValue', result)
    }
  }
}
</script>
