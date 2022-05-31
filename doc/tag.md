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

<style>
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

<style lang="less">
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
        { label: '标签一', type: '', size: 18 },
        { label: '标签二', type: 'success', size: 16 },
        { label: '标签三', type: 'info', size: 14 },
        { label: '标签四', type: 'warning', size: 12 }
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