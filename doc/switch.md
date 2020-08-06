# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」

## 基础示例

::: demo
```html
<template>
  <div>
    <vc-switch v-model:value="switch1" active-color="#13ce66" inactive-color="#ff4949" @change="change" active-value="100" inactive-value="0"></vc-switch>
  </div>
</template>

<script>
export default {
  setup() {
    let switch1 = ref(null);
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

## 文字描述(switch 外部)

::: demo

> `active-icon-class` 设置图标

```html
<template>
  <div>
    <vc-switch :value="true" active-icon-class="vc-icon-search" active-text="按月付费" inactive-text="按年付费" />
    
    <br/>

    <vc-switch :value="false" active-text="按月付费" inactive-text="按年付费" />
  </div>  
</template>

```
:::

## 文字描述(switch内部)

::: demo
```html
<template>
  <div>
    <vc-switch v-model:value="switch1" inactive-icon-class-inside="vc-icon-search"></vc-switch>
    <vc-switch v-model:value="switch2" inactive-icon-class-inside="vc-icon-search" inactive-text-inside="关闭" active-text-inside="开启"></vc-switch>
  </div>
  
</template>

<script>
export default {
  setup() {
    let switch1 = ref(true);
    let switch2 = ref(false);
    
    return {
      switch1,
      switch2,
      
    }
  }
}
</script>
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


## 禁用

::: demo
```html
<template>
  <div>
    <vc-switch v-model:value="switch1" disabled></vc-switch>
    <vc-switch v-model:value="switch2" disabled></vc-switch>
  </div>
</template>

<script>
export default {
  setup() {
    let switch1 = ref(true);
    let switch2 = ref(false);
    
    return {
      switch1,
      switch2,
      
    }
  }
}
</script>
```
:::

## 切换禁用状态

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

## Props

| 参数 | 类型 | 说明 | 可选值 | 默认值 | 
|---|---|---|---|---|
| v-model:value | **boolean / string / number** | 绑定值 | --- | --- |
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




