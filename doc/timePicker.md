
# TimePicker 时间选择器

## 基础效果

::: demo 
```html
<template>
  {{ value1 }}
  <vc-time-picker 
    format="H:m:s"
    v-model="value1"
  />

  {{ value2 }}
  <vc-time-picker 
    format="H:m"
    value-format="H:m"
    v-model="value2"
  />
</template>

<script>
export default {
  data() {
    return {
    value1: new Date(2020, 11, 13, 13, 50),
    value2: '13:50'
    }
  }
}
</script>
```
:::


## 固定时间点

提供几个固定的时间点供用户选择

::: demo 
```html
<template>
  {{ value1 }}
  <vc-time-picker 
    format="H:m:s"
    v-model="value1"
    time-block="8:30:00-11:30:59|13:00:00-17:30:00"
  />
</template>

<script>
export default {
  data() {
    return {
    value1: new Date(2020, 11, 13, 13, 50),
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
