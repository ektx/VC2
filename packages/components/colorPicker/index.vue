<template>
  <div class="vc-color-picker">
    <div 
      ref="colorEl"
      class="vc-color-picker__color" 
      :style="colorStyle"
      @click="showDropdownEvt"
    ></div>
    <transition name="vc-zoom-in-top" @after-enter="afterEnterEvt">
      <DropDown v-show="isVisible"/>
    </transition>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropdown.vue'
import { formatString, isVisible, isOpened } from './color'

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
    const isActive = ref(false)

    function showDropdownEvt (evt) {
      evt.stopPropagation()

      const dropdownEl = ctx.$el.querySelector('.vc-color-picker__drop-down')

      isVisible.value = true
      
      formatString(props.value)
      console.log(ctx)

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
      console.log('opened')
      isOpened.value = true
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
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, .3);
  }
}
</style>