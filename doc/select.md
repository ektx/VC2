# Select

::: demo
```html
<template>
  <vc-select v-model.value="value" :options="options">
  </vc-select>
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