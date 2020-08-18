### Radio 单选框
在一组备选项中进行单选


#### 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: demo
```html
<template>
  <div>
    <vc-radio v-model:value="radio" label="1" @change="change"></vc-radio>
    <vc-radio v-model:value="radio" label="2"></vc-radio>
  </div>
</template>

<script>
export default {
  setup() {
    let radio = ref('1')
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

#### radio组
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: demo
```html
<template>
  <div>
    <vc-radio-group v-model:value="radio" @change="change">
      <vc-radio label="1"></vc-radio>
      <vc-radio label="2"></vc-radio>
      <vc-radio label="9"></vc-radio>
    </vc-radio-group>
  </div>
</template>

<script>
export default {
  setup() {
    let radio = ref('9')
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


#### 带有边框 button 改变button选中颜色

::: demo
```html
<template>
  <div>
    <vc-radio-group v-model:value="radio1" type='button' :size="10" text-color="yellow">
      <vc-radio label="1">上海</vc-radio>
      <vc-radio label="2">北京</vc-radio>
      <vc-radio label="3">天津</vc-radio>
      <vc-radio label="4">安徽</vc-radio>
    </vc-radio-group>
    <vc-radio-group v-model:value="radio2" style="margin-top: 10px" type='button' :size="14" fill="red">
      <vc-radio label="1">上海</vc-radio>
      <vc-radio label="2">北京</vc-radio>
      <vc-radio label="3">天津</vc-radio>
      <vc-radio label="4">安徽</vc-radio>
    </vc-radio-group>
  </div>
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

#### 带有边框 button 样式

::: demo
```html
<template>
  <div>
    <vc-radio-group v-model:value="radio1" type='button' :size="10">
      <vc-radio label="1">上海</vc-radio>
      <vc-radio label="2">北京</vc-radio>
      <vc-radio label="3">天津</vc-radio>
      <vc-radio label="4">安徽</vc-radio>
    </vc-radio-group>
    <vc-radio-group v-model:value="radio2" style="margin-top: 10px" type='button' :size="14">
      <vc-radio label="1">上海</vc-radio>
      <vc-radio label="2">北京</vc-radio>
      <vc-radio label="3">天津</vc-radio>
      <vc-radio label="4">安徽</vc-radio>
    </vc-radio-group>
    <vc-radio-group v-model:value="radio3" style="margin-top: 10px" type='button' :size="16">
      <vc-radio label="1">上海</vc-radio>
      <vc-radio label="2">北京</vc-radio>
      <vc-radio label="3" disabled>天津</vc-radio>
      <vc-radio label="4">安徽</vc-radio>
    </vc-radio-group>
    <vc-radio-group v-model:value="radio4" style="margin-top: 10px" type='button' :size="18" disabled>
      <vc-radio label="1">上海</vc-radio>
      <vc-radio label="2">北京</vc-radio>
      <vc-radio label="3">天津</vc-radio>
      <vc-radio label="4">安徽</vc-radio>
    </vc-radio-group>
  </div>
</template>

<script>
export default {
  setup() {
    let radio1 = ref('1')
    let radio2 = ref('1')
    let radio4 = ref('1')
    let radio3 = ref('1')
    
    return {
      radio1,
      radio2,
      radio4,
      radio3
    }
  }
}
</script>
```
:::




#### 带有边框

::: demo
```html
<template>
  <div>
    <div>
      <vc-radio v-model:value="radio3" label="1" border :size="8">上海</vc-radio>
      <vc-radio v-model:value="radio3" label="2" border :size="8">北京</vc-radio>
    </div>

    <div>
      <vc-radio-group v-model:value="radio4" :size="10" style="margin-top: 10px">
        <vc-radio label="1" border>上海</vc-radio>
        <vc-radio label="2" border>北京</vc-radio>
        <vc-radio label="3" border disabled>天津</vc-radio>
        <vc-radio label="4" border>安徽</vc-radio>
      </vc-radio-group>
    </div>

    <div style="margin-top: 10px">
      <vc-radio v-model:value="radio" label="1" border :size="14">上海</vc-radio>
      <vc-radio v-model:value="radio" label="2" border :size="14">北京</vc-radio>
    </div>

    <vc-radio-group v-model:value="radio2" style="margin-top: 10px" disabled :size="18">
      <vc-radio label="1" border></vc-radio>
      <vc-radio label="2" border></vc-radio>
    </vc-radio-group>

  </div>
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

#### 禁用状态
单选框不可用的状态。

::: demo
```html
<template>
  <div>
    <vc-radio disabled v-model:value="radio" label="1"></vc-radio>
    <vc-radio disabled v-model:value="radio" label="2"></vc-radio>
  </div>

  <vc-radio-group style="margin-top:10px" disabled>
    <vc-radio v-model:value="radio" label="1"></vc-radio>
    <vc-radio v-model:value="radio" label="2"></vc-radio>
  </vc-radio-group>
</template>

<script>
export default {
  setup() {
    let radio = ref('1')

    return {
      radio
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






## Radio Events

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

