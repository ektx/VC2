
# Popover 弹出框

## 展示位置

:::codeBox
```vue
<template>
  <ul>
    <li>
      <vc-popover
        trigger="hover"
        title="标题"
        area="top-left"
        content="这是一段内容。"
      >
        <template #reference>
          <vc-button>top left</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="top span-left"
        content="this is top span-left"
      >
        <template #reference>
          <vc-button>top span-left</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="标题"
        area="top"
        content="这是一段内容。"
      >
        <template #reference>
          <vc-button>top</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="top span-right"
        content="this is top span-right"
      >
        <template #reference>
          <vc-button>top span-right</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="top-right"
        content="this is top-right"
      >
        <template #reference>
          <vc-button>top-right</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="left span-top"
        content="this is left span-top"
      >
        <template #reference>
          <vc-button>left span-top</vc-button>
        </template>
      </vc-popover>
    </li>
    <li style="grid-column: 2 / span 3"></li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="right span-top"
        content="this is right span-top"
      >
        <template #reference>
          <vc-button>right span-top</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="left"
        content="this is left"
      >
        <template #reference>
          <vc-button>left</vc-button>
        </template>
      </vc-popover>
    </li>
    <li style="grid-column: 2 / span 3"></li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="right"
        content="this is right"
      >
        <template #reference>
          <vc-button>right</vc-button>
        </template>
      </vc-popover>
    </li>
    
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="left span-bottom"
        content="this is left span-bottom"
      >
        <template #reference>
          <vc-button>left span-bottom</vc-button>
        </template>
      </vc-popover>
    </li>
    <li style="grid-column: 2 / span 3"></li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="right span-bottom"
        content="this is right span-bottom"
      >
        <template #reference>
          <vc-button>right span-bottom</vc-button>
        </template>
      </vc-popover>
    </li>

    <li>
      <vc-popover
        trigger="hover"
        title="标题"
        area="bottom-left"
        content="这是一段内容。"
      >
        <template #reference>
          <vc-button>bottom-left</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="bottom span-left"
        content="this is bottom span-left"
      >
        <template #reference>
          <vc-button>bottom span-left</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="标题"
        area="bottom"
        content="this is bottom"
      >
        <template #reference>
          <vc-button>bottom</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="bottom span-right"
        content="this is bottom span-right"
      >
        <template #reference>
          <vc-button>bottom span-right</vc-button>
        </template>
      </vc-popover>
    </li>
    <li>
      <vc-popover
        trigger="hover"
        title="title"
        area="bottom-right"
        content="this is bottom-right"
      >
        <template #reference>
          <vc-button>bottom-right</vc-button>
        </template>
      </vc-popover>
    </li>
  </ul>
</template>

<style lang="css" scoped>
ul {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  list-style: none;

  li {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
    }
  }
}
</style>
```
:::


Popover 是基于 popper 扩展的功能。具体可以访问 [floating-ui](https://floating-ui.com/)。

## 基础效果

::: codeBox 
```vue
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
    area="left  center"
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
    placement="left"
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
    placement="right"
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

可以在 Popover 中嵌套其它组件， 以下为嵌套表格的例子。

::: codeBox
```vue
<template>
  <vc-popover
    trigger="click"
    :width="100"
    area="left"
  >
    <vc-table :data="data" :header="header"/>

    <template v-slot:reference>
      <vc-button>Click 激活</vc-button>
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

当然，你还可以嵌套操作，这相比 Layer 更为轻量：

::: codeBox
```vue
<template>
<vc-popover
  v-model="visible"
  popover="manual" 
  width="200px"
  area="left"
>
  <p>这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin-top: 10px">
    <vc-button type="text" @click="visible = false">取消</vc-button>
    <vc-button type="text" color="primary" @click="visible = false">确定</vc-button>
  </div>
  <template #reference>
    <vc-button @click="visible = !visible">Delete</vc-button>
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
```
:::

## 确认信息操作

当然，你还可以嵌套操作，这相比 Layer 更为轻量：

::: codeBox
```vue
<template>
<vc-popover
  trigger="click" 
  width="200px"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  confirm-button="OK"
  cancel-button="No, Thanks"
  @confirm="confirmEvent"
  @cancel="cancelEvent"
>
  <template #reference>
    <vc-button @click="visible = !visible">删除</vc-button>
  </template>
</vc-popover>

<vc-popover
  trigger="click" 
  width="200px"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  confirm-button
  @confirm="confirmEvent"
  @cancel="cancelEvent"
>
  <template #reference>
    <vc-button @click="visible = !visible">只确认删除</vc-button>
  </template>
</vc-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    confirmEvent() {
      console.log('Yes')
    },
    cancelEvent() {
      console.log('No...')
    }
  }
}
</script>
```
:::

## 属性

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| v-model | **Boolean** | 状态是否可见 | - | null |
| placement | **String** | 出现位置 | top/top-start/top-end/<br/>bottom/bottom-start/bottom-end/<br/>left/left-start/left-end/<br/>right/right-start/right-end | bottom |
| trigger | **String** | 触发方式 | hover/click/focus/manual | hover |
| title | **String** | 标题 | - | - |
| content | **String** | 显示的内容，也可以通过 slot 传入 `DOM` | - | - |
| width | **String** | 宽度 | - | auto |
| confirmButton | **Boolean/String** | 确认按钮 | - | false |
| cancelButton | **Boolean/String** | 取消按钮 | - | false |

## 插槽

| 参数 | 说明 | 
| --- | --- | 
| - | Popover 内嵌 HTML 文本 |
| reference | 触发 Popover 显示的 HTML 元素 |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 确认信息时，返回 `true` | - |
| cancel | 取消事件时触发，返回 `false` | - |
