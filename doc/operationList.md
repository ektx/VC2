
# OperationList 操作列表

## 基础效果

::: demo 
```html
<template>
  <vc-operation-list v-model="value" :head="head" :list="list"/>
</template>

<script>
export default {
  data() {
    return {
      head: [
        {
          label: '名称',
          key: 'label'
        },
        {
          label: '值',
          key: 'value'
        }
      ],
      list: [
        {
          label: 'Wifi',
          value: 1
        },
        {
          label: 'iPhone USB',
          value: 2
        },
        {
          label: '蓝牙',
          value: 3
        }
      ],
      value: 1
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
