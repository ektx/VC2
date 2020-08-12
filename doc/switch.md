# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」

## 基础示例

::: demo
```html
<template>
  <vc-switch v-model:value="switch1" active-color="#13ce66" inactive-color="#ff4949" @change="change" active-value="100" inactive-value="0"></vc-switch>
</template>

<script>
export default {
  setup() {
    let switch1 = ref(100);
    let message = inject('vcMessage')

    const change = event =>{
      message({
        type: 'info',
        message: event
      }) 
    }

    return {
      switch1,
      change,
    }
  }
}
</script>
```
:::

## 外部文字描述

::: demo

> `active-icon-class` 设置图标

```html
<template>
  <vc-switch :value="true" active-icon="vc-icon-sunny" active-text="白天" inactive-icon="vc-icon-moon" inactive-text="夜晚" />
  
  <br/>
  <br/>

  <vc-switch active-color="#13ce66" active-text="按月付费" inactive-color="#ff4949" inactive-text="按年付费" />
</template>

```
:::

## 内部文字描述

::: demo
```html
<template>
  <vc-switch inset :value="false" active-icon="vc-icon-check" inactive-icon="vc-icon-close"></vc-switch>

  <br/>
  <br/>

  <vc-switch inset :value="true" active-icon="vc-icon-check" inactive-icon="vc-icon-close" inactive-text="关闭" active-text="开启" />
</template>
```
:::


## 加载中

::: demo
```html
<template>
  <div>
    <vc-switch v-model:value="switch1" loading></vc-switch>
  </div>
  
</template>

<script>
export default {
  setup() {
    let switch1 = ref(true);
  
    return {
      switch1,
    }
  }
}
</script>
```
:::

## 禁用状态

::: demo
```html
<template>
  <div> 
    <vc-switch v-model:value="switch1" :disabled="disabled"></vc-switch>
    <br/>
    <vc-button @click="disabled = !disabled">Toggle Disabled</vc-button>
  </div>
  
</template>

<script>
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

::: demo
```html
<template>
  <vc-switch inset :width="100" :value="true" inactive-text="关闭" active-text="opened!"></vc-switch>
  
  <br/>
  <br/>

  <vc-switch inset :value="false" inactive-text="去睡觉" active-text="😪zzzzzzz"></vc-switch>
</template>
```
:::

## 大小控制

::: demo
```html
<template>
  <vc-switch :value="true" :r="12"></vc-switch>
  <vc-switch :value="true" :r="14"></vc-switch>
  <vc-switch :value="true" :r="18"></vc-switch>
</template>
```
:::

## Props

| 参数 | 类型 | 说明 | 可选值 | 默认值 | 
|---|---|---|---|---|
| value | **boolean / string / number** | 绑定值 | --- | --- |
| r | **number** | 圆圈半径 | --- | 16 |
| disabled | **boolean** | 是否禁用 | --- | false |
| width | **number** | switch 的宽度（像素） | --- | 45 |
| active-icon-class | **string** | switch 打开时所显示图标的类名，设置此项会忽略 active-text(外部) | --- | --- |
| active-icon-class-inside | **string** | switch 打开时所显示图标的类名，设置此项会忽略 active-text-inside(内部) | --- | --- |
| inactive-icon-class | **string** | switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text(外部) | --- | --- |
| inactive-icon-class-inside | **string** | switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text-inside(内部) | --- | --- |
| active-text | **string** | switch 打开时的文字描述 | --- | --- |
| inactive-text | **string** | switch 关闭时的文字描述 | --- | --- |
| active-text-inside | **string** | switch 打开时的文字描述(switch内部) | --- | --- |
| inactive-text-inside | **string** | switch 关闭时的文字描述(switch内部) | --- | --- |
| active-value | **boolean / string / number** | switch 打开时的值 | --- | false |
| inactive-value | **boolean / string / number** | switch 关闭时的值 | --- | false |
| active-color | **string** | switch 打开时的背景色 | --- | #409EFF |
| inactive-color | **string** | switch 关闭时的背景色 | --- | #C0CCDA |



## Events

| 事件名称 | 说明 | 回调参数 | 
|---|---|---|---|---|
| change | switch 状态发生变化时的回调函数 | 新状态的值 |




