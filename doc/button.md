# Button 按钮

## 基础效果

::: codeBox
```vue
<template>
  <div>
    <vc-button >默认效果</vc-button>
    <vc-button theme="primary">主要效果</vc-button>
    <vc-button theme="success">成功</vc-button>
    <vc-button theme="warn">警告</vc-button>
    <vc-button theme="error">错误</vc-button>
    <vc-button color="#f90" bg="#9c27b0">自定义颜色</vc-button>
  </div>
  <br/>
  <div>
    <vc-button plain>默认效果</vc-button>
    <vc-button plain theme="primary">主要效果</vc-button>
    <vc-button plain theme="success">成功</vc-button>
    <vc-button plain theme="warn">警告</vc-button>
    <vc-button plain theme="error">错误</vc-button>
    <vc-button plain bg="#9c27b0">自定义颜色</vc-button>
    <vc-button plain color="#f90">自定义颜色</vc-button>
  </div>
  <br/>
  <div>
    <vc-button round>默认效果</vc-button>
    <vc-button round theme="primary">主要效果</vc-button>
    <vc-button round theme="success">成功</vc-button>
    <vc-button round theme="warn">警告</vc-button>
    <vc-button round theme="error">错误</vc-button>
  </div>
  <br/>
  <div>
    <vc-button plain round>默认效果</vc-button>
    <vc-button plain round theme="primary">主要效果</vc-button>
    <vc-button plain round theme="success">成功</vc-button>
    <vc-button plain round theme="warn">警告</vc-button>
    <vc-button plain round theme="error">错误</vc-button>
    <vc-button plain round bg="#9c27b0">自定义颜色</vc-button>
  </div>
</template>

<style scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::

## 文字按钮

纯文字效果。

::: codeBox
```vue
<template>
  <vc-button text>默认效果</vc-button>
  <vc-button text theme="primary">主要效果</vc-button>
  <vc-button text theme="success">成功</vc-button>
  <vc-button text theme="warn">警告</vc-button>
  <vc-button text theme="error">错误</vc-button>
  <vc-button text color="#9c27b0">自定义颜色</vc-button>
</template>

<style scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::

## 禁用效果

按钮不可用状态。

::: codeBox
```vue
<template>
  <div>
    <vc-button disabled>默认效果</vc-button>
    <vc-button disabled theme="primary">主要效果</vc-button>
    <vc-button disabled theme="success">成功</vc-button>
    <vc-button disabled theme="warn">警告</vc-button>
    <vc-button disabled theme="error">错误</vc-button>
    <vc-button disabled color="#9c27b0">自定义颜色</vc-button>
  </div>
  <br/>
  <div>
    <vc-button disabled plain>默认效果</vc-button>
    <vc-button disabled plain theme="primary">主要效果</vc-button>
    <vc-button disabled plain theme="success">成功</vc-button>
    <vc-button disabled plain theme="warn">警告</vc-button>
    <vc-button disabled plain theme="error">错误</vc-button>
    <vc-button disabled plain color="#9c27b0">自定义颜色</vc-button>
  </div>
  <br/>
  <div>
    <vc-button disabled type="text">默认效果</vc-button>
    <vc-button disabled type="text" theme="primary">主要效果</vc-button>
    <vc-button disabled type="text" theme="success">成功</vc-button>
    <vc-button disabled type="text" theme="warn">警告</vc-button>
    <vc-button disabled type="text" theme="error">错误</vc-button>
    <vc-button disabled type="text" color="#9c27b0">自定义颜色</vc-button>
  </div>
</template>

<style scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::

## 基础效果图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

::: codeBox
```vue
<template>
  <vc-button icon="vc-icon-star-off" />
  <vc-button theme="primary" icon="vc-icon-bell" />
  <vc-button theme="success" icon="vc-icon-success" />
  <vc-button color="#fff" bg="#f90" icon="vc-icon-success" />
  <vc-button round icon="vc-icon-star-off" />
  <vc-button round theme="primary" icon="vc-icon-bell" />
  <vc-button round theme="success" icon="vc-icon-success" />
  <vc-button theme="warn" icon="vc-icon-warning">警告</vc-button>
  <vc-button theme="error" icon="vc-icon-close">错误</vc-button>
</template>

<style scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::

## 按钮组效果

以按钮组的方式出现，常用于多项类似操作。

::: codeBox
```vue
<template>
  <vc-button-group round>
    <vc-button theme="primary" icon="vc-icon-arrow-left">上一首</vc-button>
    <vc-button theme="primary">播放</vc-button>
    <vc-button theme="primary">暂停</vc-button>
    <vc-button theme="primary">下一首 <i class="vc-icon-arrow-right"></i></vc-button>
  </vc-button-group>

  <vc-button-group>
    <vc-button icon="vc-icon-success" />
    <vc-button icon="vc-icon-warning" />
    <vc-button icon="vc-icon-search" />
    <vc-button icon="vc-icon-close" />
  </vc-button-group>
</template>

<style scoped>
.vc-button-group {
  margin-right: 10px;
}
</style>
```
:::

## 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

::: codeBox
```vue
<template>
  <vc-switch v-model:value="value" />
  <hr/>

  <vc-button :loading="value">加载中...</vc-button>
  <vc-button :loading="value" round theme="primary" icon="vc-icon-success" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>

<style scoped>
.vc-button {
  margin-right: 10px;
}
</style>
```
:::

## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| color | **String** | 设置按钮效果 | primary / success / warn / error | - |
| plain | **Boolean** | 镂空 | - | false |
| round | **Boolean** | 圆角 | - | false |
| icon | **String** | 图标 | - | - |
| loading | **Boolean** | 加载状态 | - | - |
| disabled | **Boolean** | 禁用状态 | - | - |

