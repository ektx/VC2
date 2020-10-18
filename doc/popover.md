
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

  <vc-popover
    trigger="click"
    width="200px"
    title="标题"
    placement="top"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <template #reference>
      <vc-button>Click 激活</vc-button>
    </template>
  </vc-popover>

  <vc-popover
    trigger="focus" 
    width="200px"
    title="标题"
    placement="bottom"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <template #reference>
      <vc-button>focus 激活</vc-button>
    </template>
  </vc-popover>

  <vc-popover
    v-model="visible"
    trigger="manual" 
    width="200px"
    title="标题"
    placement="manual"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <vc-button @click="visible = !visible">手动激活</vc-button>
  </vc-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>

<style>
.vc-popover {
  margin-right: 20px;
}
</style>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|


## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
