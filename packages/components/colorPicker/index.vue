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
import {
  ref,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  computed,
  watch,
  provide,
  inject
} from 'vue'
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
    // 颜色值
    value: {
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
      isDrag: this.myStore.isDrag
    }
  },
  mounted() {
    this.formatHSV()
    document.addEventListener('mouseup', this.hideDropdown, false)
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance()
    const vcFormItem = inject('vcFormItem', null)
    const myStore = store(props)

    let timer = null

    const dropdown = ref(null)
    const isActive = ref(false)
    const isVisible = ref(false)
    const isOpened = ref(false)
    // const isDrag = ref(false)
    const hsv = ref({ __: true })
    // const alpha = ref(1)

    provide('VCColorPickerHSV', hsv)

    const colorStyle = computed(() => {
      let { red, green, blue, alpha } = myStore

      return {
        backgroundColor: `rgba(${red.value}, ${green.value}, ${blue.value}, ${alpha.value})`
      }
    })

    watch(
      () => hsv.value,
      (val, old) => {
        if (old.__) return
        delayFun()
      },
      { deep: true }
    )
    // watch(
    //   () => alpha.value,
    //   val => delayFun()
    // )

    onUnmounted(() => {
      document.removeEventListener('mouseup', hideDropdown, false)
    })

    function afterEnterEvt() {
      isOpened.value = true
    }

    function delayFun() {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        updateValue(props.format, hsv.value, alpha.value, emit, vcFormItem)
      }, props.delay)
    }

    return {
      dropdown,
      isActive,
      isVisible,
      isOpened,
      // isDrag,
      hsv,
      // alpha,
      myStore,
      colorStyle,
      afterEnterEvt
    }
  },
  methods: {
    showDropdownEvt() {
      const dropdownEl = this.$el.querySelector('.vc-color-picker__drop-down')

      this.isVisible = true

      // formatString(this.value)

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
    },

    formatHSV() {
      let { hsv, alpha: a } = formatString(this.modelValue)
      console.log(1, hsv, a)
      // hsv.value = _h
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
    }
  }
}

function updateValue(format, hsv, alpha, emit, vcFormItem) {
  let result = ''
  let { h, s, v } = hsv

  if (h !== undefined) {
    switch (format) {
      case 'hex': {
        let rgb = hsv2rgb(h, s, v)
        result = toHex(rgb)
        break
      }
      case 'rgb': {
        let { r, g, b } = hsv2rgb(h, s, v)

        if (alpha === 1) {
          result = `rgb(${r}, ${g}, ${b})`
        } else {
          result = `rgba(${r}, ${g}, ${b}, ${alpha})`
        }
        break
      }
      case 'hsl': {
        let { h: _h, s: _s, l } = hsv2hsl(h, s, v)
        if (alpha === 1) result = `hsl(${_h}, ${_s}, ${l})`
        else result = `hsla(${_h}, ${_s}, ${l}, ${alpha})`
        break
      }
      case 'hsv': {
        if (alpha === 1) result = `hsv(${h}, ${s}, ${v})`
        else result = `hsva(${h}, ${s}, ${v}, ${alpha})`
      }
    }
  }

  emit('update:value', result)
  emit('change', result)

  if (vcFormItem) vcFormItem.checkValidate('change')
}
</script>
