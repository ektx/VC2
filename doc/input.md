# Input 输入框

通过鼠标或键盘输入字符。

## 基础方法

::: codeBox
```vue
<template>
  <vc-input v-model="input" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
```
:::


## 禁用状态

::: codeBox

> `disabled` 可禁用组件。

```vue
<template>
  <VcInput disabled />
  <br/>
  <VcInput type="textarea" disabled />
</template>
```
:::


## 可清空

::: codeBox

> 使用 `clearable` 属性即可得到一个可清空的输入框

```vue
<template>
  <vc-input v-model="input" clearable />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('1234')
</script>
```
:::


## 密码框

::: codeBox

> 当 `type="password"` 时，可以显示一个密码框功能。

```vue
<template>
  <vc-input v-model="input" clearable type="password"/>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('12345678')
</script>
```
:::


## 带 icon 的输入框

带有图标标记输入类型

::: codeBox
> 可以通过 `prefix-icon` 和 `suffix-icon` 属性在 `input` 组件首部和尾部增加显示图标，也可以通过 `slot` 来放置图标。

```vue
<template>
  <div style="margin: 0 0 1rem 0">
    <strong>属性方式</strong>
    <vc-input v-model="value1" clearable suffix-icon="vc-icon-date" />
    <br />
    <vc-input v-model="value2" clearable prefix-icon="vc-icon-search" />
  </div>
  <div>
    <strong>插槽方式</strong>
    <vc-input v-model="value3">
      <template #suffixIcon>
        <i class="vc-icon-date"></i>
      </template>
    </vc-input>
    <br />
    <vc-input v-model="value4">
      <template #prefixIcon>
        <i class="vc-icon-search"></i>
      </template>
    </vc-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let value1 = ref('')
let value2 = ref('')
let value3 = ref('')
let value4 = ref('')
</script>
```
:::


## 文本域

用于输入多行文本信息，通过将 `type` 属性的值指定为 **textarea**。

::: codeBox

> 文本域高度可通过 `rows` 原始属性控制

```vue
<template>
  <vc-input type="textarea" rows="2" v-model="val" />
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

::: codeBox
```vue
<template>
  <p>自动调整</p>
  <vc-input type="textarea" autosize v-model="textarea1" />
  <p>指定最大与最小行数，注意此时将不再支持手动调整大小。</p>
  <vc-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="textarea2" />
</template>

<script setup>
import { ref } from 'vue'

let textarea1 = ref(null)
let textarea2 = ref(null)
</script>
```
:::

## 复合型输入框

可前置或后置元素，一般为标签或按钮复合型输入框

::: codeBox
```vue
<template>
  <vc-input v-model="value" clearable>
    <template #prepend>Http://</template>
  </vc-input>

  <vc-input v-model="value" clearable>
    <template #append>.com</template>
  </vc-input>
  
  <vc-input v-model="value" clearable class="input-with-select">
    <template #prepend>
      <vc-select v-model="value2" :options="options"/>
    </template>
    <template #append>
      <vc-button type="text" icon="vc-icon-bell" />
    </template>
  </vc-input>
  
  <vc-input v-model="value" clearable class="input-with-select">
    <template #prepend>
      <vc-button type="text" icon="vc-icon-star-off" />
    </template>
    <template #append>
      <vc-select v-model="value2" :options="options"/>
    </template>
  </vc-input>

  <vc-input v-model="value" clearable class="input-with-select">
    <template #prepend>
      <vc-button type="text" icon="vc-icon-star-off" />
    </template>
    <template #append>
      <vc-select v-model="value2" :options="options"/>
    </template>
  </vc-input>
  
  <vc-input v-model="value" type="textarea" class="input-with-select">
    <template #prepend>
      <vc-button type="text" icon="vc-icon-star-off" />
    </template>
    <template #append>
      <vc-select v-model="value2" :options="options"/>
    </template>
  </vc-input>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const value2 = ref('')
const options = [{
  value: '选项1',
  label: '黄金糕'
}, {
  value: '选项2',
  label: '双皮奶'
}, {
  value: '选项3',
  label: '蚵仔煎'
}]
</script>

<style lang="less">
.vc-input {
  margin-bottom: 10px;
}

.input-with-select {
  .vc-input__append,
  .vc-input__prepend {
    padding: 0;
  }

  .vc-select input {
    border: 0;
    background: transparent;
  }

  button {
    width: 60px;
  }
}
</style>
```
:::

## 输入长度限制

::: codeBox

> `maxlength` 和 `minlength` 是原生属性，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。  
> 在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计。

```vue
<template>
  <vc-input v-model="input" maxlength="10" show-word-limit />

  <vc-input type="password" v-model="input" maxlength="10" show-word-limit />
  
  <vc-input type="textarea" maxlength="120" rows="2" v-model="input" show-word-limit />
</template>

<script setup>
import { ref } from 'vue'

let input = ref('hello World')
</script>

<style lang="less" scoped>
.vc-input {
  margin-bottom: 10px;
}
</style>
```
:::


## 事件监听

::: codeBox
```vue
<template>
  <vc-input 
    v-model="input" 
    placeholder="请输入内容" 
    ref="demo" 
    @input="getInput"
    @blur="changeNum" 
    @focus="getFocus" 
    @change="getChange" 
    @keyup.enter="getEnter"
  />
  <br/>
  <vc-button-group>
    <vc-button @click="setFocus">手动获取焦点</vc-button>
    <vc-button @click="setBlur">手动失去焦点</vc-button>
    <vc-button @click="setSelect">手动选中文字</vc-button>
  </vc-button-group>
</template>

<script setup>
import { ref } from 'vue'

let input = ref('');
const demo = ref(null);

const changeNum = event => {
  console.log('blur:',event)
}

const getFocus = event => {
  console.log('focus:',event)
  
}

const getChange = event => {
  console.log('change:', event)
}

const getEnter = evt => {
  console.log('enter', evt)
}

const getInput = event =>{
  console.log('input:', event.target.value)
}

const setFocus = () => demo.value.focus()
const setBlur = () => demo.value.blur()
const setSelect = () => demo.value.select()
</script>
```
:::


## 属性

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


## 事件

| 事件名称 | 说明 | 回调参数 |
|---|---|---|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (event: Event) |
| input | 在 Input 值改变时触发 | (event: Event) |
| clear | 在点击由 clearable 属性生成的清空按钮时触发 | (event: Event) |


## 方法
| 事件名称 | 说明 | 参数 |
|---|---|---|
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点 | - |
| select | 选中 input 中的文字 | - |
