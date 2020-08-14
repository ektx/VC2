# Input 输入框

通过鼠标或键盘输入字符。

## 基础方法

::: demo
```html
<template>
  <vc-input v-model:value="input" placeholder="请输入内容" />
</template>

<script>
export default {
  setup() {
    let input = ref('')
    
    return {
      input,
    }
  }
}
</script>
```
:::


## 禁用状态

::: demo

> `disabled` 可禁用组件。

```html
<template>
  <vc-input v-model:value="input" disabled />
</template>

<script>
export default {
  setup() {
    let input = ref('')
    
    return {
      input,
    }
  }
}
</script>
```
:::


## 可清空

::: demo

> 使用 `clearable` 属性即可得到一个可清空的输入框

```html
<template>
  <vc-input v-model:value="input" clearable />
</template>

<script>
export default {
  setup() {
    let input = ref('')
    
    return {
      input,
    }
  }
}
</script>
```
:::


## 密码框

::: demo

> 当 `type="password"` 时，可以显示一个密码框功能。

```html
<template>
  <vc-input v-model:value="input" type="password"/>
</template>

<script>
export default {
  setup() {
    let input = ref('')
    
    return {
      input,
    }
  }
}
</script>
```
:::


## 带 icon 的输入框

带有图标标记输入类型

::: demo
> 可以通过 `prefix-icon` 和 `suffix-icon` 属性在 `input` 组件首部和尾部增加显示图标，也可以通过 `slot` 来放置图标。

```html
<template>
  <div>
    <strong>属性方式</strong>
    <vc-input v-model:value="value1" suffix-icon="vc-icon-date"></vc-input>
    <vc-input v-model:value="value2" prefix-icon="vc-icon-search"></vc-input>
  </div>
  <div>
    <strong>插槽方式</strong>
    <vc-input v-model:value="value3">
      <template #suffixIcon>
        <i class="vc-icon-date"></i>
      </template>
    </vc-input>
    <vc-input v-model:value="value4">
      <template #prefixIcon>
        <i class="vc-icon-search"></i>
      </template>
    </vc-input>
  </div>
</template>

<script>
export default {
  setup() {
    let value1 = ref('')
    let value2 = ref('')
    let value3 = ref('')
    let value4 = ref('')
    
    return { value1, value2, value3, value4 }
  }
}
</script>
```
:::


## 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 **textarea**。

::: demo

> 文本域高度可通过 `rows` 原始属性控制

```html
<template>
  <vc-input type="textarea" rows="2" v-model:value="val" />
</template>

<script>
export default {
  data() {
    return {
      val: ''
    }
  }
}
</script>
```
:::


### 可自适应文本高度的文本域

通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。

::: demo
```html
<template>
  <p>自动调整</p>
  <vc-input type="textarea" autosize v-model:value="textarea1" />
  <p>指定最大与最小行数</p>
  <vc-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model:value="textarea2" />
</template>

<script>
export default {
  setup() {
    let textarea1 = ref(null)
    let textarea2 = ref(null)
    
    return {
      textarea1,
      textarea2
    }
  }
}
</script>
```
:::


## 输入长度限制

::: demo

> `maxlength` 和 `minlength` 是原生属性，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。  
> 在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计。

```html
<template>
  <div>
    <vc-input v-model:value="input1" maxlength="10" show-word-limit />
    <vc-input type="password" v-model:value="input1" maxlength="10" show-word-limit />
    
    <vc-input type="textarea" maxlength="120" rows="2" v-model:value="textarea" show-word-limit />
  </div>
  
</template>

<script>
export default {
  setup() {
    let input1 = ref('')
    let textarea = ref('')
    
    return {
      input1,
      textarea
    }
  }
}
</script>
```
:::


## 事件监听

::: demo
```html
<template>
  <vc-input 
    v-model:value="input" 
    placeholder="请输入内容" 
    ref="demo" 
    @blur="changeNum" 
    @focus="getFocus" 
    @change="getChange" 
    @input="getInput"
  />
  <br/>
  <vc-button @click="setFocus">手动获取焦点</vc-button>
  <vc-button @click="setBlur">手动失去焦点</vc-button>
  <vc-button @click="setSelect">手动选中文字</vc-button>
</template>

<script>
export default {
  setup() {
    let input = ref('');
    const demo = ref(null);

    const changeNum = event => {
      console.log('失去焦点',event)
    }

    const getFocus = event => {
      console.log('获取焦点',event)
      
    }

    const getChange = event =>{
      console.log('内容改变后',event)
    }

    const getInput = event =>{
      console.log('内容实时变化', event.target.value)
    }

    const setFocus = () => demo.value.focus()
    const setBlur = () => demo.value.blur()
    const setSelect = () => demo.value.select()

    return {
      input,
      changeNum,
      getFocus,
      getChange,
      getInput,
      setFocus,
      setBlur,
      setSelect,
      demo,
    }
  }
}
</script>
```
:::


## Input Attributes

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| type | **string** | 类型 | text / password / textarea | text |
| value | **string / number** | 绑定值 | -- | -- |
| show-word-limit | **boolean** | 是否显示输入字数统计 | - | false |
| clearable | **boolean** | 是否可清空 | -- | false |
| show-password | **boolean** | 是否显示切换密码图标 | -- | false |
| disabled | **boolean** | 禁用 | -- | false |
| prefix-icon | **string** | 输入框头部图标 | -- | -- |
| suffix-icon | **string** | 输入框尾部图标 | -- | -- |
| autosize | **boolean / object** | 自适应内容高度，只对 `textarea` 有效，<br/>可传入对象，如`{ minRows: 2, maxRows: 6 }` | -- | false |
| validate-event | **boolean** | 输入时是否触发表单的校验 | -- | true |


## Input Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|---|---|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (event: Event) |
| input | 在 Input 值改变时触发 | (event: Event) |
| clear | 在点击由 clearable 属性生成的清空按钮时触发 | (event: Event) |


## Input Methods
| 事件名称 | 说明 | 参数 |
|---|---|---|---|---|
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点 | - |
| select | 选中 input 中的文字 | - |
