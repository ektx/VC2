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