### Radio 单选框
在一组备选项中进行单选


::: demo
```html
<template>
  <div>
    <vc-radio v-model:value="radio" label="1"></vc-radio>
    <vc-radio></vc-radio>
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