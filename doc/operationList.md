
# OperationList 操作列表

## 基础效果

::: codeBox 
```vue
<template>
  <vc-operation-list 
    v-model="value" 
    :head="head" 
    :list="list" 
    buttons
    @add="onChange"
    @delete="onDelete"
  />
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
  },
  methods: {
    onChange() {
      alert('add')
    },
    onDelete() {
      alert('delete')
    }
  }
}
</script>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| v-model | **Number / String** | 值 | - |
| head | **Array** | 表头 | - |
| list | **Array** | 列表 | - |
| labelAlias | **String** | label 别名 | - | label |
| keyAlias | **String** | key 别名 | - | key |
| buttons | **Boolean** | key 别名 | - | false |
| height | **Boolean** | 设置高度 | - | auto |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| add | 添加按钮事件 | - |
| delete | 删除按钮事件 | - |
