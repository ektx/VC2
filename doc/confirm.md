# Confirm 确认框

## 消息提示

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

::: demo 
```html
<template>
  <vc-button @click="open">点击打开</vc-button>
</template>

<script>
export default {
  methods: {
    open() {
      this.VcConfirm({
        title: '标题名称',
        message: '这是一段内容',
        type: 'alert',
      }).then(data => {
        console.log('确认了消息:'+data)
      }).catch(err => {
        console.log('关闭了消息:'+err)
      })
    }
  }
}
</script>
```
:::

## 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

::: demo 
```html
<template>
  <vc-button @click="open()">点击打开</vc-button>
</template>

<script>
export default {
  setup() {
    function open() {
      this.VcConfirm({
        title: '标题名称',
        message: '这是一段内容',
        type: 'confirm'
      }).then(data => {
        console.log('确认了消息:'+data)
      }).catch(err => {
        console.log('关闭了消息:'+err)
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
