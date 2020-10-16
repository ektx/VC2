
# Popover 弹出框

## 基础效果

::: demo 
```html
<template>
  <vc-popover
    trigger="hover"
    width="200px"
    title="标题"
    placement="bottom"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <template #reference>
      <vc-button>hover 激活</vc-button>
    </template>
  </vc-popover>
</template>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|


## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
