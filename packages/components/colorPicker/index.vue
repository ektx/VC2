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
import { ref, getCurrentInstance, onMounted, onUnmounted, computed, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropdown.vue'
import { formatString, R, G, B, alpha } from './color'

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
    }
  },
  provide() {
    return { vcColorPicker: this}
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance()
    const colorEl = ref(null)
    const dropdown = ref(null)
    const isActive = ref(false)
    const isVisible = ref(false)
    const isOpened = ref(false)

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
          ]
        }
      )
    }

    function hideDropdown () {
      if (!isActive.value) isVisible.value = false
    }

    function afterEnterEvt() {
      isOpened.value = true
    }

    onMounted(() => {
      formatString(props.value)

      document.addEventListener('mouseup', hideDropdown, false)
    })

    onUnmounted(() => {
      document.removeEventListener('mouseup', hideDropdown, false)
    })

    const colorStyle = computed(() => {
      return {
        backgroundColor: `rgba(${R.value}, ${G.value}, ${B.value}, ${alpha.value})`
      }
    })
    
    // watch(
    //   () =>  hex.value,
    //   (val) => {
    //     console.log(1, val)
    //     emit('update:value', val)
    //   }
    // )

    return {
      R,
      colorEl,
      colorStyle,
      dropdown,
      isVisible,
      isActive,
      isOpened,
      showDropdownEvt,
      afterEnterEvt
    }
  }
}
</script>

<style lang="less">
.vc-color-picker {
  position: relative;
  display: inline-block;

  &__color {
    display: inline-block;
    width: 1em;
    height: 1em;
    font-size: 14px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);

    span {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, .3);
    }
  }
}
</style>