# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options"/>
</template>

<script>
export default {
  setup() {
    const value = ref('')
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::

## 有禁用选项

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options"/>
</template>

<script>
export default {
  setup() {
    const value = ref('选项2')
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶',
      disabled: true
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::


## 禁用状态

选择器不可用状态

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" disabled/>
</template>

<script>
export default {
  setup() {
    const value = ref('')
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶',
      disabled: true
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::

## 可清空

包含清空按钮，可将选择器清空为初始状态

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" multiple clearable/>
</template>

<script>
export default {
  setup() {
    const value = ref([])
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶',
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::

## 基础多选

适用性较广的基础多选，用 Tag 展示已选项

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" multiple/>
  <vc-select v-model:value="value" :options="options" multiple collapse-tags :max-tag-count="2"/>
</template>

<script>
export default {
  setup() {
    const value = ref(['选项2', '选项4'])

    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::


## 自定义模板

可以自定义备选项

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options">
    <template #default="item">
      <label>{{item.label}}</label>
      <i>{{item.value}}</i>
    </template>
  </vc-select>
</template>

<script>
export default {
  setup() {
    const value = ref('选项2')

    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::

## 分组

备选项进行分组展示

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" />
</template>

<script>
export default {
  setup() {
    const value = ref('Shanghai')

    const options = [
      {
        label: '热门城市',
        children: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, 
      {
        label: '城市名',
        children: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::

## 分组自定义模板

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" multiple>
    <template #label="item">
      <i>{{item.label}}</i>
      <hr/>
    </template>
    <template #default="item">
      <label>{{item.label}}</label>
      <i>{{item.value}}</i>
    </template>
  </vc-select>
</template>

<script>
export default {
  setup() {
    const value = ref('Shanghai')

    const options = [
      {
        label: '热门城市',
        children: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, 
      {
        label: '城市名',
        children: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::


## 可搜索

可以利用搜索功能快速查找选项


::: demo
```html
<template>
  <vc-select v-model:value="value1" :options="options" filterable />
  <vc-select v-model:value="value2" :options="options" multiple filterable />
</template>

<script>
export default {
  setup() {
    const value1 = ref('Shanghai')
    const value2 = ref(['Shanghai'])

    const options = [
      {
        label: '热门城市',
        children: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, 
      {
        label: '城市名',
        children: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }]

    return {
      value1,
      value2,
      options
    }
  }
}
</script>
```
:::

## 自定义搜索

可以利用搜索功能快速查找选项

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" filterable :filterMethod="find"/>
</template>

<script>
export default {
  setup() {
    const value = ref('')

    const options = [{
      value: '1',
      label: '黄金糕'
    }, {
      value: '2',
      label: '双皮奶'
    }, {
      value: '3',
      label: '蚵仔煎'
    }, {
      value: '4',
      label: '龙须面'
    }, {
      value: '5',
      label: '北京烤鸭'
    }]

    function find(val, list) {
      let result = list

      if (val) {
        result = []

        list.forEach(item => {
          if (item.value == val) result.push(item)
        })
      }

      return result
    }

    return {
      value,
      options,
      find
    }
  }
}
</script>
```
:::

## 远程搜索

可以利用搜索功能快速查找选项

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" filterable :remote-method="find" />
</template>

<script>
export default {
  setup() {
    const value = ref('')
    const options = ref([])
    const list = ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"]

    function find(val, cb) {
      setTimeout(() => {
        let result = []

        list.forEach(item => {
          if (item.toLowerCase().includes(val)) {
            result.push({
              label: item,
              value: item
            })
          }
        })
        cb(result)
      }, 1000)
    }

    return {
      value,
      options,
      find
    }
  }
}
</script>
```
:::


## 创建条目

可以创建并选中选项中不存在的条目

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" filterable createTags/>
</template>

<script>
export default {
  setup() {
    const value = ref('')

    const options = [{
      value: '1',
      label: '黄金糕'
    }, {
      value: '2',
      label: '双皮奶'
    }, {
      value: '3',
      label: '蚵仔煎'
    }, {
      value: '4',
      label: '龙须面'
    }, {
      value: '5',
      label: '北京烤鸭'
    }]

    return {
      value,
      options
    }
  }
}
</script>
```
:::


## 事件用法

::: demo
```html
<template>
  <vc-select v-model:value="value" :options="options" @change="change" @focus="focus" @blur="blur"/>
</template>

<script>
export default {
  setup() {
    const value = ref('')
    const options = [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]

    function change(item) {
      console.log('change', item)
    }

    function blur() {
      console.log('blur')
    }

    function focus(val) {
      console.log(val)
    }

    return {
      value,
      options,
      change,
      blur,
      focus,
    }
  }
}
</script>
```
:::


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

## Poprs

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|---|---|---|---|---|
| value | **String/Number/Array** | 值 | - | - |
| options | **Array** | 选项列表 | - | [] |
| multiple | **Boolean** | 弹层是否追加到body | - | false |
| maxTagCount | **Number** | 多选时最多显示多少个 tag | - | 1 |
| placeholder | **String** | 占位符 | - | 请选择 |
| disabled | **Boolean** | 占位符 | - | false |
| clearable | **Boolean** | 是否可清空 | - | false |
| filterable | **Boolean** | 是否可搜索 | - | false |
| filterMethod | **Function** | 自定义搜索方法 | - | - |
| createTags | **Boolean** | 是否允许用户创建新条目 | - | false |
| remoteMethod | **Function** | 自定义远程搜索功能 | - | - |
| valueAlias | **String** | 值别名 | - | value |
| labelAlias | **String** | 标签别名 | - | label |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| focus | 获取焦点时 | - |
| blur | 失去焦点时 | - |
| closed | 选项层消失时 | - |
| change | 值发生变化时 | 当前值 |
