# Radio 单选框

在一组备选项中进行单选

## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: codeBox
```vue
<template>
  <vc-radio v-model="radio" :label="1">项目1</vc-radio>
  <vc-radio v-model="radio" :label="2">项目2</vc-radio>
</template>

<script>
export default {
  data() {
    return {
      radio: 1
    }
  }
}
</script>
```
:::

## 组

适用于在多个互斥的选项中选择的场景。

::: codeBox
```vue
<template>
  <vc-radio-group v-model="radio" @change="change">
    <vc-radio :label="1"></vc-radio>
    <vc-radio :label="2"></vc-radio>
    <vc-radio :label="3"></vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref, inject } from 'vue'

let radio = ref(3)
let message = inject('vcMessage')

const change = event =>{
  message({
    type: 'info',
    message: event.target.value
  }) 
}
</script>
```
:::


## 按钮样式

按钮样式的单选组合。

::: codeBox
```vue
<template>
  <vc-radio-group v-model="radio1" type="button" :size="10">
    <vc-radio label="上海">上海</vc-radio>
    <vc-radio label="北京">北京</vc-radio>
    <vc-radio label="天津">天津</vc-radio>
    <vc-radio label="安徽">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <vc-radio-group v-model="radio2" type="button" :size="14">
    <vc-radio label="上海">上海</vc-radio>
    <vc-radio label="北京">北京</vc-radio>
    <vc-radio label="天津">天津</vc-radio>
    <vc-radio label="安徽">安徽</vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref } from 'vue'

let radio1 = ref('安徽')
let radio2 = ref('安徽')
</script>
```
:::

## 自定颜色

::: codeBox
```vue
<template>
  <vc-radio-group v-model="radio1" type="button" background="green">
    <vc-radio label="1">上海</vc-radio>
    <vc-radio label="2">北京</vc-radio>
    <vc-radio label="3">天津</vc-radio>
    <vc-radio label="4">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <vc-radio-group v-model="radio2" type="button" color="#000">
    <vc-radio label="1">上海</vc-radio>
    <vc-radio label="2">北京</vc-radio>
    <vc-radio label="3">天津</vc-radio>
    <vc-radio label="4">安徽</vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref } from 'vue'

let radio1 = ref('1')
let radio2 = ref('1')
</script>
```
:::

## 带有边框

::: codeBox
```vue
<template>
  <vc-radio v-model="radio3" label="1" border>上海</vc-radio>
  <vc-radio v-model="radio3" label="2" border>北京</vc-radio>
  <br/>
  <br/>
  <vc-radio-group v-model="radio4">
    <vc-radio label="1" border>上海</vc-radio>
    <vc-radio label="2" border>北京</vc-radio>
    <vc-radio label="3" border disabled>天津</vc-radio>
    <vc-radio label="4" border>安徽</vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref } from 'vue'

let radio = ref('1')
let radio2 = ref('1')
let radio4 = ref('1')
let radio3 = ref('1')
</script>
```
:::

## 禁用状态

单选框不可用的状态。

::: codeBox
```vue
<template>
  <div>
    <vc-radio disabled v-model="radio" label="上海"></vc-radio>
    <vc-radio disabled v-model="radio" label="北京"></vc-radio>
    <vc-radio disabled v-model="radio" label="天津"></vc-radio>
    <vc-radio disabled v-model="radio" label="安徽"></vc-radio>
  </div>
  <br/>
  <vc-radio-group v-model="radio" type="button" disabled>
    <vc-radio label="上海"></vc-radio>
    <vc-radio label="北京"></vc-radio>
    <vc-radio label="天津">天津</vc-radio>
    <vc-radio label="安徽">安徽</vc-radio>
  </vc-radio-group>

  <br/>
  <vc-radio-group v-model="radio" type="button">
    <vc-radio label="上海">上海</vc-radio>
    <vc-radio label="北京" disabled>北京</vc-radio>
    <vc-radio label="天津">天津</vc-radio>
    <vc-radio label="安徽">安徽</vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref } from 'vue'

let radio = ref('北京')
</script>
```
:::

## 事件

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: codeBox
```vue
<template>
  <vc-radio 
    v-model="radio" 
    label="北京" 
    @change="change"
    @focus="focus"
  >北京</vc-radio>
  <vc-radio 
    v-model="radio" 
    label="上海" 
    @change="change"
    @focus="focus"
    @blur="blur"
  >上海</vc-radio>

  <br/>
  <br/>

  <vc-radio-group 
    v-model="radio"
    type="button" 
    @change="change"
    @focus="focus"
    @blur="blur"
  >
    <vc-radio v-model="radio" label="北京"></vc-radio>
    <vc-radio v-model="radio" label="上海"></vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref, inject } from 'vue'

let radio = ref('北京')
let message = inject('vcMessage')

const change = event =>{
  message({
    type: 'info',
    message: event.target.value
  }) 
}

function focus(evt) {
  message({
    type: 'warning',
    message: 'focus'
  })
}

function blur(evt) {
  message({
    type: 'success',
    message: 'blur'
  })
}
</script>
```
:::

## Radio Props

| 参数 | 类型 | 说明 | 可选值 | 默认值 | 
|---|---|---|---|---|
| modelValue/v-model | **string / number** | 绑定值 | - | - |
| label | **string / number** | 标签 | - | - |
| disabled | **boolean** | 是否禁用 | - | false |
| border | **boolean** | 是否显示边框 | - | false |
| size | **Number** | 大小 | - | 14 |
| background | **String** | 选中时背景色 | - | - |
| color | **String** | 选中时文字颜色 | - | - |

## Props Events

| 事件名称 | 说明 | 回调参数 | 
|---|---|---|
| focus | 聚焦时 | event |
| blur | 失焦时 | event |
| change | 状态发生变化时的回调函数 | event |

## Radio Group props

| 参数 | 类型 | 说明 | 可选值 | 默认值 | 
|---|---|---|---|---|
| modelValue、v-model | **string / number** | 绑定值 | - | - |
| disabled | **boolean** | 是否禁用 | --- | false |
| type | **String** | 显示效果 | radio/button | radio |
| size | **Number** | radio 大小 | --- | 14 |
| background | **String** | 选中时背景色 | - | - |
| color | **String** | 选中时文字颜色 | - | - |

## Radio Group Events

| 事件名称 | 说明 | 回调参数 | 
|---|---|---|
| focus | 聚焦时 | event |
| blur | 失焦时 | event |
| change | 状态发生变化时的回调函数 | event |
