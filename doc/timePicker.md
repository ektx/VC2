
# TimePicker 时间选择器

## 基础效果

::: codeBox
```vue
<template>
  {{ value1 }}
  <vc-time-picker v-model="value1"/>

  {{ value2 }}
  <vc-time-picker 
    format="H:m"
    value-format="HH:mm"
    v-model="value2"
  />
</template>

<script>
export default {
  data() {
    return {
    value1: new Date(2020, 11, 13, 13, 50),
    value2: '03:06'
    }
  }
}
</script>
```
:::


## 固定时间点

提供几个固定的时间点供用户选择

::: codeBox
```vue
<template>
  {{ value1 }}
  <vc-time-picker 
    v-model="value1"
    time-block="8:30:00-11:30:30|13:00:00-17:30:00"
  />
</template>

<script>
export default {
  data() {
    return {
    value1: new Date(2020, 11, 13, 13, 5, 8),
    }
  }
}
</script>
```
:::

## 禁用效果

::: codeBox
```vue
<template>
  <vc-time-picker disabled v-model="value1"/>
</template>

<script>
export default {
  data() {
    return {
    value1: new Date(2020, 11, 13, 13, 5, 8),
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
