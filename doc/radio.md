# Radio 单选框

在一组备选项中进行单选

> 请使用 value 属性来绑定选项值。不再使用 label 属性来定义选项值。

## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: codeBox
```vue
<template>
  <vc-radio v-model="radio" :value="1" :size="28">项目1</vc-radio>
  <vc-radio v-model="radio" :value="2">项目2</vc-radio>
</template>

<script setup>
import { ref } from 'vue'

const radio = ref(1)
</script>
```
:::

## Group 组

适用于在多个互斥的选项中选择的场景。

::: codeBox
```vue
<template>
  <vc-radio-group v-model="radio" @change="change">
    <vc-radio :value="1"></vc-radio>
    <vc-radio :value="2"></vc-radio>
    <vc-radio :value="3"></vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref, inject } from 'vue'
import { VcMessage } from '@ektx/vc2'

let radio = ref(3)

const change = event =>{
  VcMessage({
    type: 'info',
    message: event.target.value
  }) 
}
</script>
```
:::


### Button 按钮样式

按钮样式的单选组合。

::: codeBox
```vue
<template>
{{value}}
<br/>
  <vc-radio-group v-model="value" type="button" :size="18">
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <br/>
  <vc-radio-group v-model="value" type="button" round>
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref } from 'vue'

let value = ref('安徽')
</script>
```
:::

### Segmented 分段控制器

用于展示多个选项并允许用户选择其中单个选项。

::: codeBox
```vue
<template>
  <vc-radio-group v-model="value" type="segmented">
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>

  <p>plain</p>

  <vc-radio-group v-model="value" plain type="segmented">
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>

  <p>round</p>

  <vc-radio-group v-model="value" type="segmented" round>
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref } from 'vue'

let value = ref('安徽')
</script>
```
:::


## 自定颜色

::: codeBox
```vue
<template>
  <vc-radio-group v-model="value" background="#9C27B0">
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <br/>
  <vc-radio-group v-model="value" type="button" background="#9C27B0">
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <br/>
  <vc-radio-group v-model="value" type="button" background="#9C27B0" color="#ffeb3b">
     <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <br/>
  <vc-radio-group v-model="value" type="segmented" background="#9C27B0" color="#ffeb3b">
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <br/>
  <vc-radio-group 
    v-model="value" 
    type="segmented" 
    background="#9C27B0" 
    color="#ffeb3b" 
    bar-color="#058d2e" 
    txt-color="#fff"
  >
    <vc-radio value="上海">上海</vc-radio>
    <vc-radio value="北京">北京</vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref } from 'vue'

let value = ref('安徽')
</script>
```
:::

## 带有边框

::: codeBox
```vue
<template>
  <vc-radio v-model="radio3" value="1" border>上海</vc-radio>
  <vc-radio v-model="radio3" value="2" border>北京</vc-radio>
  <br/>
  <br/>
  <vc-radio-group v-model="radio4">
    <vc-radio value="1" border>上海</vc-radio>
    <vc-radio value="2" border>北京</vc-radio>
    <vc-radio value="3" border disabled>天津</vc-radio>
    <vc-radio value="4" border>安徽</vc-radio>
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
    <vc-radio disabled v-model="radio" value="上海"></vc-radio>
    <vc-radio disabled v-model="radio" value="北京"></vc-radio>
    <vc-radio disabled v-model="radio" value="天津"></vc-radio>
    <vc-radio disabled v-model="radio" value="安徽"></vc-radio>
  </div>

  <br/>

  <vc-radio-group v-model="radio" type="button" disabled>
    <vc-radio value="上海"></vc-radio>
    <vc-radio value="北京"></vc-radio>
    <vc-radio value="天津">天津</vc-radio>
    <vc-radio value="安徽">安徽</vc-radio>
  </vc-radio-group>

  <br/>
  <br/>

  <vc-radio-group v-model="radio" type="button">
    <vc-radio value="上海" />
    <vc-radio value="北京" disabled />
    <vc-radio value="天津" />
    <vc-radio value="安徽" />
  </vc-radio-group>

  <br/>
  <br/>

  <vc-radio-group v-model="radio" type="segmented" disabled>
    <vc-radio value="上海" />
    <vc-radio value="北京" />
    <vc-radio value="天津" />
    <vc-radio value="安徽" />
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
    value="北京" 
    @change="change"
    @focus="focus"
  >北京</vc-radio>
  <vc-radio 
    v-model="radio" 
    value="上海" 
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
    <vc-radio value="北京"></vc-radio>
    <vc-radio value="上海"></vc-radio>
  </vc-radio-group>
</template>

<script setup>
import { ref, inject } from 'vue'

let radio = ref('北京')
let radio1 = ref('北京')
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
|------|------|------|--------|--------|
| modelValue / v-model | `string / number / boolean / object` | 绑定值 | — | — |
| value | `string / number / boolean / object` | 选项的值 | — | — |
| label | `string / number / boolean / object` | 标签（已废弃，请使用 `value`） | — | — |
| disabled | `boolean` | 是否禁用 | — | `false` |
| border | `boolean` | 是否显示边框 | — | `false` |
| size | `number` | 文字大小（单位 px） | — | `14` |
| background | `string` | 选中时的背景色 | — | — |
| color | `string` | 选中时的文字颜色 | — | — |

## Radio Events

| 事件名称 | 说明 | 回调参数 |
|----------|------|----------|
| focus | 聚焦时触发 | `(event: Event)` |
| blur | 失焦时触发 | `(event: Event)` |
| change | 值变更时触发 | `(event: Event)` |

## Radio Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义标签内容，默认显示 `value` 或 `label` |



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
