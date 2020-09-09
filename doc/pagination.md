# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础效果演示

::: demo 
```html
<template>
  <p>页数较少时的效果</p>
  <vc-pagination v-model:index="index" :total="total"/>

  <p>大于 7 页时的效果</p>
  <vc-pagination v-model:index="index2" :total="total2" :size="15"/>
</template>

<script>
export default {
  data () {
    return {
      index: 1,
      total: 40,
      index2: 4,
      total2: 1000
    }
  },
  watch: {
    index (i) {
      console.log(i)
    }
  }
}
</script>
```
:::


## 设置最大页码按钮数

::: demo 

> 默认情况下，当总页数超过 **7** 页时，Pagination 会折叠多余的页码按钮。通过 `step` 属性可以设置最大页码按钮数。

```html
<template>
  <vc-pagination v-model:index="index" :total="total" :step="10"/>
</template>

<script>
export default {
  data () {
    return {
      index: 3,
      total: 1000
    }
  }
}
</script>
```
:::

## 带有背景色的分页

::: demo 

> 可以通过 `background` 来设置背景色，默认为白色背景，选中为蓝色，可以指定选中背景色。

```html
<template>
  <p>默认背景色</p>
  <vc-pagination v-model:index="index" :total="total" background/>
  <p>指定背景色为橙色</p>
  <vc-pagination v-model:index="index" :total="total" background="#f90"/>
</template>

<script>
export default {
  data () {
    return {
      index: 1,
      total: 100
    }
  }
}
</script>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| index | **Number** | 当前页数 | 1 | - |
| total | **Number** | 总数 | 0 | - |
| size | **Number** | 每页数量 | 10 | - |
| step | **Number** | 步长 | 5 | - |
| background | **Boolean/String** | 背景色 | false | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| indexChange | 页码发生变化 | (index) => {} |
| prevChange | 上一页事件 | (index) => {} |
| nextChange | 下一页事件 | (index) => {} |
