<template>
  <div :class="['vc-select', {'is-open': isFocus}]">
    <div ref="inputArea" class="vc-select__input">
      <input 
        readonly 
        type="text" 
        autocomplete="off" 
        @click="focusEvt" 
        @blur="blurEvt"
        v-model="intValue"
      >
      <i class="vc-icon-arrow-down"/>
    </div>
    <transition name="vc-zoom-in-top">
      <DropDown v-show="isFocus">
        <ul class="vc-option">
          <li 
            v-for="item in options" 
            :key="item.value"
            :class="[{'selected': item.selected}]"
            @click="evt => selectedEvt(evt, item)"
          >
            <label>{{item.label}}</label>
          </li>  
        </ul>        
      </DropDown>
    </transition>
  </div>
</template>

<script>
import { ref, onUnmounted, onMounted } from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropDown.vue'

export default {
  name: 'VcSelect',
  components: { DropDown },
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    options: {
      type: Array,
      default: []
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    // 是否多选
    multiple: Boolean,
    // 多选时是否将选中值按文字的形式展示	
    collapseTags: Boolean
  },
  setup() {
    const isFocus = ref(false)
    const intValue = ref('')
    const selectedItem = ref({})

    let hideDropdown = () => isFocus.value = false

    onUnmounted(() => {
      document.removeEventListener('click', hideDropdown, false)
    })

    onMounted(() => {
      document.addEventListener('click', hideDropdown, false)
    })

    return {
      isFocus,
      intValue,
      selectedItem
    }
  },
  methods: {
    focusEvt (e) {
      e.stopPropagation()

      if (this.isFocus) return

      let tooltip = this.$el.querySelector('.vc-select__dropdown')
      this.isFocus = true

      createPopper(this.$refs.inputArea, tooltip, {
        placement: 'bottom',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10]
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

    blurEvt() {
      // this.isFocus = false
    },

    selectedEvt(evt, item) {
      evt.stopPropagation()

      console.log(item)
      if (item.selected) {
        item.selected = false
        delete this.selectedItem[item.value]
        this.$emit('update:value', Object.keys(this.selectedItem))
      } else {
        item.selected = true

        if (this.multiple) {
          this.selectedItem[item.value] = item
          this.$emit('update:value', Object.keys(this.selectedItem))
        } else {
          let oldKeys = Object.keys(this.selectedItem)
          
          if (oldKeys.length) {
            let oldItem = this.selectedItem[oldKeys[0]]
            oldItem.selected = false
          }

          this.selectedItem = {
            [item.value]: item
          }
          this.intValue = item.label
          this.isFocus = false
          this.$emit('update:value', item.value)
        }
      }
    },

    
  }
}


</script>
