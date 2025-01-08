# Checkbox 多选框

## 基础用法

::: codeBox
```vue
<template>
  <vc-checkbox v-model="value1">checkbox 1</vc-checkbox>
  <vc-checkbox v-model="value2">checkbox 2</vc-checkbox>
</template>

<script setup>
import {ref} from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>
```
:::


## 禁用状态

::: codeBox
```vue
<template>
  <vc-checkbox v-model="value" disabled>checkbox 1</vc-checkbox>
  <vc-checkbox v-model="value">checkbox 2</vc-checkbox>
</template>

<script setup>
import {ref} from 'vue'

const value = ref(true)
</script>
```
:::


## 多选组

::: codeBox
```vue
<template>
  <vc-checkbox-group v-model="value">
    <vc-checkbox value="one">checkbox 1</vc-checkbox>
    <vc-checkbox value="two">checkbox 2</vc-checkbox>
  </vc-checkbox-group>
</template>

<script setup>
import {ref} from 'vue'

const value = ref(['one'])
</script>
```
:::

### 多选组列表模式

::: codeBox
```vue
<template>
  <vc-checkbox-group v-model="value" :list="list"></vc-checkbox-group>
</template>

<script setup>
import {ref} from 'vue'

const value = ref(['one'])
const list = ref([{
  value: 'one',
  label: 'checkbox 1'
}, {
  value: 'two',
  label: 'checkbox 2'
}])
</script>
```
:::


### 中间状态

::: codeBox
```vue
<template>
  <vc-checkbox 
    :indeterminate="isIndeterminate" 
    v-model="all"
    @change="onChange"
  >check All</vc-checkbox>

  <br>
  <br>

  <vc-checkbox-group 
    v-model="value" 
    :list="list"
  ></vc-checkbox-group>
</template>

<script setup>
import {ref, watch } from 'vue'

const isIndeterminate = ref(false)
const all = ref(false)
const value = ref(['one'])
const list = ref([{
  value: 'one',
  label: 'apple'
}, {
  value: 'two',
  label: 'banana'
}])

const onChange = (val) => {
  if (val) {
    value.value = list.value.map(item => item.value)
  } else {
    value.value = []
  }
}

watch(value, (val) => {
  if (list.value.length) {
    isIndeterminate.value = val.length > 0 && val.length < list.value.length
  }

  all.value = val.length === list.value.length
}, {immediate: true})
</script>
```
:::


### 可选项目数量限制 

::: codeBox
```vue
<template>
  <vc-checkbox-group 
    v-model="value" 
    :list="list" 
    max="2" 
    min="1"
  ></vc-checkbox-group>
</template>

<script setup>
import {ref } from 'vue'

const value = ref(['apple'])
const list = ref([
  {
    value: 'apple',
    label: 'apple'
  }, 
  {
    value: 'banana',
    label: 'banana'
  },
  {
    value: 'orange',
    label: 'orange'
  },
  {
    value: 'pinapple',
    label: 'pinapple'
  },
])
</script>
```
:::


## 大小控制

::: codeBox
```vue
<template>
  <p>单独使用</p>
  <vc-checkbox v-model="value1" size="12px">12px</vc-checkbox>
  <vc-checkbox v-model="value1">Def</vc-checkbox>
  <vc-checkbox v-model="value2" size="18px">18px</vc-checkbox>

  <p>在组中</p>
  <vc-checkbox-group v-model="value" :list="list" size="12px"></vc-checkbox-group>
</template>

<script setup>
import {ref} from 'vue'

const value1 = ref(true)
const value2 = ref(false)

const value = ref(['one'])
const list = ref([{
  value: 'one',
  label: 'checkbox 1',
  disabled: true,
  size: '18px' // 👈 单独控制在组内大小
}, {
  value: 'two',
  label: 'checkbox 2'
}])
</script>
```
:::

## CheckBox Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| value | **String/Number/Boolean/Obj** | 绑定的值，通常与 `checkboxgroup` 使用 | - | - |
| modelValue | **String/Boolean/Number** | 动态绑定的值 | - | - |
| indeterminate | **Boolean** | 是否为中间状态 | - | false |
| disabled | **Boolean** | 禁用状态 | - | - |
| size | **String** | 控制显示大小，默认字体大小 | - | - |

## CheckBoxGroup Props

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| modelValue | **String[]** | 动态绑定的值 | - | - |
| list | **{label: string, value: string/number,<br>disabled: boolean, size: string}[]** | 列表模式下数据 | - | - |
| min | **String/Number** | 最少选项 | - | Infinity |
| max | **string/number** | 最多选项 | - | 0 |
| disabled | **Boolean** | 禁用状态 | - | - |
| size | **String** | 控制显示大小，默认字体大小 | - | - |
| gap | **String** | 控制选项间隔 | - | - |
