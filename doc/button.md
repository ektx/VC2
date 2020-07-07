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


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| color | **String** | 设置按钮效果 | primary / success / warn / error | - |
| plain | **Boolean** | 镂空 | - | false |


## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
