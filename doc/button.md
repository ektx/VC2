# 基础功能演示

## Composition API Demo

::: demo
```html
<template>
  测试 ref: {{ msg }} <br/>
  <input v-model="msg" />
  <hr/>
  测试 reactive:<br/>
  <input v-model="state.name">

  <h3>事件</h3>
  <hr/>
  测试内部事件：{{ state.count}} <br/>
  <button @click="clickEvt">Click Me</button>
  
  <hr/>
  测试外部事件：{{ state.count}} <br/>
  <button @click="click2Evt(state)">Click Me</button>
  <br/>
  {{ state }}
</template>

<script>
export default {
  setup () {
    // 测试字符串绑定
    let msg = ref('hello')
    // 测试对象的绑定
    let state = reactive({
      name: 'vc',
      count: 0
    })
    // 测试 watch
    watch(
      () => msg.value,
      val => console.log('test:', val)
    )

    function clickEvt () {
      state.count++
    }

    return {
      msg,
      state,

      clickEvt,
      click2Evt,
    }
  }
}

function click2Evt(state) {
  state.count++
}
</script>
```
:::

## Poprs

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| `type` | **string** | 定义按钮的外形 | - | 'text' |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
