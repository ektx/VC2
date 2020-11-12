# Layer 弹层

## 基础效果

::: demo 
```html
<template>
  <vc-button @click="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer v-model:show="open" title="hello world" append-to-body>
    <p>这是一段信息</p>
    <template #footer>
      <vc-button @click="open = false">取消</vc-button>
      <vc-button color="primary" @click="open = false">确认</vc-button>
    </template>
  </vc-layer>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
};
</script>
```
:::

## 全屏效果

::: demo 
```html
<template>
  <vc-button @click="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer v-model:show="open" title="hello world" fullscreen>
    <p>这是一段信息</p>
    <template #footer>
      <vc-button @click="open = false">取消</vc-button>
      <vc-button color="primary" @click="open = false">确认</vc-button>
    </template>
  </vc-layer>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
};
</script>
```
:::

## 阻止关闭事件效果

::: demo 
```html
<template>
  <vc-button @click="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer 
    v-model:show="open" 
    title="hello world" 
    :beforeClose="beforeClose"
    @close="close"
  >
    <p>这是一段信息</p>
  </vc-layer>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  methods: {
    beforeClose(done) {
      this.VcConfirm({
        title: '提示',
        message: '你确定关闭吗',
        type: 'confirm'
      }).then(data => {
        console.log('确认了消息:'+data)
        done()
      }).catch(err => {
        console.log('关闭了消息:'+err)
      })
    },
    close() {
      this.vcMessage.info('close')
    }
  }
};
</script>
```
:::

## 阻止默认事件效果

::: demo 

> 此效果主要表现在用户的事件阻止了传播。此时，动画为从上到下效果。

```html
<template>
  <vc-button @click.stop="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer v-model:show="open" title="hello world" append-to-body>
    <p>这是一段信息</p>
    <template #footer>
      <vc-button @click="open = false">取消</vc-button>
      <vc-button color="primary" @click="open = false">确认</vc-button>
    </template>
  </vc-layer>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
};
</script>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| show | `Boolean` | 是否显示弹层 | false | - |
| title | `String` | 弹层的标题 | 标题 | - |
| width | `String` | 调整弹层的宽度<br>eg: `width="200px"` | 50% | - |
| closeModal | `Boolean` | 点击背景不消失 | false | - |
| append-to-body | `Boolean` | 弹层自身是否插入至 body 元素上 | false | - |
| fullscreen | `Boolean` | 是否为全屏 | false | - |
| beforeClose | `Function` | 关闭前的回调，会暂停弹层的关闭<br/>`function(done)`，done 用于关闭弹层 | - | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| — | 弹层的内容 |
| title | 弹层标题区的内容 |
| footer | 按钮操作区的内容 |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时触发 | - |
| closed | 弹层完全关闭后触发 | - |
| open | 弹层打开时触发 | - |
| opened | 弹层完全打开后触发 | - |