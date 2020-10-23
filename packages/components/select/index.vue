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
    ]" 
    @click="focusEvt"
  >
    <VS_Tags ref="tags" :selectedItem="selectedItem"/>
    <div ref="inputArea" class="vc-select__input">
      <input 
        type="text" 
        autocomplete="off" 
        :readonly="!filterable" 
        :placeholder="myPlaceholder"
        :value="intValue"
        @input="intValue = $event.target.value"
      >
      <span v-if="isLoading">
        <i class="vc-icon-loading"/>
      </span>
      <i v-else class="vc-icon-arrow-down"/>
      <i class="vc-icon-error" @click="clearValue"/>
    </div>
    <transition name="vc-zoom-in-top" @after-leave="afterLeave">
      <DropDown v-show="isOpen">
        <ul v-if="myOptions.length">
          <template v-for="item in myOptions" :key="item.label">
            <template v-if="item.children">
              <VCSGroup :item="item">
                <template #label="item">
                  <slot name="header" v-bind="item">
                    <div class="vc-select-group__label">{{item.label}}</div>
                  </slot>
                </template>
                <template #default="item">
                  <slot name="option" v-bind="item">
                    <label>{{item[labelAlias]}}</label>
                    <i v-if="item.selected" class="vc-icon-check"></i>
                  </slot>
                </template>
              </VCSGroup>
            </template>
            <VCSOption v-else :item="item">
              <template #default="item">
                <slot name="option" v-bind="item">
                  <label>{{item[labelAlias]}}</label>
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
  reactive,
  inject,
} from 'vue'
import { createPopper } from '@popperjs/core'
import { copyArray } from '../../utils/copy'
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
    // 值
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    // 选项列表
    options: {
      type: Array,
      default: () => ([])
    },
    // [TODO]弹层是否追加到body
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    // 是否多选
    multiple: Boolean,
    // [TODO]多选时是否将选中值按文字的形式展示	
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
    // 是否禁用
    disabled: Boolean,
    // 是否可清空
    clearable: Boolean,
    // 是否可搜索
    filterable: Boolean,
    // 自定义搜索方法
    filterMethod: Function,
    // 是否允许用户创建新条目
    createTags: Boolean, 
    // 自定义远程搜索功能
    remoteMethod: Function,
    // 值别名
    valueAlias: {
      type: String,
      default: 'value'
    },
    // 标签别名
    labelAlias: {
      type: String,
      default: 'label'
    }
  },
  setup(props, { emit }) {
    const isFocus = ref(false)
    const isOpen = ref(false)
    const selectedItem = ref({})
    const hoverItem = ref({})
    const intValue = ref('')
    const query = ref('')
    const isLoading = ref(false)
    const vcFormItem = inject('vcFormItem', null)

    const myPlaceholder = computed(() => {
      let result = props.placeholder

      if (props.multiple || props.createTags) {
        // 在可筛选时
        if (props.filterable) {
          result = ''
        } else {
          result = props.modelValue.length ? '' : props.placeholder 
        }
      } else {
        if (isFocus.value && Object.keys(selectedItem.value).length) {
          result = Object.values(selectedItem.value)[0][props.labelAlias]
        }
      }
      return  result
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

    const myOptions = computed(() => {
      let list = copyArray(props.options)

      if (props.filterable) {
        let val = intValue.value || query.value
        let result = []

        if (props.filterMethod) {
          result = props.filterMethod(val, list)
        } else {
          list.forEach(option => {
            if (option.children) {
              let _arr = []
  
              option.children.forEach(item => {
                if (item[props.labelAlias].includes( val )) {
                  _arr.push( item )
                }
              })
  
              if (_arr.length)
                result.push({...option, children: _arr})
            } else {
              if (option[props.labelAlias].includes( val ))
                result.push(option)
            }
          })
        }

        if (props.createTags) {
          let key = query.value.trim()
          if (key && !Reflect.has(selectedItem, key)) {
            result.unshift({
              [props.valueAlias]: key,
              [props.labelAlias]: key,
            })
          }
        }

        list = result
      }

      return list
    })

    watch(
      () => isFocus.value,
      (val) => {
        if (val) {
          emit('focus', val)
        } else {
          emit('blur')

          if (!props.multiple && Object.values(selectedItem.value).length) {
            intValue.value = Object.values(selectedItem.value)[0][props.labelAlias]
          }

          if (vcFormItem) vcFormItem.checkValidate('blur')
        }
      }
    )

    return {
      tooltip,
      isFocus,
      isOpen,
      intValue,
      query,
      selectedItem,
      hoverItem,
      myPlaceholder,
      myOptions,
      query,
      isLoading,

      vcFormItem,
    }
  },
  watch: {
    intValue(val) {
      if (val) {
        let done = () => this.isLoading = false

        if (this.remoteMethod) {
          this.isLoading = true
          this.remoteMethod(val, done)
        }
      }
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

      if (this.multiple) {
        this.intValue = ''
      } else {
        if (this.filterable) {
          this.intValue = ''
        }
      }

      tooltipEl.style.width = width + 'px'

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
      let key = item[this.valueAlias]

      this.query = ''

      if (this.multiple || this.createTags) {
        if (key in this.selectedItem) {
          delete this.selectedItem[key]
        } else {
          this.selectedItem[key] = item
        }

        result = Object.keys(this.selectedItem)
        this.intValue = ''
      } else {
        this.selectedItem = {
          [key]: item
        }
        result = key
        this.intValue = item[this.labelAlias]
      }

      if (!this.multiple) {
        this.isOpen = false
      }

      if (this.vcFormItem) {
        this.vcFormItem.checkValidate('change')
      }
      this.$emit('update:modelValue', result)
      this.$emit('change', result, item)
    },

    updateSelectedItem (item, isAdd) {
      let key = item[this.valueAlias]

      if (isAdd) {
        if (this.selectedItem[key]) {
          if (item[this.labelAlias] === this.selectedItem[key][this.labelAlias]) return
        }
  
        if (this.multiple) {
          this.selectedItem[key] = item
        } else {
          this.selectedItem = {
            [key]: item
          }
          this.intValue = item[this.labelAlias]
        }
      } else {
        if (this.selectedItem[key] && !this.multiple) {
          this.intValue = ''
        }

        delete this.selectedItem[key]
      }
    },

    clearValue(evt) {
      evt.stopPropagation()

      if (this.isOpen) this.isOpen = false
      this.$emit('update:modelValue', this.multiple ? [] : '')
    },

    afterLeave() {
      this.tooltip.destroy()
      this.$emit('closed')
    }
  }
}
</script>
