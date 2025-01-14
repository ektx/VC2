
# Progress 进度条

## 基础效果

::: codeBox
```vue
<template>
  <vc-progress :value="30"/>
  <vc-progress :value="100">完成</vc-progress>
  <vc-progress :value="100" status="success"/>
  <vc-progress :value="100" status="warning"/>
  <vc-progress :value="100" status="error"/>
</template>
```
:::

## 隐藏提示

百分比不占用额外控件，适用于文件上传等场景。

::: codeBox

> Progress 组件可通过 `stroke-width` 属性更改进度条的高度。  
> `text-type="none"` 属性来将进度条描述隐藏。  
> `text-type="inner"` 属性来将进度条描述置于进度条内部。  

```vue
<template>
  <vc-progress text-type="none" :value="30"/>
  <vc-progress text-type="none" :value="100">完成</vc-progress>
  <vc-progress text-type="none" :value="90" status="error"/>
 
  <vc-progress text-type="inner" :stroke-width="20" :value="30"/>
  <vc-progress text-type="inner" :stroke-width="25" :value="100">完成</vc-progress>
  <vc-progress text-type="inner" :stroke-width="28" :value="90" status="error"/>
</template>
```
:::

## 自定义颜色

可以通过 `color` 设置进度条的颜色，`color` 可以接受颜色字符串，函数和数组。 

::: codeBox
```vue
<template>
  <vc-progress :value="value" color="#f90"/>
  <vc-progress :value="value" :color="customColors"/>
  <vc-progress :value="value" :color="customColorsFun"/>
 
  <vc-button-group>
    <vc-button icon="vc-icon-minus" @click="del"/>
    <vc-button icon="vc-icon-plus" @click="add"/>
  </vc-button-group>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
      customColors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ]
    }
  },
  methods: {
    add() {
      let val = this.value + 10

      this.value = val > 100 ? 100 : val
    },
    del() {
      let val = this.value - 10

      this.value = val > 0 ? val : 0
    },
    customColorsFun(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    }
  }
}
</script>
```
:::

## 空间使用效果

::: codeBox
```vue
<template>
  <vc-progress :value="value" :max="128" :format="format" :stroke-width="20"/>
</template>

<script>
export default {
  data() {
    return {
      value: {
        photo: 20,
        app: 10,
        os: 5
      },
      format: {
        photo: {
          label: '照片',
          color: '#f7cd45'
        },
        app: {
          label: 'APP',
          color: '#a358d1'
        },
        os: {
          label: '系统',
          color: '#e6465a'
        } 
      },
    }
  }
}
</script>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| value | **Number/Object** | 值 | - | 0 |
| max | **Number** | 最大值 | - | 100 |
| min | **Number** | 最小值 | - | 0 |
| status | **String** | 状态 | success/warning/error| default |
| textType | **String** | 文字控制 | outer(外)/inner(内)/none(无) | outer |
| strokeWidth | **Number** | 高度 | - | 6 |
| color | **String/Array/Function** | 自定义颜色 | - | - |
| format | **Object** | 空间效果格式化 | - | null |
