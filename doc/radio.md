# Radio 单选框
在一组备选项中进行单选


## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: demo
```html
<template>
  <vc-radio v-model="radio" :label="1">项目1</vc-radio>
  <vc-radio v-model="radio" :label="2">项目2</vc-radio>
</template>

<script>
export default {
  data() {
    return {
      radio: 1
    }
  }
}
</script>
```
:::

## 组

适用于在多个互斥的选项中选择的场景。

::: demo
```html
<template>
  <vc-radio-group v-model="radio" @change="change">
    <vc-radio :label="1"></vc-radio>
    <vc-radio :label="2"></vc-radio>
    <vc-radio :label="3"></vc-radio>
  </vc-radio-group>
</template>

<script>
export default {
  setup() {
    let radio = ref(3)
    let message = inject('vcMessage')

    const change = event =>{
      message({
        type: 'info',
        message: event.target.value
      }) 
    }
    
    return {
      radio,
      change
    }
  }
}
</script>
```
:::


## 按钮样式

按钮样式的单选组合。

::: demo
```html
<template>
  <vc-radio-group v-model="radio1" type="button" :size="10">
    <vc-radio label="上海">上海</vc-radio>
    <vc-radio label="北京">北京</vc-radio>
    <vc-radio label="天津">天津</vc-radio>
    <vc-radio label="安徽">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <vc-radio-group v-model="radio2" type="button" :size="14">
    <vc-radio label="上海">上海</vc-radio>
    <vc-radio label="北京">北京</vc-radio>
    <vc-radio label="天津">天津</vc-radio>
    <vc-radio label="安徽">安徽</vc-radio>
  </vc-radio-group>
</template>

<script>
export default {
  setup() {
    let radio1 = ref('安徽')
    let radio2 = ref('安徽')
    
    return {
      radio1,
      radio2,
    }
  }
}
</script>
```
:::

## 自定颜色

::: demo
```html
<template>
  <vc-radio-group v-model="radio1" type="button" background="green">
    <vc-radio label="1">上海</vc-radio>
    <vc-radio label="2">北京</vc-radio>
    <vc-radio label="3">天津</vc-radio>
    <vc-radio label="4">安徽</vc-radio>
  </vc-radio-group>
  <br/>
  <vc-radio-group v-model="radio2" type="button" color="#000">
    <vc-radio label="1">上海</vc-radio>
    <vc-radio label="2">北京</vc-radio>
    <vc-radio label="3">天津</vc-radio>
    <vc-radio label="4">安徽</vc-radio>
  </vc-radio-group>
</template>

<script>
export default {
  setup() {
    let radio1 = ref('1')
    let radio2 = ref('1')
    
    return {
      radio1,
      radio2,
    }
  }
}
</script>
```
:::

## 带有边框

::: demo
```html
<template>
  <vc-radio v-model="radio3" label="1" border>上海</vc-radio>
  <vc-radio v-model="radio3" label="2" border>北京</vc-radio>
  <br/>
  <br/>
  <vc-radio-group v-model="radio4">
    <vc-radio label="1" border>上海</vc-radio>
    <vc-radio label="2" border>北京</vc-radio>
    <vc-radio label="3" border disabled>天津</vc-radio>
    <vc-radio label="4" border>安徽</vc-radio>
  </vc-radio-group>
</template>

<script>
export default {
  setup() {
    let radio = ref('1')
    let radio2 = ref('1')
    let radio4 = ref('1')
    let radio3 = ref('1')
    
    return {
      radio,
      radio2,
      radio4,
      radio3
      
    }
  }
}
</script>
```
:::

## 禁用状态

单选框不可用的状态。

::: demo
```html
<template>
  <vc-radio disabled v-model="radio" label="1"></vc-radio>
  
  <br/>
  <vc-radio-group disabled>
    <vc-radio v-model="radio" label="1"></vc-radio>
    <vc-radio v-model="radio" label="2"></vc-radio>
  </vc-radio-group>

  <br/>
  <vc-radio-group v-model="radio2" type="button">
    <vc-radio label="上海">上海</vc-radio>
    <vc-radio label="北京" disabled>北京</vc-radio>
    <vc-radio label="天津">天津</vc-radio>
    <vc-radio label="安徽">安徽</vc-radio>
  </vc-radio-group>
</template>

<script>
export default {
  setup() {
    let radio = ref('1')
    let radio2 = ref('北京')

    return {
      radio,
      radio2
    }
  }
}
</script>
```
:::

## 事件

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: demo
```html
<template>
  <vc-radio 
    v-model="radio" 
    label="北京" 
    @change="change"
    @focus="focus"
  >北京</vc-radio>
  <vc-radio 
    v-model="radio" 
    label="上海" 
    @change="change"
    @focus="focus"
  >上海</vc-radio>

  <br/>
  <br/>

  <vc-radio-group 
    v-model="radio"
    type="button" 
    @change="change"
    @focus="focus"
  >
    <vc-radio v-model="radio" label="北京"></vc-radio>
    <vc-radio v-model="radio" label="上海"></vc-radio>
  </vc-radio-group>
</template>

<script>
export default {
  setup() {
    let radio = ref('北京')
    let message = inject('vcMessage')

    const change = event =>{
      message({
        type: 'info',
        message: event.target.value
      }) 
    }

    function focus(evt) {
      console.log(1221)
      message({
        type: 'warning',
        message: evt.target.value
      })
    }

    return {
      radio,
      change,
      focus
    }
  }
}
</script>
```
:::

## Props

| 参数 | 类型 | 说明 | 可选值 | 默认值 | 
|---|---|---|---|---|
| value | **boolean / string / number** | 绑定值 | --- | --- |
| label | **boolean / string / number** | Radio 的 value | --- | --- |
| disabled | **boolean** | 是否禁用 | --- | false |
| border | **boolean** | 是否显示边框 | --- | false |
| :size | **Number** | radio 大小 | --- | 14 |

## Props Events

| 事件名称 | 说明 | 回调参数 | 
|---|---|---|---|---|
| change | switch 状态发生变化时的回调函数 | 新状态的值 |

## Radio-group props

| 参数 | 类型 | 说明 | 可选值 | 默认值 | 
|---|---|---|---|---|
| value | **boolean / string / number** | 绑定值 | --- | --- |
| disabled | **boolean** | 是否禁用 | --- | false |
| :size | **Number** | radio 大小 | --- | 14 |
| text-color | **string** | 按钮形式的 Radio 激活时的文本颜色 | --- | #ffffff |
| fill | **string** | 按钮形式的 Radio 激活时的填充色和边框色 | --- | #409EFF |
| :size | **Number** | radio 大小 | --- | 14 |
| border | **boolean** | 是否显示边框 | --- | false |


## Radio-group Events

| 事件名称 | 说明 | 回调参数 | 
|---|---|---|---|---|
| change | switch 状态发生变化时的回调函数 | 新状态的值 |

