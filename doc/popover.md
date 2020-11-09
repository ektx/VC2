
# Popover 弹出框

Popover 是基于 popper 扩展的功能。具体可以访问 [popper](https://popper.js.org/)。

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
    placement="bottom"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <template #reference>
      <vc-button @click="visible = !visible">手动激活</vc-button>
    </template>
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

## 嵌套信息

可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。

::: demo
```html
<template>
  <vc-popover
    trigger="click"
    width="450px"
    placement="right"
  >
    <vc-table :data="data" :header="header"/>

    <template v-slot:reference>
      <vc-button>hover 激活</vc-button>
    </template>
  </vc-popover>
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: '100px'
        },
        {
          label: '时间',
          key: 'date',
          width: '100px'
        },
        {
          label: '地址',
          key: 'address',
        }
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    }
  }
}
</script>
```
:::

## 嵌套操作

当然，你还可以嵌套操作，这相比 Dialog 更为轻量：

::: demo
```html
<template>
<vc-popover
  v-model="visible"
  trigger="manual" 
  width="200px"
  placement="bottom"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
>
  <p>这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin: 10px">
    <vc-button type="text" @click="visible = false">取消</vc-button>
    <vc-button color="primary" @click="visible = false">确定</vc-button>
  </div>
  <template #reference>
    <vc-button @click="visible = !visible">手动激活</vc-button>
  </template>
</vc-popover>
</template>

<script>
export default {
  setup() {
    return {
      visible: ref(false)
    }
  }
}
</script>
```
:::

## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| v-model | **Boolean** | 状态是否可见 | - | null |
| placement | **String** | 出现位置 | top/top-start/top-end/<br/>bottom/bottom-start/bottom-end/<br/>left/left-start/left-end/<br/>right/right-start/right-end | bottom |
| trigger | **String** | 触发方式 | hover/click/focus/manual | hover |
| title | **String** | 标题 | - | - |
| content | **String** | 显示的内容，也可以通过 slot 传入 `DOM` | - | - |
| width | **String** | 宽度 | - | auto |

## Slot

| 参数 | 说明 | 
| --- | --- | 
| - | Popover 内嵌 HTML 文本 |
| reference | 触发 Popover 显示的 HTML 元素 |
