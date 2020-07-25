# Layer 弹层

## 基础效果

::: demo 
```html
<template>
  <vc-button @click="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer v-model:show="open" title="hello world">
    <p>这是一段信息</p>
    <template #footer>
      <vc-button>取消</vc-button>
      <vc-button @click="open = false">确认</vc-button>
    </template>
  </vc-layer>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
};
</script>
```
:::

## Poprs

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| show | `Boolean` | 是否显示弹层 | false | - |
| title | `String` | 弹层的标题 | 标题 | - |
| width | `String` | 调整弹层的宽度<br>eg: `width="200px"` | - | - |
| closeModal | `Boolean` | 点击背景不消失 | false | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时触发 | - |
| closed | 弹层完全关闭后触发 | - |
| open | 弹层打开时触发 | - |
| opened | 弹层完全打开后触发 | - |