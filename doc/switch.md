# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」

## 基础示例

::: codeBox
```vue
<template>
  <vc-switch v-model:value="value" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>
```
:::

## 自定义值

::: codeBox
```vue
<template>
  <vc-switch v-model:value="value" @change="change" :active-value="100" :inactive-value="0" />
</template>

<script setup>
import { ref, inject } from 'vue'

let value = ref(100);
let message = inject('vcMessage')

function change (event) {
  message({
    type: 'info',
    message: event
  }) 
}
</script>
```
:::

## 自定义颜色

::: codeBox
```vue
<template>
  <vc-switch :value="true" active-color="#13ce66" inactive-color="#ff4949" />
</template>
```
:::

## 外部文字描述

::: codeBox

> `active-icon-class` 设置图标

```vue
<template>
  <vc-switch :value="true" active-icon="vc-icon-sunny" active-text="白天" inactive-icon="vc-icon-moon" inactive-text="夜晚" />
  
  <br/>
  <br/>

  <vc-switch active-color="#13ce66" active-text="按月付费" inactive-color="#ff4949" inactive-text="按年付费" />
</template>

```
:::

## 内部文字描述

::: codeBox
```vue
<template>
  <vc-switch inset :value="false" active-icon="vc-icon-check" inactive-icon="vc-icon-close" />

  <br/>
  <br/>

  <vc-switch 
    inset 
    :value="true" 
    active-icon="vc-icon-check" 
    inactive-icon="vc-icon-close" 
    inactive-text="关闭" 
    active-text="开启" 
  />
</template>
```
:::


## 加载中

::: codeBox
```vue
<template>
  <vc-switch loading inactive-color="#ff4949" />
  <vc-switch :value="true" loading />
</template>
```
:::

## 禁用状态

::: codeBox
```vue
<template>
  <div> 
    <vc-switch v-model:value="switch1" :disabled="disabled" />
    <br/>
    <vc-button @click="disabled = !disabled">Toggle Disabled</vc-button>
  </div>
  
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    let switch1 = ref(true);
    let switch2 = ref(false);
    let disabled = ref(true)
    
    return {
      switch1,
      switch2,
      disabled
    }
  }
}
</script>
```
:::

## 宽度控制

::: codeBox
```vue
<template>
  <vc-switch inset :width="100" :value="true" inactive-text="关闭" active-text="opened!" />
  
  <br/>
  <br/>

  <vc-switch inset :value="false" inactive-text="去睡觉" active-text="😪zzzzzzz" />
</template>
```
:::

## 大小控制

::: codeBox
```vue
<template>
  <vc-switch :value="true" :r="12" />
  <vc-switch :value="true" :r="14" />
  <vc-switch :value="true" :r="18" />
</template>
```
:::

## 按钮文字

::: codeBox

> `btn-text` 用于在按钮上添加文字。

```vue
<template>
  <vc-switch :value="true" btn-text="弹幕" />
</template>
```
:::

## Props

| 参数 | 类型 | 说明 | 可选值 | 默认值 | 
|---|---|---|---|---|
| value | **boolean / string / number** | 绑定值 | --- | --- |
| r | **number** | 圆圈半径 | - | 16 |
| disabled | **boolean** | 是否禁用 | - | false |
| width | **number** | switch 的宽度（像素） | - | - |
| active-icon | **string** | 打开时所显示图标的类名 | - | - |
| inactive-icon | **string** | 关闭时所显示图标的类名 | - | - |
| active-text | **string** | 打开时的文字描述 | - | - |
| inactive-text | **string** | 关闭时的文字描述 | - | - |
| inset | **Boolean** | 控制文字显示在内部 | - | - |
| active-value | **boolean / string / number** | 打开时的值 | - | false |
| inactive-value | **boolean / string / number** | 关闭时的值 | - | false |
| active-color | **string** | switch 打开时的背景色 | - | - |
| inactive-color | **string** | switch 关闭时的背景色 | - | - |
| loading | **Boolean** | 加载状态，添加后，禁用不可点击 | - | - |
| btnText | **String** | 按钮文字 | - | - |


## Events

| 事件名称 | 说明 | 回调参数 | 
|---|---|---|---|---|
| change | switch 状态发生变化时的回调函数 | 新状态的值 |




