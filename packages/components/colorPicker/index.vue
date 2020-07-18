<template>
  <div class="vc-color-picker">
    <div 
      ref="colorEl"
      class="vc-color-picker__color" 
      :style="colorStyle"
      @click="showDropdownEvt"
    ></div>
    <transition name="vc-zoom-in-top">
      <DropDown v-show="isVisible" ref="dropdownEl"/>
    </transition>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropdown.vue'

export default {
  name: 'VcColorPicker',
  components: { DropDown },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  provide() {
    return { vcColorPicker: this}
  },
  setup(props, {}) {
    const { ctx } = getCurrentInstance()
    const colorStyle = ref({
      backgroundColor: props.value
    })
    const colorEl = ref(null)
    const dropdown = ref(null)
    const isVisible = ref(false)
    const isActive = ref(false)

    function showDropdownEvt (evt) {
      evt.stopPropagation()

      const dropdownEl = ctx.$el.querySelector('.vc-color-picker__drop-down')

      isVisible.value = true

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
      console.trace(1)
      debugger
      if (!isActive.value) isVisible.value = false
    }

    onMounted(() => {
      document.addEventListener('mouseup', hideDropdown, false)
    })

    onUnmounted(() => {
      document.removeEventListener('mouseup', hideDropdown, false)
    })

    return {
      colorEl,
      colorStyle,
      dropdown,
      isVisible,
      isActive,
      showDropdownEvt
    }
  }
}
</script>

<style lang="less">
.vc-color-picker {
  position: relative;
  display: inline-block;
  // font-size: 0;

  &__color {
    display: inline-block;
    width: 1em;
    height: 1em;
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, .3);
  }
}
</style>