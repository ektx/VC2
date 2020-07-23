<template>
  <div class="vc-color-picker">
    <div 
      ref="colorEl"
      class="vc-color-picker__color" 
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
import { ref, getCurrentInstance, onMounted, onUnmounted, computed, watch, provide, inject } from 'vue'
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
    }
  },
  provide() {
    return { vcColorPicker: this }
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance()
    const colorEl = ref(null)
    const dropdown = ref(null)
    const isActive = ref(false)
    const isVisible = ref(false)
    const isOpened = ref(false)
    const isDrag = ref(false)
    const hsv = ref({})
    const alpha = ref(1)
    let timer = null

    const vcFormItem = inject('vcFormItem', null)

    provide('VCColorPickerHSV', hsv)

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

    function afterEnterEvt() {
      isOpened.value = true
    }

    onMounted(() => {
      let { hsv: _h, alpha: a } = formatString(props.value)

      hsv.value = _h
      alpha.value = a
      document.addEventListener('mouseup', hideDropdown, false)
    })

    onUnmounted(() => {
      document.removeEventListener('mouseup', hideDropdown, false)
    })

    const colorStyle = computed(() => {
      let { h, s, v } = hsv.value

      if (h === undefined) return {}

      let { r, g, b } = hsv2rgb(h, s, v)
      
      return {
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha.value})`
      }
    })

    function delayFun () {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        updateValue(props.format, hsv.value, alpha.value, emit, vcFormItem)
      }, props.delay)
    }
    
    watch(
      () =>  hsv.value,
      (val) => delayFun(),
      { deep: true }
    )
    watch(
      () => alpha.value,
      (val) => delayFun()
    )

    return {
      hsv,
      alpha,
      colorEl,
      colorStyle,
      dropdown,
      isVisible,
      isActive,
      isOpened,
      isDrag,
      showDropdownEvt,
      afterEnterEvt
    }
  }
}

function updateValue(format, hsv, alpha, emit, vcFormItem) {
  let result = ''
  let {h, s, v} = hsv

  switch (format) {
    case 'hex': {
      let rgb = hsv2rgb(h, s, v)
      result = toHex(rgb)
      break
    }
    case 'rgb': {
      let {r, g, b}= hsv2rgb(h, s, v)

      if (r) {
        if (alpha === 1) {
          result = `rgb(${r}, ${g}, ${b})`
        } else {
          result = `rgba(${r}, ${g}, ${b}, ${alpha})`
        }
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

  emit('update:value', result)
  emit('change', result)

  if (vcFormItem) vcFormItem.checkValidate('change')
}
</script>
