<template>
  <div 
    :class="[
      'vc-select', 
      {'is-open': isFocus, 'is-disabled': disabled, clearable}
    ]" @click="focusEvt">
    <VS_Tags :selectedItem="selectedItem"/>
    <div ref="inputArea" class="vc-select__input">
      <input 
        readonly 
        type="text" 
        autocomplete="off" 
        :placeholder="placeholder"
        @blur="blurEvt"
        v-model="intValue"
      >
      <i class="vc-icon-arrow-down"/>
      <i class="vc-icon-error" @click="clearValue"/>
    </div>
    <transition name="vc-zoom-in-top">
      <DropDown v-show="isFocus">
        <ul class="vc-option">
          <li 
            v-for="item in options" 
            :key="item.value"
            :class="[{
              'selected': item.selected,
              'hover': item.hover
            }]"
            :disabled="item.disabled"
            @click="evt => selectedEvt(evt, item)"
            @mouseover="optionMouseOver(hoverItem, item)"
          >
            <label>{{item.label}}</label>
            <i v-if="item.selected" class="vc-icon-check"></i>
          </li>  
        </ul>        
      </DropDown>
    </transition>
  </div>
</template>

<script>
import { 
  ref, 
  onBeforeMount, 
  onUnmounted, 
  onMounted, 
  watch,
} from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropDown.vue'
import VS_Tags from './tags.vue'

export default {
  name: 'VcSelect',
  components: { DropDown, VS_Tags },
  provide() {
    return {
      vcSelect: this
    }
  },
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
    collapseTags: Boolean,
    // 多选时最多显示多少个 tag
    maxTagCount: {
      type: Number,
      default: 1
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: Boolean,
    clearable: Boolean
  },
  setup(props, { emit }) {
    const isFocus = ref(false)
    const intValue = ref('')
    const selectedItem = ref({})
    const hoverItem = ref({})
    let tooltip = null

    let hideDropdown = () => isFocus.value = false

    onUnmounted(() => {
      document.removeEventListener('click', hideDropdown, false)
    })

    onMounted(() => {
      document.addEventListener('click', hideDropdown, false)
    })

    watch(
      () => props.value,
      (val, old) => {
        // console.log('val:', val)
        // console.log('old:', old)
        if (props.multiple) {
          old = old ? old : []
          if (old.length === val.length) return

          let type = 'add'
          let max = val
          let filter = old

          if (val.length < old.length) {
            type = 'remove'
            max = old
            filter = val
          }

          let diff = []
          max.forEach(item => {
            if (!filter.includes(item)) diff.push(item)
          })
          let option = []
          props.options.forEach(item => {
            if (diff.includes(item.value)) {
              option.push(item)
            }
          })

          if (type === 'add') {
            option.forEach(item => {
              item.selected = true
              selectedItem.value[item.value] = item
            })
          } else {
            option.forEach(item => {
              item.selected = false
              delete selectedItem.value[item.value]
            })
          }

          intValue.value = Object.keys(val).length ? ' ' : ''
        } else {
          let item = props.options.find(item => item.value === val)

          if (item) {
            item.selected = true
            intValue.value = item.label
            selectedItem.value[item.value] = item
          }
        }
      },
      {
        immediate: true
      }
    )

    function clearValue(evt) {
      evt.stopPropagation()

      if (isFocus.value) isFocus.value = false
      intValue.value = ''
      emit('update:value', props.multiple ? [] : '')
    }

    return {
      tooltip,
      isFocus,
      intValue,
      selectedItem,
      hoverItem,

      optionMouseOver,
      setHoverItem,
      clearValue
    }
  },
  methods: {
    focusEvt (e) {
      e.stopPropagation()

      if (this.disabled) return

      if (this.isFocus) {
        this.isFocus = false
        return
      }

      let { width } = this.$el.getBoundingClientRect()
      let tooltipEl = this.$el.querySelector('.vc-select__dropdown')
      this.isFocus = true

      tooltipEl.style.width = width + 'px'

      console.log(this.value)
      setHoverItem(this.value, this.options, this.hoverItem)

      this.tooltip = createPopper(this.$refs.inputArea, tooltipEl, {
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

      if (item.disabled) return

      if (item.selected) {
        if (this.multiple) {
          item.selected = false
          delete this.selectedItem[item.value]
          this.$emit('update:value', Object.keys(this.selectedItem))
        }
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


function optionMouseOver (hover, item) {
  if (hover.value) hover.value.hover = false
  item.hover = true
  hover.value = item
}

function setHoverItem (value, options, hover) {
  let hasFrist = false
  value = [].concat(value)
  
  options.forEach(item => {
    if (value.includes(item.value) && !hasFrist) {
      item.hover = true
      hasFrist = true
      hover.value = item
    } else {
      item.hover = false
    }
  })
}

</script>
