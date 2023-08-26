# Checkbox 多选框

## 基础用法

::: codeBox
```vue
<template>
  <vc-checkbox v-model="value">checkbox</vc-checkbox>
</template>

<script setup>
import {ref} from 'vue'

const value = ref(true)
</script>
```
:::

## 禁用状态

::: codeBox
```vue
<template>
  <vc-checkbox v-model="value">checkbox</vc-checkbox>
  <vc-checkbox v-model="value" disabled>checkbox</vc-checkbox>
</template>

<script setup>
import {ref} from 'vue'

const value = ref(true)
</script>
```
:::