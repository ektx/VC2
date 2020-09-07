
## 别名用法

::: demo

> `label-alias` 设置名称别名  
> `value-alias` 设置值的别名  

```html
<template>
  <vc-select v-model:value="value" :options="options" label-alias="name" value-alias="result"/>
  <vc-select v-model:value="groupValue" :options="groupOptions" label-alias="name" value-alias="result"/>
</template>

<script>
export default {
  setup() {
    const value = ref('选项2')
    const groupValue = ref('Shanghai')
    const options = [{
      result: '选项1',
      name: '黄金糕'
    }, {
      result: '选项2',
      name: '双皮奶'
    }, {
      result: '选项3',
      name: '蚵仔煎'
    }, {
      result: '选项4',
      name: '龙须面'
    }, {
      result: '选项5',
      name: '北京烤鸭'
    }]

    const groupOptions = [
      {
        label: '热门城市',
        children: [{
          result: 'Shanghai',
          name: '上海'
        }, {
          result: 'Beijing',
          name: '北京'
        }]
      }, 
      {
        label: '城市名',
        children: [{
          result: 'Chengdu',
          name: '成都'
        }, {
          result: 'Shenzhen',
          name: '深圳'
        }, {
          result: 'Guangzhou',
          name: '广州'
        }, {
          result: 'Dalian',
          name: '大连'
        }]
      }
    ]

    return {
      value,
      groupValue,
      options,
      groupOptions
    }
  }
}
</script>
```
:::
