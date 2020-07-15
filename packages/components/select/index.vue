<template>
  <div 
    :class="[
      'vc-select', 
      {'is-open': isFocus, 'is-disabled': disabled, clearable}
    ]" @click="focusEvt">
    <VS_Tags ref="tags" :selectedItem="selectedItem"/>
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
        <ul v-if="_options.length">
          <template v-for="item in _options" >
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
        <div class="vc-select-empty" v-else>
          无匹配数据
        </div>
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
  getCurrentInstance,
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
    const { ctx } = getCurrentInstance()
    const isFocus = ref(false)
    const selectedItem = ref({})
    const hoverItem = ref({})
    const intValue = ref('')
    const query = ref('')

    const _placeholder = computed(() => {
      let result = ''
      if (props.multiple) {
        result = props.value.length ? '' : props.placeholder
        result = query.value ? '' : result
        intValue.value = ''
      }
      else {
        let item = selectedItem.value[props.value]

        if (props.value && item) {
          result = item.label
          intValue.value = item.label
        } else {
          result = props.placeholder
          intValue.value = ''
        }

        if (props.filterable && isFocus.value) intValue.value = ''
      }

      return result
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
          old = [].concat(old)

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
            selectedItem.value[item.value] = item
          }
        }
      },
      {
        immediate: true
      }
    )

    watch(
      () => intValue.value,
      (val) => {
        query.value = val
        if (ctx.tooltip) ctx.tooltip.update()
      }
    )

    const _options = computed(() => {
        let result = []
        let val = query.value

        if (!props.filterable) {
          return props.options
        }

        props.options.forEach(option => {
          if (option.children) {
            let _arr = []

            option.children.forEach(item => {
              if (item.label.includes(val)) {
                _arr.push( item )
              }
            })

            if (_arr.length)
              result.push({...option, children: _arr})
          } else {
            if (option.label.includes(val))
              result.push(option)
          }
        })

        if (result.length === 0) {
          ctx.tooltip.update()
        }

        return result
    })

    function clearValue(evt) {
      evt.stopPropagation()

      if (isFocus.value) isFocus.value = false
      emit('update:value', props.multiple ? [] : '')
    }

    return {
      tooltip,
      isFocus,
      intValue,
      selectedItem,
      hoverItem,
      _placeholder,
      _options,
      query,

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

      setHoverItem(this.value, this.options, this.hoverItem)

      if (!this.tooltip) {
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
      } else {
        this.tooltip.update()
      }
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
        this.query = ''

        if (this.multiple) {
          this.selectedItem[item.value] = item
          this.$emit('update:value', Object.keys(this.selectedItem))
          this.$refs.tags.focusEvt()
        } else {
          let oldKeys = Object.keys(this.selectedItem)
          
          if (oldKeys.length) {
            let oldItem = this.selectedItem[oldKeys[0]]
            oldItem.selected = false
          }

          this.selectedItem = {
            [item.value]: item
          }
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

// 展开时，显示第一个选中的选项
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
