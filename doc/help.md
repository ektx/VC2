# Demo功能演示

## Composition API Demo

以下为组合式 api 组件的 demo 写法演示：

::: codeBox

> 默认 `ref` `reactive` `watch` `inject` 都已经注入，使用时，无需导入。  
> 更多内容访问：[Vue3 Composition API](https://composition-api.vuejs.org/)

```vue
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

<style lang="less" hideInCode>
.display-box {
  line-height: 2;
  font-size: 14px;
}
hr {
  margin: 10px 0;
  border: 1px solid #eee;
}
</style>
```
:::

## Options API Demo

以下是选项式 api 的组件 demo 写法演示：

::: codeBox
```vue
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

**代码：**

```
| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| type | **string** | 定义按钮的外形 | - | '' |
```

**效果：**

| 参数 | 类型 | 说明 | 默认值 | 可选值 |
|---|---|---|:---:|:---:|
| type | **string** | 定义按钮的外形 | - | '' |

## Events 格式示例
**代码：**
```
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击事件 | - |
```

**效果：**

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击事件 | - |

## 辅助功能

### 创建组件

```bash
# 启动，然后按提示输入名称，如：colorPicker
yarn run create
```

自动创建以下内容

``` diff
 ---- VC2
 |-- doc
+|  |-- colorPicker.md 创建示例文档
 |-- example
 |  |-- src
+|    |-- menu.js 更新菜单
 |-- packages
 |  |-- components
+|  | |-- colorPicker 创建组件相关目录
+|  |   |-- index.vue
+|  |-- index.js 更新
+|  |-- layout.less 更新
```

# 资料参考
[Vue3.js](http://v3.vuejs.org/)  
[Vue-next](https://github.com/vuejs/vue-next)  
[rfc](https://github.com/vuejs/rfcs)  
[composition api](https://composition-api.vuejs.org/)  
