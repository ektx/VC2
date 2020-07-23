# Demo功能演示

## Composition API Demo

以下为组合式 api 组件的 demo 写法演示：

::: demo

> 默认 `ref` `reactive` `watch` `inject` 都已经注入，使用时，无需导入。

```html
<template>
  测试 ref: <span>{{ msg }}</span> <br/>
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
    let msg = ref('composition api demo')
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

## Options API Demo

以下是选项式 api 的组件 demo 写法演示：

::: demo
```html
<template>
  测试: {{ msg }} <br/>
  <input v-model="msg" />

  <h3>事件</h3>
  <hr/>
  测试内部事件 <br/>
  <button @click="clickEvt">Click Me {{ count }}</button>
</template>

<script>
export default {
  data () {
    return {
      msg: 'options api demo',
      count: 0
    }
  },
  mounted () {
    console.log('Optins Demo is ready')
  },
  methods: {
    clickEvt () {
      this.count++
    }
  }
}
</script>
```
:::

## Poprs 格式示例

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| type | **string** | 定义按钮的外形 | - | '' |

## Events 格式示例

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
