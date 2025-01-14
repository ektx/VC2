# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

::: codeBox
```vue
<template>
  <h3>Hex {{color}}</h3>
  <vc-color-picker v-model="color"/>

  <h3>RGB {{ color2 }}</h3>
  <vc-color-picker v-model="color2" format="rgb"/>

  <h3>HSL {{ color3}}</h3>
  <vc-color-picker v-model="color3" format="hsl"/>

  <h3>HSV {{ color4}}</h3>
  <vc-color-picker v-model="color4" format="hsv"/>
</template>

<script setup>
import { ref } from 'vue'

const color = ref('#f90')
const color2 = ref('rgb(76, 175, 80)')
const color3 = ref('hsl(340, 82%, 52%)')
const color4 = ref('hsv(10, 40%, 30%)')
</script>
```
:::

## 透明度

::: codeBox
```vue
<template>
  <h3>RGB {{ color1 }}</h3>
  <vc-color-picker v-model="color1" format="rgb"/>

  <h3>HSL {{ color2}}</h3>
  <vc-color-picker v-model="color2" format="hsl"/>

  <h3>HSV {{ color3}}</h3>
  <vc-color-picker v-model="color3" format="hsv"/>
</template>

<script setup>
import { ref } from 'vue'

const color1 = ref('rgba(76, 175, 80, 0.5)')
const color2 = ref('hsla(340, 82%, 52%, 0.5)')
const color3 = ref('hsva(10, 40%, 30%, 0.5)')
</script>
```
:::


## 圆形

::: codeBox

> `round` 可以设置为圆形效果。

```vue
<template>
  <h3>Hex {{color}}</h3>
  <vc-color-picker v-model="color" round/>

  <h3>RGB {{ color2 }}</h3>
  <vc-color-picker v-model="color2" round format="rgb"/>

  <h3>HSL {{ color3}}</h3>
  <vc-color-picker v-model="color3" round format="hsl"/>

  <h3>HSV {{ color4}}</h3>
  <vc-color-picker v-model="color4" round format="hsv"/>
</template>

<script setup>
import { ref } from 'vue'
const color = ref('#f90')
const color2 = ref('rgb(76, 175, 80)')
const color3 = ref('hsl(340, 82%, 52%)')
const color4 = ref('hsv(10, 40%, 30%)')
</script>
```
:::

## 值为空

::: codeBox
```vue
<template>
  <h3>Hex {{color}}</h3>
  <vc-color-picker v-model="color" round/>

  <h3>RGB {{ color2 }}</h3>
  <vc-color-picker v-model="color2" round format="rgb"/>

  <h3>HSL {{ color3}}</h3>
  <vc-color-picker v-model="color3" round format="hsl"/>

  <h3>HSV {{ color4}}</h3>
  <vc-color-picker v-model="color4" round format="hsv"/>
</template>

<script setup>
import { ref } from 'vue'
const color = ref('')
const color2 = ref('')
const color3 = ref('')
const color4 = ref('')
</script>
```
:::

## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| v-model | **String** | 颜色值 | - | - |
| format | **String** | 写入 v-model 的颜色的格式 | hex / hsl / hsv / rgb | hex |
| round | **Boolean** | 圆形效果 | - | - |

