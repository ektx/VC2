
# InputNumber 数字输入框

## 基础效果

::: demo 
```html
<template>
  <vc-input-number :min="0" :max="5" v-model="value"/>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  }
}
</script>
```
:::

## 禁用效果

::: demo 
```html
<template>
  <vc-input-number disabled v-model="value"/>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  }
}
</script>
```
:::

## 步数

允许定义递增递减的步数控制

::: demo 
```html
<template>
  <vc-input-number :step="2" v-model="value"/>
</template>

<script>
export default {
  data() {
    return {
      value: 0
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
