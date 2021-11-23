<template>
  <div class="vc-color-picker">
    <div
      ref="colorEl"
      :class="[
        'vc-color-picker__color',
        { 'is-round': round, 'is-empty': !value }
      ]"
      @click.stop="showDropdownEvt"
    >
      <span :style="colorStyle"></span>
    </div>
    <transition name="vc-zoom-in-top" @after-enter="afterEnterEvt">
      <DropDown v-show="isVisible" :format="format" :isOpened="isOpened" />
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch, provide, inject } from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropdown.vue'
import { formatString, hsv2rgb, toHex, hsv2hsl } from './color'
import store from './store'

export default {
  name: 'VcColorPicker',
  components: { DropDown },
  inject: ['vcFormItem'],
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
    // 延迟功能
    delay: {
      type: Number,
      default: 100
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
      alpha: this.myStore.alpha,
      Value: this.myStore.Value,
      isDrag: this.myStore.isDrag,
      isVisible: false,
      isOpened: false
    }
  },
  watch: {
    Value() {
      this.updateValue()
    },
    alpha() {
      this.updateValue()
    }
  },
  mounted() {
    this.formatHSV()
    window.addEventListener('click', this.hideDropdown, false)
  },
  unmounted() {
    window.removeEventListener('click', hideDropdown, true)
  },
  setup(props, { emit }) {
    const myStore = store(props)

    // const dropdown = ref(null)
    const isActive = ref(false)
    // const hsv = ref({ __: true })

    const colorStyle = computed(() => {
      let { red, green, blue, alpha } = myStore

      return {
        backgroundColor: `rgba(${red.value}, ${green.value}, ${blue.value}, ${alpha.value})`
      }
    })

    return {
      isActive,
      // hsv,
      myStore,
      colorStyle
    }
  },
  methods: {
    showDropdownEvt() {
      const dropdownEl = this.$el.querySelector('.vc-color-picker__drop-down')

      this.isVisible = !this.isVisible

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
      let { hsv, alpha: a } = formatString(this.modelValue)
      console.log(1, hsv, a)
      this.myStore.Hue.value = hsv.h
      this.myStore.Saturation.value = hsv.s
      this.myStore.Value.value = hsv.v
      this.alpha = a
    },

    hideDropdown() {
      if (this.isDrag) {
        this.isDrag = false
      } else {
        if (this.isVisible) {
          this.isVisible = false
          if (this.vcFormItem) this.vcFormItem.checkValidate('blur')
        }
      }
    },

    afterEnterEvt() {
      this.isOpened = true
    },

    updateValue() {
      let result = ''
      let h = this.myStore.Hue.value
      let s = this.myStore.Saturation.value
      let v = this.Value

      if (h !== undefined) {
        switch (this.format) {
          case 'hex': {
            let rgb = hsv2rgb(h, s, v)
            result = toHex(rgb)
            break
          }
          case 'rgb': {
            let { r, g, b } = hsv2rgb(h, s, v)

            if (this.alpha === 1) {
              result = `rgb(${r}, ${g}, ${b})`
            } else {
              result = `rgba(${r}, ${g}, ${b}, ${this.alpha})`
            }
            break
          }
          case 'hsl': {
            let { h: _h, s: _s, l } = hsv2hsl(h, s, v)
            if (this.alpha === 1) result = `hsl(${_h}, ${_s}, ${l})`
            else result = `hsla(${_h}, ${_s}, ${l}, ${this.alpha})`
            break
          }
          case 'hsv': {
            if (this.alpha === 1) result = `hsv(${h}, ${s}, ${v})`
            else result = `hsva(${h}, ${s}, ${v}, ${this.alpha})`
          }
        }
      }

      this.$emit('update:modelValue', result)
      this.$emit('change', result)

      if (this.vcFormItem) this.vcFormItem.checkValidate('change')
    }
  }
}
</script>
