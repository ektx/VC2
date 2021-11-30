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
import { formatString } from './color'

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
      // Value: this.myStore.Value,
      // isDrag: this.myStore.isDrag,
      // currentColor: this.myStore.currentColor,
      isVisible: false,
      isOpened: false
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

    updateVal({ h = this.H, s = this.S, v = this.V, a = this.A }) {
      console.log('update:model', h, s, v, a)
    }
  }
}
</script>
