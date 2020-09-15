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


## 提交内容

当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。

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
        title: '提示',
        message: '请输入邮箱',
        type: 'prompt',
        update: value => {
          if (
            value.length && 
            !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)
          ) {
            return '邮箱格式不正确'
          }
          console.log(value)
        }
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

## 自定义按钮

可自定义按钮不同内容。

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
        title: '提示',
        message: '自定义按钮效果',
        buttons: [
          {
            label: 'Cancel',
            color: 'error',
            func: (visible) => {
              return !visible // false 关闭
            }
          },
          {
            label: 'Think',
            func: (visible) => {
              return visible
            }
          },
          {
            label: 'Confirm',
            color: 'primary',
            func: (visible) => {
              return !visible
            }
          }
        ]
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

## 自定义按钮使用 HTML 片段

message 属性支持传入 HTML 片段。

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
        title: '提示',
        message: '<strong>这是 <i>HTML</i> 片段</strong>',
        useHTML: true
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

> `message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。因此在 `useHTML` 打开的情况下，请确保 message 的内容是可信的，永远不要将用户提交的内容赋值给 message 属性。

## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| title | **String** | 标题 | - | 标题 |
| message | **String** | 显示信息 | - | - |
| type | **String** | 类型 | alert/confirm/prompt | alert |
| buttons | **Array** | 自定义按钮功能 | - | [] |
| showClose | **Boolean** | 是否显示右上角关闭按钮 | - | true |
| closeOnClickModal | **Boolean** | 是否可以通过点击 modal 关闭 | - | true |
| update | **Function** | prompt 时，输入时调用方法 | - | - |
| useHTML | **Boolean** | 使用HTML | - | false |
