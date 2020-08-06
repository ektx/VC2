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

## 禁用效果

::: demo 
```html
<template>
  <vc-tabs value="second">
    <vc-tab-pane label="用户管理" name="first">用户管理</vc-tab-pane>
    <vc-tab-pane label="配置管理" disabled name="second">配置管理</vc-tab-pane>
    <vc-tab-pane label="角色管理" name="third">角色管理</vc-tab-pane>
  </vc-tabs>
</template>
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



## 动态控制

::: demo 
```html
<template>
  <vc-button-group>
    <vc-button round @click="click('first')">用户管理</vc-button>
    <vc-button round @click="click('second')">配置管理</vc-button>
    <vc-button round @click="click('third')">角色管理</vc-button>
    <vc-button round @click="click('fourth')">定时任务补偿</vc-button>
  </vc-button-group>

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
      click(name) {
        this.activeName = name
      }
    }
  };
</script>
```
:::


## Tab Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| value | `String, Number` | 选中对象 | - | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |

## TabPane Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| label | `String` | 选项卡标题 | - | - |
| name | `String, Number` | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | - | - |
