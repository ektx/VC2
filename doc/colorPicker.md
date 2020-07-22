# colorPicker 颜色选择器

用于颜色选择，支持多种格式。

::: demo
```html
<template>
  <h3>Hex {{color}}</h3>
  <vc-color-picker v-model:value="color"/>

  <h3>RGB {{ color2 }}</h3>
  <vc-color-picker v-model:value="color2" format="rgb"/>

  <h3>HSL {{ color3}}</h3>
  <vc-color-picker v-model:value="color3" format="hsl"/>

  <h3>HSV {{ color4}}</h3>
  <vc-color-picker v-model:value="color4" format="hsv"/>
</template>

<script>
export default {
  setup() {
    const color = ref('#f90')
    const color2 = ref('rgb(76, 175, 80)')
    const color3 = ref('hsl(340, 82%, 52%)')
    const color4 = ref('hsla(10, 40%, 30%, .7)')
    
    return { color, color2, color3, color4 }
  }
}
</script>
```
:::