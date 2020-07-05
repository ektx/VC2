# Notification


::: demo
```html
<template>
  <vc-button @click="info">自动关闭</vc-button>
  <vc-button @click="success">手动关闭</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('vcNotification')

    function info () {
      message({
        type: 'info',
        message: '这是一个普通信息！'
      })
    }
    function success () {
      message.success('这是一个成功信息！')
    }
    function warning () {
      message.warning('这是一个警告信息！')
    }
    function error () {
      message.error('这是一个错误信息！')
    }

    return {
      info,
      success,
      warning,
      error
    }
  }
}
</script>
```
:::

## 自定义弹出位置
可以让 Notification 从屏幕四角中的任意一角弹出

::: demo
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
        type: 'info',
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