# Tabs 标签页
分隔内容上有关联但属于不同类别的数据集合。

## 基础效果

::: demo 
```html
<template>
  <vc-tabs v-model:value="activeName">
    <vc-tab-pane label="用户管理" name="first">用户管理</vc-tab-pane>
    <vc-tab-pane label="配置管理" name="second">配置管理</vc-tab-pane>
    <vc-tab-pane label="角色管理" name="third">角色管理</vc-tab-pane>
    <vc-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</vc-tab-pane>
  </vc-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```
:::

## 自定义增加标签页触发器

::: demo 
```html
<template>
  <vc-button @click="handleClick">Add</vc-button>
  <vc-tabs v-model:value="activeName">
    <vc-tab-pane 
      v-for="tab in list"
      :key="tab.name"
      :label="tab.label" 
      :name="tab.name"
    >{{ tab.content }}</vc-tab-pane>
  </vc-tabs>
  {{ list }}
</template>

<script>
  export default {
    data() {
      return {
        activeName: '',
        list: [
          {
            label: 'Tab 1',
            name: '1',
            content: 'Tab 1'
          },
          {
            label: 'Tab 2',
            name: '2',
            content: 'Tab 2'
          }
        ]
      };
    },
    methods: {
      handleClick() {
        let l = this.list.length
        let name = l + 1
        this.list.push({
          label: `New Tab ${name}`,
          name,
          content: `New Tab ${name}`
        })
        this.activeName = name
      }
    }
  };
</script>
```
:::



## 基础效果

::: demo 
```html
<template>
  <vc-tabs v-model:value="activeName" is-flex-box>
    <vc-tab-pane label="用户管理" name="first">用户管理</vc-tab-pane>
    <vc-tab-pane label="配置管理" name="second">配置管理</vc-tab-pane>
    <vc-tab-pane label="角色管理" name="third">角色管理</vc-tab-pane>
    <vc-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</vc-tab-pane>
  </vc-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
```
:::


## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|


## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
