<template>
  <div
    :class="[
      'vc-select',
      {
        'is-focus': isFocus,
        'is-open': isOpen,
        'is-disabled': disabled,
        clearable
      }
    ]"
    ref="el"
    :style="[{ '--aname': '--select-' + _id }]"
    @click.stop="onSelectClick"
  >
    {{ intValue }}-{{ modelValue }}
    <div class="vc-select--content">
      <div class="vc-select--inner">
        <VS_Tags
          v-if="multiple || createTags"
          ref="tags"
          :selectedItem="selectedItem"
        />

        <div v-else ref="inputArea" class="vc-select--input">
          <input
            type="text"
            autocomplete="off"
            :readonly="!filterable"
            :placeholder="myPlaceholder"
            @input="intValue = ($event.target as HTMLInputElement).value"
          />
        </div>
      </div>

      <!-- suffix 后缀 -->
      <div class="vc-select--suffix">
        <span v-if="loading">
          <i class="vc-icon-loading"></i>
        </span>
        <i v-else class="vc-icon-arrow-down"></i>
        <i v-if="clearable" class="vc-icon-error" @click="onClear"></i>
      </div>
    </div>

    <!-- 下拉列表 -->
    <DropDown
      ref="dropdownEl"
      :show="isOpen"
      @open="onDropOpen"
      @close="onDropClose"
    >
      <ul v-if="_Options.length">
        <template v-for="item in _Options" :key="item.label">
          <template v-if="item.children">
            <VCSGroup :item="item" :value="modelValue" :valueAlias="valueAlias">
              <template #label="item">
                <slot name="header" v-bind="item">
                  <div class="vc-select-group__label">{{ item.label }}</div>
                </slot>
              </template>
              <template #default="item">
                <slot name="option" v-bind="item">
                  <label>{{ item[labelAlias] }}</label>
                  <i class="vc-icon-check"></i>
                </slot>
              </template>
            </VCSGroup>
          </template>
          <VCSOption
            v-else
            :item="item"
            :value="modelValue"
            :valueAlias="valueAlias"
          >
            <template #default="item">
              <slot name="option" v-bind="item">
                <label>{{ item[labelAlias] }}</label>
                <i class="vc-icon-check"></i>
              </slot>
            </template>
          </VCSOption>
        </template>
      </ul>
      <div class="vc-select-empty" v-else>
        {{ loading ? '加载中' : '无匹配数据' }}
      </div>
    </DropDown>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  onUnmounted,
  onMounted,
  watch,
  computed,
  inject,
  provide,
  getCurrentInstance,
  reactive,
  toRefs,
  toRaw,
  useId,
  useTemplateRef
} from 'vue'
import { copyArray } from '../../utils/copy'
import DropDown from './dropDown.vue'
import VS_Tags from './tags.vue'
import VCSOption from './option.vue'
import VCSGroup from './group.vue'
import { selectProps, selectEmits, type SelectOption, selectKey } from './types'

