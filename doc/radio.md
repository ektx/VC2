### Radio 单选框
在一组备选项中进行单选


#### 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: demo
```html
<template>
  <div>
    <vc-form class="aa" label-width="80px">
      <vc-radio v-model:value="radio" label="1"></vc-radio>
      <vc-radio v-model:value="radio" label="2"></vc-radio>
    </vc-form>
  </div>
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

#### radio组
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

::: demo
```html
<template>
  <div>
    <vc-radio-group v-model:value="radio" class="aa" label-width="80px">
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
    
    return {
      radio,
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