# Message 消息提示

## 各种状态

默认提醒 3s 后消失。

::: codeBox
```vue
<template>
  <vc-button-group>
    <vc-button @click="info">提醒</vc-button>
    <vc-button @click="success" theme="success">成功</vc-button>
    <vc-button @click="warning" theme="warn">警告</vc-button>
    <vc-button @click="error" theme="error">失败</vc-button>
  </vc-button-group>
</template>

<script setup>
import { VcMessage } from '../../../../packages/index'

function info () {
  VcMessage({
    type: 'info',
    message: '这是一个普通信息！'
  })
}
function success () {
  VcMessage.success('这是一个成功信息！')
}
function warning () {
  VcMessage.warning('这是一个警告信息！')
}
function error () {
  VcMessage.error('这是一个错误信息！')
}
</script>
```
:::


## 手动关闭

显示关闭按钮。

::: codeBox

> `duration` 设置为 0，则不会自动关闭。

```vue
<template>
  <vc-button-group>
    <vc-button @click="info">提醒</vc-button>
    <vc-button @click="success" theme="success">成功</vc-button>
    <vc-button @click="warning" theme="warn">警告</vc-button>
    <vc-button @click="error" theme="error">失败</vc-button>
  </vc-button-group>
</template>

<script>
import { ref, inject } from 'vue'

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

::: codeBox
```vue
<template>
  <vc-button @click="info">8s后关闭</vc-button>
</template>

<script setup>
import { inject } from 'vue'

let message = inject('vcMessage')

function info () {
  message({
    type: 'info',
    duration: 8000,
    message: '8s后将消失！！'
  })
}
</script>
```
:::

## 使用 HTML 片段

::: codeBox
```vue
<template>
  <vc-button @click="info">使用 HTML 片段</vc-button>
</template>

<script>
import { ref, inject } from 'vue'

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

::: codeBox
```vue
<template>
  <vc-button @click="show">Show</vc-button>
  <vc-button @click="close">Close</vc-button>
</template>

<script>
import { ref, inject } from 'vue'

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

::: codeBox
```vue
<template>
  <vc-button @click="show">Show</vc-button>
</template>

<script>
import { ref, inject } from 'vue'

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