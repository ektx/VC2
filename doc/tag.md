# Tag 标签

用于标记和选择。

::: codeBox
```vue
<template>
  <vc-tag>标签一</vc-tag>
  <vc-tag type="success">标签二</vc-tag>
  <vc-tag type="info">标签三</vc-tag>
  <vc-tag type="warning">标签四</vc-tag>
  <vc-tag type="danger">标签五</vc-tag>
  <vc-tag color="#9c27b0">标签六</vc-tag>
</template>

<style scoped>
.vc-tag {
  margin: 0 10px 0 0;
}
</style>
```
:::


## 可移除标签

::: codeBox
```vue
<template>
  <vc-tag
    v-for="tag in tags"
    :key="tag.label"
    :type="tag.type"
    :color="tag.color"
    closable
  >
    {{tag.label}}
  </vc-tag>

  <vc-tag-group closable :list="tags" @change="onChange" @clickItem="onClickItem"/>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { label: '标签一', type: '' },
        { label: '标签二', type: 'success' },
        { label: '标签三', type: 'info' },
        { label: '标签四', type: 'warning' },
        { label: '标签五', type: 'danger' },
        { label: '标签六', color: '#9c27b0' }
      ]
    };
  },
  methods: {
    onChange({event, index, data}) {
      console.log(event, index, data)
    },
    onClickItem({ index, item }) {
      console.log(index, item)
    }
  }
}
</script>

<style lang="less" scoped>
.vc-tag {
  margin: 0 10px 0 0;
}
.vc-tag-group {
  margin: 10px 0 0;
}
</style>
```
:::


## 别名使用

::: codeBox
```vue
<template>
  <vc-tag-group :list="tags" :alias="alias"/>
</template>

<script>
  export default {
    data() {
      return {
        tags: [
          { text: '标签一', status: '' },
          { text: '标签二', status: 'success' },
          { text: '标签三', status: 'info' },
          { text: '标签四', status: 'warning' },
          { text: '标签五', status: 'danger' },
          { text: '标签六', color: '#9c27b0' }
        ],
        alias: {
          label: 'text',
          type: 'status'
        }
      };
    }
  }
</script>
```
:::


## 圆角与边框设置

::: codeBox
```vue
<template>
  <vc-tag
    v-for="tag in tags"
    :key="tag.label"
    :type="tag.type"
    :color="tag.color"
    :radius="15"
    :border="0"
  >
    {{tag.label}}
  </vc-tag>

  <vc-tag-group :list="tags" radius="15px" border="2px" />
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { label: '标签一', type: '' },
        { label: '标签二', type: 'success' },
        { label: '标签三', type: 'info' },
        { label: '标签四', type: 'warning' },
        { label: '标签五', type: 'danger' },
        { label: '标签六', color: '#9c27b0' }
      ]
    };
  }
}
</script>

<style lang="less">
.vc-tag-group {
  margin: 10px 0 0;
}
</style>
```
:::


## 尺寸控制

::: codeBox

> 通过 `size` 来设置显示大小。

```vue
<template>
  <vc-tag
    v-for="tag in tags"
    :key="tag.label"
    :type="tag.type"
    :color="tag.color"
    :size="tag.size"
  >
    {{tag.label}}
  </vc-tag>

  <vc-tag-group :list="tags" />

  <vc-tag-group :list="tags" size="12" />
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { label: '标签一', size: 18, type: ''},
        { label: '标签二', size: 16, type: 'success' },
        { label: '标签三', size: 14, type: 'info' },
        { label: '标签四', size: 12, type: 'warning' },
        { label: '标签五', size: 10, type: 'danger' },
        { label: '标签六', size: 5, color: '#9c27b0' }
      ]
    };
  }
}
</script>

<style lang="less">
.vc-tag-group {
  margin: 10px 0 0;
}
</style>
```
:::

## Padding 设置

