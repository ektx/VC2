# colorPicker 颜色选择器

用于颜色选择，支持多种格式。

::: demo
```html
<template>
  <vc-color-picker v-model:value="color"/>
</template>

<script>
export default {
  setup() {
    // const color = ref('hsl(10, 40%, 30%)')
    const color = ref('hsla(10, 40%, 30%, .3)')
    
    return { color }
  }
}
</script>
```
:::