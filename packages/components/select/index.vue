<template>
  <div 
    :class="[
      'vc-select', 
      {'is-open': isFocus, 'is-disabled': disabled, clearable}
    ]" @click="focusEvt">
    <VS_Tags :selectedItem="selectedItem"/>
    <div ref="inputArea" class="vc-select__input">
      <input 
        :readonly="!filterable" 
        type="text" 
        autocomplete="off" 
        :placeholder="_placeholder"
        v-model="intValue"
      >
      <i class="vc-icon-arrow-down"/>
      <i class="vc-icon-error" @click="clearValue"/>
    </div>
    <transition name="vc-zoom-in-top">
      <DropDown v-show="isFocus">
        <ul>
          <template v-for="item in options" >
            <template v-if="item.children">
              <VCSGroup :item="item" :key="item.label">
                <template #label="item">
                  <slot name="label" v-bind="item">
                    <div class="vc-select-group__label">{{item.label}}</div>
                  </slot>
                </template>
                <template #default="item">
                  <slot v-bind="item">
                    <label>{{item.label}}</label>
                    <i v-if="item.selected" class="vc-icon-check"></i>
                  </slot>
                </template>
              </VCSGroup>
            </template>
            <VCSOption v-else :key="item.value" :item="item">
              <template #default="item">
                <slot v-bind="item">
                  <label>{{item.label}}</label>
                  <i v-if="item.selected" class="vc-icon-check"></i>
                </slot>
              </template>
            </VCSOption>
          </template>
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
  computed,
} from 'vue'
import { createPopper } from '@popperjs/core'
import DropDown from './dropDown.vue'
import VS_Tags from './tags.vue'
import VCSOption from './option.vue'
import VCSGroup from './group.vue'

export default {
  name: 'VcSelect',
  components: { DropDown, VS_Tags, VCSOption, VCSGroup },
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
    clearable: Boolean,
    filterable: Boolean,
  },
  setup(props, { emit }) {
    const isFocus = ref(false)
    const intValue = ref('')
    const selectedItem = ref({})
    const hoverItem = ref({})

    const _placeholder = computed(() => {
      if (props.multiple) return props.placeholder
      else return props.value ? props.value : props.placeholder
    })

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
          val = [].concat(val)

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
            if (item.children) {
              item.children.forEach(child => {
                if (diff.includes(child.value)) option.push(child)
              })
            } else {
              if (diff.includes(item.value)) option.push(item)
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
          let item = ''

          for (let i = 0, l = props.options.length; i < l; i++) {
            let data = props.options[i]

            if (data.children) {
              item = data.children.find(child => child.value === val)
              break
            } else {
              if (data.value === val) {
                item = data
                break
              }
            }
          }

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
      _placeholder,

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

      if (this.filterable) {
        // this.intValue = ''
        // this.placeholder = 'sda'
      }

      let { width } = this.$el.getBoundingClientRect()
      let tooltipEl = this.$el.querySelector('.vc-select__dropdown')
      this.isFocus = true

      tooltipEl.style.width = width + 'px'

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
