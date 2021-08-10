
# InputNumber 计数器

## 基础效果

::: codeBox 
```vue
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

::: codeBox 
```vue
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

::: codeBox 
```vue
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

## 精度

::: codeBox 
```vue
<template>
  <p>{{ value }}</p>
  <vc-input-number :precision="2" :step="0.2" v-model="value"/>
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

## 大小控制

::: codeBox 

> `size` 设置字体大小  
> `width` 设置宽度  

```vue
<template>
  <vc-input-number size="24px" width="100px" v-model="value"/>
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

## 简洁模式

控制按钮只在鼠标交互时显示。

::: codeBox 
```vue
<template>
  <vc-input-number clear-mode v-model="value"/>
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
| v-model | `Number` | 绑定值 | - | 0 |
| min | `Number` | 设置计数器允许的最小值 | - | -Infinity |
| max | `Number` | 设置计数器允许的最大值 | - | Infinity |
| step | `Number` | 计数器步长 | - | 1 |
| size | `String` | 设置大小 | - | 12px |
| width | `String` | 设置宽度 | - | 8em |
| precision | `Number` | 数值精度 | - | 0 |
| disabled | `Boolean` | 是否禁用计数器 | - | false |
| clearMode | `Boolean` | 简洁模式 | - | false |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值被改变时触发 | 返回当前值 |