defineOptions({
  name: 'VcSelect'
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const el = ref<HTMLElement | null>(null)
const dropdownEl = useTemplateRef('dropdownEl')
const isFocus = ref(false)
const isOpen = ref(false)

/** 已经选中项 */
const selectedItem = ref<Record<string, SelectOption>>({})
const hoverItem = ref({})
const intValue = ref('')
const query = ref('')
const vcFormItem = inject<any>('vcFormItem', null)
const inputArea = ref<HTMLElement | null>(null)
const _id = useId()

const myPlaceholder = computed(() => {
  let result = props.placeholder

  if (props.multiple || props.createTags) {
    // 在可筛选时
    if (props.filterable) {
      result = ''
    } else {
      result = (props.modelValue as any[]).length ? '' : props.placeholder
    }
  } else {
    if (Object.keys(selectedItem.value).length) {
      result = Object.values(selectedItem.value)[0][props.labelAlias] as string
    }
  }
  return result
})

let tooltip: any = null
let hideDropdown = (evt: any) => {
  if (el.value?.contains(evt.target)) return

  isOpen.value = false
  isFocus.value = false
}

onUnmounted(() => {
  document.removeEventListener('click', hideDropdown, true)
})

onMounted(() => {
  document.addEventListener('click', hideDropdown, true)
})

const _Options = computed(() => {
  let list: SelectOption[] = structuredClone(toRaw(props.options))

  // 当有筛选时
  if (props.filterable) {
    let val = query.value
    let result: SelectOption[] = []

    if (props.filterMethod) {
      result = props.filterMethod(val, list)
    } else {
      list.forEach(option => {
        if (option.children) {
          let _arr: SelectOption[] = []

          option.children.forEach(item => {
            if ((item[props.labelAlias] as string).includes(val)) {
              _arr.push(item)
            }
          })

          if (_arr.length) result.push({ ...option, children: _arr })
        } else {
          if ((option[props.labelAlias] as string).includes(val))
            result.push(option)
        }
      })
    }

    if (props.createTags) {
      let key = query.value.trim()
      if (key && !Reflect.has(selectedItem.value, key)) {
        result.unshift({
          [props.valueAlias]: key,
          [props.labelAlias]: key
        })
      }
    }

    list = result
  } else {
    const setSelectStatus = (arr: SelectOption[]) => {
      arr.forEach(item => {
        if (item.children) {
          setSelectStatus(item.children)
        } else {
          item.selected = Reflect.has(
            selectedItem.value,
            item[props.valueAlias]
          )
        }
      })
    }
  }

  console.log(list)

  return list
})

watch(
  () => isFocus.value,
  val => {
    if (val) {
      emit('focus', val as any)
    } else {
      emit('blur')

      if (vcFormItem) vcFormItem.checkValidate('blur')
    }
  }
)

watch(
  () => query.value,
  val => {
    if (props.remoteMethod) {
      props.remoteMethod(val)
    }
  }
)

const onSelectClick = () => {
  // 禁用
  if (props.disabled) return

  dropdownEl.value?.toggle()
}

const onDropOpen = () => {
  isOpen.value = true
  isFocus.value = true
}

const onDropClose = () => {
  isOpen.value = false
  isFocus.value = false
}

const selectedEvt = (evt: Event, item: SelectOption) => {
  evt.stopPropagation()

  if (item.disabled) return

  let result: any = ''
  let key = item[props.valueAlias]

  query.value = ''

  if (props.multiple || props.createTags) {
    if (key in selectedItem.value) {
      delete selectedItem.value[key]
    } else {
      selectedItem.value[key] = item
    }

    result = Object.keys(selectedItem.value)
  } else {
    selectedItem.value = {
      [key]: item
    }
    result = key
  }

  // 不是多选则关闭选项列表
  if (!props.multiple) {
    isOpen.value = false
  }

  // 触发表彰验证
  if (vcFormItem) {
    vcFormItem.checkValidate('change')
  }

  // 更新值
  emit('update:modelValue', result)
  emit('change', result, item)
}

const updateSelectedItem = (item: SelectOption, isAdd: boolean) => {
  let key = item[props.valueAlias]

  if (isAdd) {
    if (selectedItem.value[key]) {
      if (item[props.labelAlias] === selectedItem.value[key][props.labelAlias])
        return
    }

    if (props.multiple) {
      selectedItem.value[key] = item
    } else {
      selectedItem.value = {
        [key]: item
      }
    }
  } else {
    delete selectedItem.value[key]
  }
}

const onClear = (evt: Event) => {
  evt.stopPropagation()

  if (isOpen.value) isOpen.value = false

  let val: any = props.multiple ? [] : ''
  // 添加清空值的逻辑 添加清空默认值
  if (props.valueOnClear) {
    if (typeof props.valueOnClear === 'function') {
      // 可以使用 () => null 返回 null
      val = props.valueOnClear()
    } else {
      val = props.valueOnClear
    }
  }

  emit('update:modelValue', val)
  emit('onClear', val)
}

const afterLeave = () => {
  // tooltip?.destroy()
  emit('closed')
}

// Expose methods for parent components
defineExpose({
  selectedEvt,
  updateSelectedItem
})

const state = {
  props,
  query,
  selectedItem,
  selectedEvt,
  updateSelectedItem,
  $refs: {
    inputArea
  }
}

provide(selectKey, state)
</script>
