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
      <span :style="colorStyle"></span>
    </div>
    <transition name="vc-zoom-in-top" @after-enter="afterEnterEvt">
      <DropDown v-show="isVisible" :format="format" :isOpened="isOpened" />
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropdown.vue'
import { formatString } from './color'
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
      Value: this.myStore.Value,
      isDrag: this.myStore.isDrag,
      isVisible: false,
      isOpened: false
    }
  },
  watch: {
    format(val) {
      this.myStore.format.value = val
    }
  },
  mounted() {
    this.formatHSV()
    window.addEventListener('click', this.hideDropdown, false)
  },
  unmounted() {
    window.removeEventListener('click', this.hideDropdown, true)
  },
  setup(props, { emit }) {
    const myStore = store(emit, props)
    myStore.format.value = props.format

    const isActive = ref(false)

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
      let { hsv, alpha } = formatString(this.modelValue)
      this.myStore.Hue.value = hsv.h
      this.myStore.Saturation.value = hsv.s
      this.myStore.Value.value = hsv.v
      this.myStore.alpha.value = alpha
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
          if (this.vcFormItem) this.vcFormItem.checkValidate('blur')
        }
      }
    },

    afterEnterEvt() {
      this.isOpened = true
    }
  }
}
</script>
