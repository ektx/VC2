# 输入框

通过鼠标或键盘输入字符

#### 使用方法
::: demo
```html
<template>
  <vc-input v-model:value="input" placeholder="请输入内容" ref="demo" @blur="changeNum" @focus="getFocus" @change="getChange" @input="getInput"></vc-input>
  <vc-button @click="getFoucus">默认效果</vc-button>
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
      demo
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


#### 可清空
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


#### 密码框
::: demo
```html
<template>
  <vc-input v-model:value="input" placeholder="请输入密码" clearable show-password></vc-input>
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


#### 带 icon 的输入框
带有图标标记输入类型

::: demo
```html
<template>
  <div>
    <vc-input v-model:value="input1" placeholder="请输入内容" suffix-icon="vc-icon-date"></vc-input>
    <vc-input v-model:value="input2" placeholder="请输入内容" prefix-icon="vc-icon-search"></vc-input>
  </div>
  
</template>

<script>
export default {
  setup() {
    let input1 = ref(null);
    let input2 = ref(null);
    
    return {
      input1,
      input2
    }
  }
}
</script>
```
:::


#### 文本域
用于输入多行文本信息，通过将 type 属性的值指定为 textarea。

::: demo
```html
<template>
  <vc-input type="textarea" rows="2" placeholder="请输入内容" v-model:value="textarea1"></vc-input>
</template>

<script>
export default {
  setup() {
    let textarea1 = ref(null);
    
    return {
      textarea1,
      
    }
  }
}
</script>
```
:::


#### 可自适应文本高度的文本域
通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数


::: demo
```html
<template>
  <vc-input type="textarea" placeholder="请输入内容" autosize v-model:value="textarea1"></vc-input>
  <vc-input type="textarea"  placeholder="请输入内容" :autosize="{ minRows: 2, maxRows: 4}" v-model:value="textarea2"></vc-input>
</template>

<script>
export default {
  setup() {
    let textarea1 = ref(null);
    let textarea2 = ref(null);
    
    return {
      textarea1,
      textarea2
    }
  }
}
</script>
```
:::


#### 输入长度限制

::: demo
```html
<template>
  <div>
    <vc-input v-model:value="input1" placeholder="请输入内容" ></vc-input>
    <vc-input type="textarea" autosize v-model:value="textarea" placeholder="请输入内容"></vc-input>
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