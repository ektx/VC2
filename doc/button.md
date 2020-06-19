# Button 按钮

## 示例

基础效果演示

::: demo
```html
<template>
  <input v-model:value="msg" />
</template>

<script>
export default {
  setup () {
    let msg = 'hello'

    return {
      msg
    }
  }
}
</script>
```
:::

## Poprs

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| `type` | **string** | 定义按钮的外形 | - | 'text' |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
