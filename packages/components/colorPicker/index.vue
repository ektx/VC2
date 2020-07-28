<template>
  <div class="vc-color-picker">
    <div 
      ref="colorEl"
      :class="['vc-color-picker__color', { 'is-round': round }]" 
      @click="showDropdownEvt"
    >
      <span :style="colorStyle"></span>
    </div>
    <transition name="vc-zoom-in-top" @after-enter="afterEnterEvt">
      <DropDown 
        v-show="isVisible" 
        :format="format"
        :isOpened="isOpened"
      />
    </transition>
  </div>
</template>

<script>
import { 
  ref, getCurrentInstance, 
  onMounted, onUnmounted, 
  computed, watch, provide, inject 
} from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropdown.vue'
import { formatString, hsv2rgb, toHex, hsv2hsl } from './color'

export default {
  name: 'VcColorPicker',
  components: { DropDown },
  props: {
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
    }
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance()
    const vcFormItem = inject('vcFormItem', null)
    let timer = null
    
    const colorEl = ref(null)
    const dropdown = ref(null)
    const isActive = ref(false)
    const isVisible = ref(false)
    const isOpened = ref(false)
    const isDrag = ref(false)
    const hsv = ref({__: true})
    const alpha = ref(1)

    provide('VCColorPickerHSV', hsv)

    const colorStyle = computed(() => {
      let { h, s, v } = hsv.value

      if (h === undefined) return {}

      let { r, g, b } = hsv2rgb(h, s, v)
      
      return {
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha.value})`
      }
    })

    watch(
      () =>  hsv.value,
      (val, old) => {
        if (old.__) return
        delayFun()
      },
      { deep: true }
    )
    watch(
      () => alpha.value,
      (val) => delayFun()
    )

    onMounted(() => {
      let { hsv: _h, alpha: a } = formatString(props.value)

      hsv.value = _h
      alpha.value = a
      document.addEventListener('mouseup', hideDropdown, false)
    })

    onUnmounted(() => {
      document.removeEventListener('mouseup', hideDropdown, false)
    })

    function afterEnterEvt() {
      isOpened.value = true
    }

    function hideDropdown () {
      if (isDrag.value) {
        isDrag.value = false
      } else {
        if (isVisible.value) {
          isVisible.value = false
          if (vcFormItem) vcFormItem.checkValidate('blur')
        }
      }
    }

    function delayFun () {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        updateValue(props.format, hsv.value, alpha.value, emit, vcFormItem)
      }, props.delay)
    }

    function showDropdownEvt (evt) {
      evt.stopPropagation()

      const dropdownEl = ctx.$el.querySelector('.vc-color-picker__drop-down')

      isVisible.value = true
      
      formatString(props.value)

      dropdown.value = createPopper(
        colorEl.value,
        dropdownEl,
        {
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
        }
      )
    }

    return {
      colorEl,
      dropdown,
      isActive,
      isVisible,
      isOpened,
      isDrag,
      hsv,
      alpha,

      colorStyle,
      afterEnterEvt,
      showDropdownEvt,
    }
  }
}

function updateValue(format, hsv, alpha, emit, vcFormItem) {
  let result = ''
  let {h, s, v} = hsv

  if (h !== undefined) {
    switch (format) {
      case 'hex': {
        let rgb = hsv2rgb(h, s, v)
        result = toHex(rgb)
        break
      }
      case 'rgb': {
        let {r, g, b}= hsv2rgb(h, s, v)
  
        if (alpha === 1) {
          result = `rgb(${r}, ${g}, ${b})`
        } else {
          result = `rgba(${r}, ${g}, ${b}, ${alpha})`
        }
        break
      }
      case 'hsl': {
        let {h: _h, s: _s, l} = hsv2hsl(h, s, v)
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
