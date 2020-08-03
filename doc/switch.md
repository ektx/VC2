#### Switch 开关
表示两种相互对立的状态间的切换，多用于触发「开/关」


::: demo
```html
<template>
  <div>
    <vc-switch v-model:value="switch1" active-color="#13ce66" inactive-color="#ff4949" @change="change" active-value="100" inactive-value="0"></vc-switch>
  </div>
  
</template>

<script>
export default {
  setup() {
    let switch1 = ref(null);
    let message = inject('vcMessage')

    const change = event =>{
      message({
        type: 'info',
        duration: 1000,
        message: event
      }) 
    }

    return {
      switch1,
      change,
    }
  }
}
</script>
```
:::


#### 文字描述

::: demo
```html
<template>
  <div>
    <vc-switch v-model:value="switch1" active-icon-class="vc-icon-search" active-text="按月付费" inactive-text="按年付费"></vc-switch>
    <vc-switch v-model:value="switch2" active-text="按月付费" inactive-text="按年付费"></vc-switch>
  </div>
  
</template>

<script>
export default {
  setup() {
    let switch1 = ref(null);
    let switch2 = ref(null);
    
    return {
      switch1,
      switch2,
      
    }
  }
}
</script>
```
:::

#### 文字描述

::: demo
```html
<template>
  <div>
    <vc-switch v-model:value="switch1"></vc-switch>
    <vc-switch v-model:value="switch2" disabled></vc-switch>
  </div>
  
</template>

<script>
export default {
  setup() {
    let switch1 = ref(true);
    let switch2 = ref(false);
    
    return {
      switch1,
      switch2,
      
    }
  }
}
</script>
```
:::


#### 禁用

::: demo
```html
<template>
  <div>
    <vc-switch v-model:value="switch1" disabled></vc-switch>
    <vc-switch v-model:value="switch2" disabled></vc-switch>
  </div>
</template>

<script>
export default {
  setup() {
    let switch1 = ref(true);
    let switch2 = ref(false);
    
    return {
      switch1,
      switch2,
      
    }
  }
}
</script>
```
:::

#### 切换禁用状态

::: demo
```html
<template>
  <div> 
    <vc-switch v-model:value="switch1" :disabled="disabled"></vc-switch>
    <vc-button @click="disabled = !disabled">Toggle Disabled</vc-button>
  </div>
  
</template>

<script>
export default {
  setup() {
    let switch1 = ref(true);
    let switch2 = ref(false);
    let disabled = ref(true)
    
    return {
      switch1,
      switch2,
      disabled
    }
  }
}
</script>
```
:::
