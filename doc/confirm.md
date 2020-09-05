
# confirm

## Alert 效果

::: demo 
```html
<template>
  <vc-button @click="open()">点击打开 Confirm Alert 提示</vc-button>
</template>

<script>
export default {
  setup() {
    function open() {
      console.log(this)
      this.VcConfirm({
        title: '标题名称',
        message: '这是一段内容',
        type: 'alert'
      // }).then(data => {
      //   console.log(data)
      })
    }

    return {
      open
    }
  }
}
</script>
```
:::

## Confirm 效果

::: demo 
```html
<template>
  <vc-button @click="open()">点击打开 Confirm Alert 提示</vc-button>
</template>

<script>
export default {
  setup() {
    function open() {
      console.log(this)
      this.VcConfirm({
        title: '标题名称',
        message: '这是一段内容',
        type: 'confirm'
      // }).then(data => {
      //   console.log(data)
      })
    }

    return {
      open
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
