# Button 按钮

## 基础效果

::: demo 
```html
<template>
  <div>
    <vc-button >默认效果</vc-button>
    <vc-button color="primary">主要效果</vc-button>
    <vc-button color="success">成功</vc-button>
    <vc-button color="warn">警告</vc-button>
    <vc-button color="error">错误</vc-button>
  </div>
  <br/>
  <div>
    <vc-button plain>默认效果</vc-button>
    <vc-button plain color="primary">主要效果</vc-button>
    <vc-button plain color="success">成功</vc-button>
    <vc-button plain color="warn">警告</vc-button>
    <vc-button plain color="error">错误</vc-button>
  </div>
  <br/>
  <div>
    <vc-button round>默认效果</vc-button>
    <vc-button round color="primary">主要效果</vc-button>
    <vc-button round color="success">成功</vc-button>
    <vc-button round color="warn">警告</vc-button>
    <vc-button round color="error">错误</vc-button>
  </div>
</template>
```
:::

## 文字按钮

纯文字效果。

::: demo 
```html
<template>
  <div>
    <vc-button type="text">默认效果</vc-button>
    <vc-button type="text" color="primary">主要效果</vc-button>
    <vc-button type="text" color="success">成功</vc-button>
    <vc-button type="text" color="warn">警告</vc-button>
    <vc-button type="text" color="error">错误</vc-button>
  </div>
</template>
```
:::

## 禁用效果

按钮不可用状态。

::: demo 
```html
<template>
  <div>
    <vc-button disabled>默认效果</vc-button>
    <vc-button disabled color="primary">主要效果</vc-button>
    <vc-button disabled color="success">成功</vc-button>
    <vc-button disabled color="warn">警告</vc-button>
    <vc-button disabled color="error">错误</vc-button>
  </div>
  <br/>
  <div>
    <vc-button disabled plain>默认效果</vc-button>
    <vc-button disabled plain color="primary">主要效果</vc-button>
    <vc-button disabled plain color="success">成功</vc-button>
    <vc-button disabled plain color="warn">警告</vc-button>
    <vc-button disabled plain color="error">错误</vc-button>
  </div>
  <br/>
  <div>
    <vc-button disabled type="text">默认效果</vc-button>
    <vc-button disabled type="text" color="primary">主要效果</vc-button>
    <vc-button disabled type="text" color="success">成功</vc-button>
    <vc-button disabled type="text" color="warn">警告</vc-button>
    <vc-button disabled type="text" color="error">错误</vc-button>
  </div>
</template>
```
:::

## 基础效果图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

::: demo 
```html
<template>
  <vc-button icon="vc-icon-star-off" />
  <vc-button color="primary" icon="vc-icon-bell" />
  <vc-button color="success" icon="vc-icon-success" />
  <vc-button color="warn" icon="vc-icon-warning">警告</vc-button>
  <vc-button color="error" icon="vc-icon-close">错误</vc-button>
</template>
```
:::

## 按钮组效果

以按钮组的方式出现，常用于多项类似操作。

::: demo 
```html
<template>
  <vc-button-group>
    <vc-button round color="primary">上一首</vc-button>
    <vc-button round color="primary">播放</vc-button>
    <vc-button round color="primary">下一首</vc-button>
  </vc-button-group>

  <vc-button-group>
    <vc-button icon="vc-icon-success" />
    <vc-button icon="vc-icon-warning" />
    <vc-button icon="vc-icon-search" />
    <vc-button icon="vc-icon-close" />
  </vc-button-group>
</template>
```
:::

## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| color | **String** | 设置按钮效果 | primary / success / warn / error | - |
| plain | **Boolean** | 镂空 | - | false |


## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
