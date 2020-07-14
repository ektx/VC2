# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options"/>
</template>

<script>
export default {
  setup() {
    const value = ref('')
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::

## 有禁用选项

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options"/>
</template>

<script>
export default {
  setup() {
    const value = ref('选项2')
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶',
      disabled: true
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::

## 基础多选

适用性较广的基础多选，用 Tag 展示已选项

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" multiple/>
  <vc-select v-model:value="value" :options="options" multiple collapse-tags :max-tag-count="2"/>
</template>

<script>
export default {
  setup() {
    const value = ref(['选项2', '选项4'])

    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::