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
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset
} from '@floating-ui/dom'
import DropDown from './dropdown.vue'
import { formatString, hsv2rgb, toHex, hsv2hsl } from './color'

export default {
  name: 'VcColorPicker',
  components: { DropDown },
  inject: {
    vcFormItem: {
      default: null
    }
  },
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
      vcColorPicker: this
    }
  },
  data() {
    return {
      H: 0,
      S: 0,
      V: 0,
      A: 0,
      isEmpty: false,
      isVisible: false,
      isOpened: false
    }
  },
  computed: {
    currentColor() {
      if (this.modelValue) {
        let { r, g, b } = hsv2rgb(this.H, this.S, this.V)

        return {
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${this.A})`
        }
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.formatHSV()
    window.addEventListener('click', this.hideDropdown)
  },
  unmounted() {
    window.removeEventListener('click', this.hideDropdown)
  },
  methods: {
    showDropdownEvt() {
      const dropdownEl = this.$el.querySelector('.vc-color-picker__drop-down')

      this.isVisible = !this.isVisible

      autoUpdate(this.$refs.colorEl, dropdownEl, () => {
        computePosition(this.$refs.colorEl, dropdownEl, {
          placement: 'bottom',
          strategy: 'fixed',
          middleware: [offset(6), flip(), shift({ padding: 5 })]
        }).then(({ x, y }) => {
          Object.assign(dropdownEl.style, {
            left: `${x}px`,
            top: `${y}px`
          })
        })
      })
    },

    formatHSV() {
      if (this.modelValue) {
        let { hsv, alpha } = formatString(this.modelValue)

        this.H = hsv.h
        this.S = hsv.s
        this.V = hsv.v
        this.A = alpha
        this.isEmpty = false
      } else {
        this.isEmpty = true
      }
    },

    hideDropdown(e) {
      if (this.$el.contains(e.target)) return

      this.isVisible = false
    },

    afterEnterEvt() {
      this.isOpened = true
    },

    updateVal({ type, value, hsv }) {
      let result = ''

      console.log('update:model', type, hsv, value)

      this.H = Reflect.has(hsv, 'h') ? hsv.h : this.H
      this.S = Reflect.has(hsv, 's') ? hsv.s : this.S
      this.V = Reflect.has(hsv, 'v') ? hsv.v : this.V
      this.A = Reflect.has(hsv, 'a') ? hsv.a : this.A

      if (this.isEmpty) {
        this.A = 1
        this.isEmpty = false
      }

      if (type === this.format) {
        result = value
      } else {
        switch (this.format) {
          case 'hex': {
            let { r, g, b } = hsv2rgb(this.H, this.S, this.V)
            result = toHex({ r, g, b })
            break
          }
          case 'rgb': {
            let { r, g, b } = hsv2rgb(this.H, this.S, this.V)
            let start = +this.A === 1 ? 'rgb' : 'rgba'
            let end = +this.A === 1 ? ')' : `, ${this.A})`

            result = `${start}(${r}, ${g}, ${b}${end}`
            break
          }
          case 'hsl': {
            let { h, s, l } = hsv2hsl(this.H, this.S, this.V)
            let start = +this.A === 1 ? 'hsl' : 'hsla'
            let end = +this.A === 1 ? ')' : `, ${this.A})`

            result = `${start}(${h}, ${s}%, ${l}%${end}`
            break
          }
          case 'hsv': {
            let start = +this.A === 1 ? 'hsv' : 'hsva'
            let end = +this.A === 1 ? ')' : `, ${this.A})`

            result = `${start}(${this.H},${this.S},${this.V}${end}`
            break
          }
        }
      }

      if (this.vcFormItem) this.vcFormItem.checkValidate('change')

      this.$emit('update:modelValue', result)
    }
  }
}
</script>
