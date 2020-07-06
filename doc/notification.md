# Notification 通知

## 基础效果

::: demo

> `duration` 设置为 **0** 时，将不会自动关闭

```html
<template>
  <vc-button @click="auto">自动关闭</vc-button>
  <vc-button @click="close">手动关闭</vc-button>
</template>

<script>
export default {
  setup() {
    let notify = inject('vcNotification')

    function auto () {
      notify({
        title: '自动关闭',
        message: '这是一个普通信息！'
      })
    }

    function close () {
      notify({
        title: '手动关闭',
        duration: 0,
        message: '这条提醒需要你手动关闭它'
      })
    }

    return {
      auto,
      close
    }
  }
}
</script>
```
:::

## 自定义弹出位置

可以让 Notification 从屏幕四角中的任意一角弹出。

::: demo

> 通过 `position` 来定位显示位置。

```html
<template>
  <vc-button @click="open('top-right')">右上角</vc-button>
  <vc-button @click="open('bottom-right')">右下角</vc-button>
  <vc-button @click="open('top-left')">左上角</vc-button>
  <vc-button @click="open('bottom-left')">左下角</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('vcNotification')

    function open (position) {
      message({
        position,
        title: '标题名称',
        message: '这是一个普通信息！'
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

## 带有倾向性

带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息。

::: demo

> `type`

```html
<template>
  <vc-button @click="open('info')">消息</vc-button>
  <vc-button @click="open('success')">成功</vc-button>
  <vc-button @click="open('warning')">警告</vc-button>
  <vc-button @click="open('error')">失败</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('vcNotification')

    function open (type) {
      message({
        type,
        icon: 'vc-icon-success',
        title: '标题名称',
        duration: 0,
        message: '这是一个普通信息！'
      })
    }

    return { open }
  }
}
</script>
```
:::

## 自定义图片与图标

::: demo
```html
<template>
  <vc-button @click="icon">使用图标</vc-button>
  <vc-button @click="img">使用图片</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('vcNotification')

    function icon () {
      message({
        icon: 'vc-icon-coffee',
        title: '标题名称',
        message: '这是一个普通信息！'
      })
    }

    function img () {
      message({
        img: '/example/public/logo.png',
        title: '标题名称',
      })
    }

    return {
      img,
      icon
    }
  }
}
</script>
```
:::