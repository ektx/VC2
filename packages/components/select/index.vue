<template>
  <div class="vc-select">
    <div ref="inputArea" class="vc-select__input">
      <input 
        readonly 
        type="text" 
        autocomplete="off" 
        @focus="focusEvt" 
        @blur="blurEvt"
        v-model="intValue"
      >
      <i class="vc-icon-arrow-down"/>
    </div>
    <transition name="vc-zoom-in-top">
      <DropDown v-show="isFocus" ref="dropdown">
        <ul class="vc-option">
          <li 
            v-for="item in options" 
            :key="item.value"
            :class="[{'selected': item.selected}]"
            @click="selectedEvt(item)"
          >
            <label>{{item.label}}</label>
          </li>  
        </ul>        
      </DropDown>
    </transition>
  </div>
</template>

<script>
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
  created() {
    console.log(this.value)

    // if (this.value) {
    //   this.options.forEach(item => {
    //     if (this.multiple) {
    //       if (this.value.includes(item.value)) {
    //         this.selectedItem.push(item)
    //       } 
    //     } else {
    //       if (item.value === this.value) 
    //         this.selectedItem = [item]
    //     }
    //   })
    // }
  },
  data() {
    return {
      isFocus: false,
      intValue: '',
      selectedItem: {}
    }
  },
  methods: {
    focusEvt () {
      console.log('F', this.$refs)
      if (this.isFocus) return

      this.isFocus = true
debugger
      createPopper(this.$refs.inputArea, this.$refs.dropdown.$el, {
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

    selectedEvt(item) {
      debugger
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
    }
  }
}
</script>
