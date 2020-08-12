### Radio 单选框
在一组备选项中进行单选


#### 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。


::: demo
```html
<template>
  <div>
    <vc-form class="aa" label-width="80px" :labelPosition="labelPosition">
      <vc-radio v-model:value="radio" label="1"></vc-radio>
      <vc-radio v-model:value="radio" label="2"></vc-radio>
    </vc-form>
  </div>
</template>

<script>
export default {
  setup() {
    let radio = ref('1')

    watch(
      () => radio.value,
        (count, prevCount) => {
        console.log(11111,count)
     }
)
    

    return {
      radio
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
    <vc-radio v-model:value="radio" label="1"></vc-radio>
    <vc-radio v-model:value="radio" label="2"></vc-radio>
  </div>
</template>

<script>
export default {
  setup() {
    let radio = ref('1')

    watch(
      () => radio.value,
        (count, prevCount) => {
        console.log(11111,count)
     }
)
    

    return {
      radio
    }
  }
}
</script>
```
:::