::: codeBox
```vue
<template>
  <vc-tag type="info" padding="5px">标签三</vc-tag>
  <vc-tag type="info" padding="5px 10px">标签三</vc-tag>
  <vc-tag type="info" padding="5px 10px 15px 20px">标签三</vc-tag>
</template>

<style scoped>
.vc-tag {
  margin: 0 10px 0 0;
}
</style>
```
:::


## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 close 事件来实现

::: codeBox

> 通过 `size` 来设置显示大小。

```vue
<template>
  <vc-tag-group 
    :list="tags" 
    closable 
    editable 
    @addItem="addItem" 
    @removeItem="removeItem" 
    @clickItem="clickItem"
  />
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { label: '标签一', type: '' },
        { label: '标签二', type: 'success' },
        { label: '标签三', type: 'info' },
        { label: '标签四', type: 'warning' }
      ]
    };
  },
  methods: {
    addItem(item) {
      console.log('添加的标签为:', item)
      this.tags.push({
        ...item,
        color: '#9c27b0'
      })
    },
    removeItem(item) {
      console.log('删除的标签为:', item)

      this.tags.splice(item.index, 1)
    },
    clickItem(item) {
      console.log('当前点击的标签为:', item)
    }
  }
}
</script>

<style lang="less">
.vc-tag-group {
  margin: 10px 0 0;
}
</style>
```
:::

## 不同主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`

::: codeBox

> 通过 `size` 来设置显示大小。

```vue
<template>
  <p>light - default</p>
  <vc-tag-group :list="tags"/>
  <p>dark</p>
  <vc-tag-group :list="tags" theme="dark" />
  <p>plain</p>
  <vc-tag-group :list="tags" theme="plain" />
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { label: '标签一', type: '' },
        { label: '标签二', type: 'success' },
        { label: '标签三', type: 'info' },
        { label: '标签四', type: 'warning' },
        { label: '标签五', type: 'danger' },
        { label: '标签六', color: '#9c27b0' }
      ]
    };
  }
}
</script>

<style lang="less">
.vc-tag-group {
  margin: 10px 0 0;
}
</style>
```
:::

# Tag 属性

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| type | `String` | 类型 用于快速设置颜色 | - | success/info/warning/danger |
| color | `String` | 设置颜色 | - | - | 
| padding | `String` | 设置 padding | - | - | 
| radius | `String/number` | 设置圆角 | - | - | 
| border | `String/number` | 设置边框粗细 | `1px` | - | 
| closable | `Boolean` | 是否可关闭 | `false` | - | 
| size | `String/number` | 设置按钮大小 | `14px` | - | 
| theme | `String` | 设置主题 | `light` | lighr/dark/plain | 
# Tag Group 属性

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| list | `ListItem[]` | 标签列表 | - | success/info/warning/danger |
| type | `String` | 类型 用于快速设置颜色 | - | success/info/warning/danger |
| color | `String` | 设置颜色 | - | - | 
| padding | `String` | 设置 padding | - | - | 
| radius | `String/number` | 设置圆角 | - | - | 
| border | `String/number` | 设置边框粗细 | `1px` | - | 
| closable | `Boolean` | 是否可关闭 | `false` | - | 
| size | `String/number` | 设置按钮大小 | `14px` | - | 
| theme | `String` | 设置主题 | `light` | lighr/dark/plain | 
| alias | `Object` | 设置 ListItem 属性对应的别名 | - | - | 
| editable | `Boolean` | 可编辑的 | `false` | - | 
| btnIcon | `String` | 按钮图标 | `vc-icon-plus` | - | 
| btnText | `String` | 按钮文字 | `New Tag` | - | 

## ListItem 属性

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| label | `String` | 显示内容 | - | - |
| type | `String` | 类型 用于快速设置颜色 | - | success/info/warning/danger |
| color | `String` | 设置颜色 | - | - | 
| size | `String/number` | 设置按钮大小 | `14px` | - | 
