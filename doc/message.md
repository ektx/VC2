# Message 消息提示

## 各种状态

默认提醒 3s 后消失。

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
    let message = inject('vcMessage')

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


## 手动关闭

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
    let message = inject('vcMessage')

    function info () {
      message({
        type: 'info',
        showClose: true,
        duration: 0,
        message: '这是一个普通信息！'
      })
    }
    function success () {
      message({
        type: 'success',
        showClose: true,
        duration: 0,
        message: '这是一个成功信息！'
      })
    }
    function warning () {
      message({
        type: 'warning',
        showClose: true,
        duration: 0,
        message: '这是一个警告信息！'
      })
    }
    function error () {
      message({
        type: 'error',
        showClose: true,
        duration: 0,
        message: '这是一个错误信息！'
      })
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

## 定时功能

::: demo
```html
<template>
  <vc-button @click="info">8s后关闭</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('vcMessage')

    function info () {
      message({
        type: 'info',
        duration: 8000,
        message: '8s后将消失！！'
      })
    }

    return {
      info,
    }
  }
}
</script>
```
:::

## 使用 HTML 片段

::: demo
```html
<template>
  <vc-button @click="info">使用 HTML 片段</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('vcMessage')

    function info () {
      message({
        useHtml: true,
        message: '🎉 <strong>hello World！！</strong>'
      })
    }

    return {
      info,
    }
  }
}
</script>
```
:::


## 灵活控制

可以接收一个返回 `close()` 事件。

::: demo
```html
<template>
  <vc-button @click="show">Show</vc-button>
  <vc-button @click="close">Close</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('vcMessage')
    let myMes = null

    function show () {
      if (!myMes) {
        myMes = message({
          duration: 0,
          message: '🎉 hello World!'
        })
      }
    }

    function close () {
      myMes.close()
      myMes = null
    }

    return {
      show,
      close
    }
  }
}
</script>
```
:::

## 自定义样式

::: demo
```html
<template>
  <vc-button @click="show">Show</vc-button>
</template>

<script>
export default {
  setup() {
    let message = inject('vcMessage')

    function show () {
      message({
        classes: 'my-class-name',
        message: '这是自定义样式效果!'
      })
    }

    return {
      show
    }
  }
}
</script>

<style>
.my-class-name {
  color: yellowgreen !important;
  font-size: 16px !important;
}
</style>
```
:::