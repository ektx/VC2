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
        message: '这是一个普通信息！'
      })
    }
    function success () {
      message({
        type: 'success',
        showClose: true,
        message: '这是一个成功信息！'
      })
    }
    function warning () {
      message({
        type: 'warning',
        showClose: true,
        message: '这是一个警告信息！'
      })
    }
    function error () {
      message({
        type: 'error',
        showClose: true,
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

通过定义一个变量接收返回对象，来灵活控制显示与隐藏。返回对象包含有 `show` 与 `close` 方法。

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
    let myMes 

    function show () {
      if (myMes && 'show' in myMes) {
        myMes.show()
      } else {
        myMes = message({
          // 不可省略，省略会导致自动关闭
          showClose: true,
          message: '🎉 hello World!'
        })
      }
    }

    function close () {
      myMes.close()
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
        type: 'info',
        showClose: true,
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