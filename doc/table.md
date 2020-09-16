# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

## 基础表格

基础的表格展示用法。

::: demo 
```html
<template>
  <vc-table :data="data" :header="header"/>
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: '100px'
        },
        {
          label: '时间',
          key: 'date',
          width: '100px'
        },
        {
          label: '地址',
          key: 'address',
        }
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    }
  }
}
</script>
```
:::

## 函数式表头

通过函数方法来指定列有渲染内容。

::: demo 
```html
<template>
  <vc-table :data="data" :header="header"/>
</template>

<script>
export default {
  data () {
    let nameList = ['秦一世', '秦二世', '秦三世', '秦四世']
    return {
      header: [
        {
          label: '姓名',
          key: (item) => nameList[item.name],
          width: '100px'
        },
        {
          label: '时间',
          key: 'date',
          width: '100px'
        },
        {
          label: '地址',
          key: 'address',
        }
      ],
      data: [
        {
          date: "2020-9-14",
          name: 0,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2020-9-15",
          name: 1,
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2020-9-16",
          name: 2,
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2020-9-17",
          name: 3,
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
    }
  }
}
</script>
```
:::

## 带有分页

### 同步模式

一次加载所有表格的数据.

::: demo 
```html
<template>
  <vc-table 
    :header="header" 
    :data="data" 
    v-model:pageIndex="index" 
    :page-total="data.length"
  />
  
  <vc-button @click="add">添加 1000 条数据</vc-button>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
        },
        {
          label: '时间',
          key: 'date',
        },
        {
          label: '地址',
          key: 'address',
        },
      ],
      data: [],
      index: 1
    }
  },
  methods: {
    showDetail (item, index) {
      console.log(item, index)
      item.name = 'zwl'
    },
    add () {
      for (let i = 0; i < 1000; i++) {
        this.data.push({
          date: `${2020 +i}-09-09`,
          name: `秦${i}世`,
          address: `上海市普陀区金沙江路 ${1518 + i} 弄`
        })
      }
    }
  }
}
</script>
```
:::

### 异步模式

每次加载部分数据。

::: demo 
```html
<template>
  <vc-table 
    asyncData
    height="400px"
    :header="header" 
    :data="data"
    :loading="loading" 
    v-model:pageIndex="index" 
    :page-total="total"
    @page-change="pageChange"
  />
  
  <vc-button @click="pageChange(1)">添加数据</vc-button>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
        },
        {
          label: '时间',
          key: 'date',
        },
        {
          label: '地址',
          key: 'address',
        },
      ],
      data: [],
      index: 1,
      total: 0,
      loading: false
    }
  },
  methods: {
    showDetail (item, index) {
      console.log(item, index)
      item.name = 'zwl'
    },
    pageChange(index) {
      this.data = []
      this.loading = '加载中...'

      setTimeout(() => {
        this.loading = false
        if (index === 1) this.total = 1000
  
        let i = (index -1) * 10
        let l = i + 10
  
        for (; i < l; i++) {
          this.data.push({
            date: `${2020 +i}-09-09`,
            name: `秦${i}世`,
            address: `上海市普陀区金沙江路 ${1518 + i} 弄`
          })
        }
      }, 500)

    }
  }
}
</script>
```
:::

## 加载中

::: demo 
```html
<template>
  <vc-table height="200px" :header="header" :data="[]" loading/>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: '100px'
        },
        {
          label: '时间',
          key: 'date',
          width: '100px'
        },
        {
          label: '地址',
          key: 'address',
        },
        {
          label: '设置',
          slot: 'setting',
          width: '100px'
        },
      ],
    }
  },
}
</script>
```
:::

## 带状态表格

可将表格内容高亮显示，方便区分「成功、信息、警告、危险」等内容。

::: demo 

> 通过在 data 中添加 `classes` 属性，可以自定义当前行的颜色。

```html
<template>
  <vc-table :header="header" :data="data" :index.sync="index" :total="data.length">
    <template v-slot:setting="{item, index}">
      <vc-button @click="showDetail(item, index)">详情</vc-button>
    </template>
  </vc-table>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          width: '100px'
        },
        {
          label: '时间',
          key: 'date',
          width: '100px'
        },
        {
          label: '地址',
          key: 'address',
        },
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          classes: 'warning'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          classes: "success"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          classes: "error"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      index: 1
    }
  },
}
</script>
<style>
.vc-table .warning td {
  color: #fff;
  background: #f90;
}
.vc-table .success td {
  color: #fff;
  background: green;
}
.vc-table .error td {
  color: #fff;
  background: red;
}
</style>
```
:::


## 自定义列模板

自定义列的显示内容，可组合其他组件使用。

::: demo 

> 通过在 header 的数组对象中，添加 `slot` 具名插槽可以自定义显示内容。

```html
<template>
  <vc-table :header="header" :data="data" :index.sync="index" :total="data.length">
    <template #name="{item, index}">
      {{index +1}}.<vc-button>{{item.name}}</vc-button>
    </template>
    <template #date="{item, index}">
      <i class="vc-icon-time"></i>{{item.date}}
    </template>
    <template v-slot:setting="{item, index}">
      <vc-button @click="showDetail(item, index)">详情</vc-button>
    </template>
  </vc-table>
</template>

<script>
export default {
  data() {
    return {
      header: [
        {
          label: '姓名',
          key: 'name',
          slot: 'name'
        },
        {
          label: '时间',
          key: 'date',
          slot: 'date'
        },
        {
          label: '地址',
          key: 'address',
        },
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      index: 1
    }
  },
}
</script>
```
:::


# Props
| 参数 | 类型 | 说明 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| **data** | `Array` |  | [] |  |
| **header** | `Array` |  | [] |  |
| **total** | `Number` |  |  |  |
| **index** | `Number` |  | 1 |  |