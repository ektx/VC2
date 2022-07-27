# Layer 弹层

## 基础效果

::: codeBox 
```vue
<template>
  <vc-button @click="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer v-model:show="open" title="hello world" >
    <p>这是一段信息</p>
  </vc-layer>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>
```
:::

## 自定义

### 自定义按钮

::: codeBox 
```vue
<template>
  <vc-button @click="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer v-model:show="open" title="hello world" append-to-body>
    <p>这是一段信息</p>
    <template #footer>
      <vc-button type="text" @click="open = false">取消</vc-button>
      <vc-button type="text" theme="primary" @click="open = false">确认</vc-button>
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

### 自定义标题

通过 `header` 插槽，你可以自定义标题效果，同时还可以通过设置 `noHeader` 来移除标题区域。

::: codeBox 
```vue
<template>
  <vc-button @click="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer v-model:show="open">
    <template #header>你好呀</template>
    <p>这是一段信息</p>
  </vc-layer>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>
```
:::


## 全屏效果

::: codeBox 
```vue
<template>
  <vc-button @click="open = !open">Open Layer - {{open}}</vc-button>
  <vc-layer v-model:show="open" title="hello world" fullscreen>
    <p>这是一段信息</p>
    <template #footer>
      <vc-button @click="open = false">取消</vc-button>
      <vc-button theme="primary" @click="open = false">确认</vc-button>
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
| noHeader | `Boolean` | 不需要头部 | false | - |
| width | `String` | 调整弹层的宽度<br>eg: `width="200px"` | 50% | - |
| closeModal | `Boolean` | 点击背景不消失 | false | - |
| appendToBody | `Boolean` | 弹层自身是否插入至 body 元素上 | false | - |
| fullscreen | `Boolean` | 是否为全屏 | false | - |
| beforeClose | `Function` | 关闭前的回调，会暂停弹层的关闭<br/>`function(done)`，done 用于关闭弹层 | - | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| — | 弹层的内容 |
| header | 弹层标题区的内容 |
| footer | 按钮操作区的内容 |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时触发 | - |
| closed | 弹层完全关闭后触发 | - |
| open | 弹层打开时触发 | - |
| opened | 弹层完全打开后触发 | - |