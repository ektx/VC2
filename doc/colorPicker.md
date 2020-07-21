# colorPicker 颜色选择器

用于颜色选择，支持多种格式。

::: demo
```html
<template>
  <vc-color-picker v-model:value="color" format="hsl"/>
  <vc-color-picker v-model:value="color2" format="hsv"/>
  <vc-color-picker v-model:value="color3" format="hex"/>
  <vc-color-picker v-model:value="color4" format="rgb"/>
</template>

<script>
export default {
  setup() {
    const color = ref('hsl(10, 40%, 30%)')
    const color2 = ref('hsla(10, 40%, 30%, .3)')
    const color3 = ref('hsla(10, 40%, 30%, .3)')
    const color4 = ref('hsla(10, 40%, 30%, .3)')
    
    return { color, color2, color3, color4 }
  }
}
</script>
```
:::