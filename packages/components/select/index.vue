<template>
  <div 
    :class="[
      'vc-select', 
      {
        'is-focus': isFocus,
        'is-open': isOpen, 
        'is-disabled': disabled, 
        clearable,
      }
    ]" @click="focusEvt">
    <VS_Tags ref="tags" :selectedItem="selectedItem"/>
    <div ref="inputArea" class="vc-select__input">
      <input 
        :readonly="!filterable" 
        type="text" 
        autocomplete="off" 
        :placeholder="_placeholder"
        v-model="intValue"
        @input="setQuery"
      >
      <span v-if="isLoading">
        <i class="vc-icon-loading"/>
      </span>
      <i v-else class="vc-icon-arrow-down"/>
      <i class="vc-icon-error" @click="clearValue"/>
    </div>
    <transition name="vc-zoom-in-top" @after-leave="afterLeave">
      <DropDown v-show="isOpen">
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
          {{ isLoading ? '加载中' : '无匹配数据' }}
        </div>
      </DropDown>
    </transition>
  </div>
</template>

<script>
import { 
  ref, 
  onUnmounted, 
  onMounted, 
  watch,
  computed,
  getCurrentInstance,
  reactive,
  inject,
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
    // 是否可搜索
    filterable: Boolean,
    // 自定义搜索方法
    filterMethod: Function,
    // 是否允许用户创建新条目
    createTags: Boolean, 
    // 自定义远程搜索功能
    remoteMethod: Function
  },
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance()
    const isFocus = ref(false)
    const isOpen = ref(false)
    const selectedItem = ref({})
    const hoverItem = ref({})
    const intValue = ref('')
    const query = ref('')
    const isLoading = ref(false)
    const vcFormItem = inject('vcFormItem', null)
    const _options = ref([])

    const _placeholder = computed(() => {
      let result = ''
      if (props.multiple || props.createTags) {
        result = props.value.length ? '' : props.placeholder
        result = props.filterable ? '' : result
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

        if (props.filterable && isOpen.value) intValue.value = ''
      }

      return result
    })

    let tooltip = null
    let hideDropdown = () => {
      isOpen.value = false
      isFocus.value = false
    }

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
          let oldItem = selectedItem.value[old]

          if (oldItem) oldItem.selected = false

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

    function setQuery(evt) {
      let { value } = evt.target

      query.value = value
      intValue.value = value
      if (ctx.tooltip) ctx.tooltip.update()
    }

    watch(
      () => isFocus.value,
      (val) => {
        if (val) {
          emit('focus', val)
        } else {
          emit('blur')
          if (vcFormItem) vcFormItem.checkValidate('blur')
        }
      }
    )

    watch(
      () => query.value,
      (val) => {
        let str = val.trim()
        let result = []
        let done = (list) => {
          _options.value = list
          isLoading.value = false
        }

        if (props.remoteMethod) {
          _options.value = []
          if (str) {
            isLoading.value = true
            props.remoteMethod(val, done)
          }
          return
        }

        // 无过滤情况
        if (!props.filterable) {
          _options.value = props.options
          return 
        }

        // 自定义过滤效果
        if (props.filterMethod) {
          result = props.filterMethod(val, props.options)
        } 
        // 默认过滤效果
        else {
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
        }

        if (result.length === 0) {
          if (props.createTags) {
            let addItem = reactive({
              value: val,
              label: val,
              selected: Reflect.has(selectedItem.value, val),
              hover: false
            })
            result.push(addItem)
          }
          ctx.tooltip && ctx.tooltip.update()
        }

        _options.value = result
      },
      {
        immediate: true
      }
    )

    function clearValue(evt) {
      evt.stopPropagation()

      if (isOpen.value) isOpen.value = false
      emit('update:value', props.multiple ? [] : '')
    }

    function afterLeave() {
      ctx.tooltip.destroy()
      emit('closed')
    }

    return {
      tooltip,
      isFocus,
      isOpen,
      intValue,
      selectedItem,
      hoverItem,
      _placeholder,
      _options,
      query,
      isLoading,

      vcFormItem,

      optionMouseOver,
      setHoverItem,
      clearValue,
      setQuery,
      afterLeave
    }
  },
  methods: {
    focusEvt (e) {
      e.stopPropagation()

      if (this.disabled) return

      if (this.isOpen) {
        this.isOpen = false
        this.isFocus = false
        return
      }

      let { width } = this.$el.getBoundingClientRect()
      let tooltipEl = this.$el.querySelector('.vc-select__dropdown')
      this.isOpen = true
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
      let result = ''
      this.query = ''

      if (item.selected) {
        if (this.multiple || this.createTags) {
          item.selected = false
          delete this.selectedItem[item.value]
          result = Object.keys(this.selectedItem)
        }
      } else {
        item.selected = true

        if (this.multiple || this.createTags) {
          this.selectedItem[item.value] = item
          result = Object.keys(this.selectedItem)
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
          this.isOpen = false
          result = item.value
        }
      }

      if (this.vcFormItem) {
        this.vcFormItem.checkValidate('change')
      }
      this.$emit('update:value', result)
      this.$emit('change', result)
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
