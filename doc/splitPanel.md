# SplitPanel 分割面板

## 基础用法

::: codeBox
```vue
<template>
  <VcSplitPanel :sizes="sizes">
    <template #left>左</template>
    <template #right>右</template>
  </VcSplitPanel>
</template>

<script setup>
import { ref } from 'vue'

const sizes = ref([
  {
    name: 'left',
    value: 100
  },
  {
    name: 'right'
  }
])
</script>
```
:::
