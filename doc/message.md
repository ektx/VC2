# Message

::: demo
```html
<template>
  <vc-button @click="info">提醒</vc-button>
  <vc-button @click="success" color="success">成功</vc-button>
  <vc-button @click="warning" color="warn">警告</vc-button>
  <vc-button @click="error" color="error">失败</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('message')

    function info () {
      message.info('这是一个普通信息！')
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