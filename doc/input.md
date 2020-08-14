# Input 输入框

通过鼠标或键盘输入字符

#### 使用方法
::: demo
```html
<template>
  <vc-input v-model:value="input" placeholder="请输入内容" ref="demo" @blur="changeNum" @focus="getFocus" @change="getChange" @input="getInput"></vc-input>
  <vc-button @click="getFoucus">获取焦点</vc-button>
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

    const getFoucus = () =>{
      console.log(demo.value)
      demo.value.focus()
    }

    return {
      input,
      changeNum,
      getFocus,
      getChange,
      getInput,
      getFoucus,
      demo,
    }
  }
}
</script>
```
:::


#### 禁用状态
::: demo
```html
<template>
  <vc-input v-model:value="input" placeholder="请输入内容" disabled ></vc-input>
</template>

<script>
export default {
  setup() {
    let input = ref(null);
    
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
```html
<template>
  <vc-input v-model:value="input" placeholder="请输入内容" clearable></vc-input>
</template>

<script>
export default {
  setup() {
    let input = ref(null);
    
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
```html
<template>
  <vc-input v-model:value="input" placeholder="请输入密码" clearable type="password"></vc-input>
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
```html
<template>
  <vc-input type="textarea" v-model:value="val" />
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
```html
<template>
  <div>
    <vc-input v-model:value="input1" maxlength="10" show-word-limit />
    <vc-input type="textarea" autosize maxlength="120" v-model:value="textarea" show-word-limit />
  </div>
  
</template>

<script>
export default {
  setup() {
    let input1 = ref(null);
    let textarea = ref(null);
    
    return {
      input1,
      textarea
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
| maxlength | **number** | 绑定值 | 原生属性，最大输入长度 | -- |
| minlength | **number** | 原生属性，最小输入长度 | -- | -- |
| show-word-limit | **boolean** | 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效 | - | false |
| placeholder | **string** | 输入框占位文本 | -- | -- |
| clearable | **boolean** | 是否可清空 | -- | false |
| show-password | **boolean** | 是否显示切换密码图标 | -- | false |
| disabled | **boolean** | 禁用 | -- | false |
| prefix-icon | **string** | 输入框头部图标 | -- | -- |
| suffix-icon | **string** | 输入框尾部图标 | -- | -- |
| rows | **number** | 输入框行数，只对 type="textarea" 有效 | -- | 2 |
| autosize | **boolean / object** | 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | -- | false |
| validate-event | **boolean** | 输入时是否触发表单的校验 | -- | true |


## Input Events

| 事件名称 | 说明 | 回调参数 |
|---|---|---|---|---|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (event: Event) |
| input | 在 Input 值改变时触发 | (event: Event) |
| clear | 在点击由 clearable 属性生成的清空按钮时触发 | (event: Event) |


