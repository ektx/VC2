
# Progress 进度条

## 基础效果

::: demo 
```html
<template>
  <vc-progress :value="30"/>
  <vc-progress :value="100">完成</vc-progress>
  <vc-progress :value="100" status="success"/>
  <vc-progress :value="100" status="warning"/>
  <vc-progress :value="100" status="error"/>
</template>
```
:::


## 隐藏提示

::: demo 
```html
<template>
  <vc-progress text-type="none" :value="30"/>
  <vc-progress text-type="none" :value="100">完成</vc-progress>
  <vc-progress text-type="none" :value="90" status="error"/>
 
  <vc-progress text-type="inner" :stroke-width="20" :value="30"/>
  <vc-progress text-type="inner" :stroke-width="20" :value="100">完成</vc-progress>
  <vc-progress text-type="inner" :stroke-width="20" :value="90" status="error"/>
</template>
```
:::


## 隐藏提示

::: demo 
```html
<template>
  <vc-progress text-type="none" :value="30"/>
  <vc-progress text-type="none" :value="100">完成</vc-progress>
  <vc-progress text-type="none" :value="90" status="error"/>
 
  <vc-progress text-type="inner" :stroke-width="20" :value="30"/>
  <vc-progress text-type="inner" :stroke-width="20" :value="100">完成</vc-progress>
  <vc-progress text-type="inner" :stroke-width="20" :value="90" status="error"/>
</template>
```
:::

## 自定义颜色

::: demo 
```html
<template>
  <vc-progress :value="value" color="#f90"/>
  <vc-progress :value="value" :color="customColors"/>
  <vc-progress :value="value"/>
 
  <vc-button-group>
    <vc-button icon="vc-icon-minus" @click="del"/>
    <vc-button icon="vc-icon-plus" @click="add"/>
  </vc-button-group>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
      customColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ]
    }
  },
  methods: {
    add() {
      let val = this.value + 10

      this.value = val > 100 ? 100 : val
    },
    del() {
      let val = this.value - 10

      this.value = val > 0 ? val : 0
    }
  }
}
</script>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|


## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
